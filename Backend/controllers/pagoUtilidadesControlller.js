import prisma from '../services/prismaClient.js'

export const calcularUtilidades = async (req, res) => {
    const { anio, mes, trabajadores } = req.body

    try {
        const resultados = []

        for (const t of trabajadores) {
            const {
                trabajadorId,
                trt,
                cds,
                penalizacion = 100 // si no se manda, se asume sin descuento
            } = t

            const trabajador = await prisma.trabajador.findUnique({
                where: { id: trabajadorId },
                include: { salario: true }
            })

            const salarioBasico = trabajador.salario?.salarioTotal || 0

            // Determinar el tipo de pago
            let tipoUtilidad = null
            let ied = null

            if (mes === 1) {
                // Pago ANUAL → se busca el IED anual del año anterior
                tipoUtilidad = 'anual'
                const iedAnual = await prisma.iED.findUnique({
                    where: {
                        trabajadorId_tipo_mes_trimestre_anio: {
                            trabajadorId,
                            tipo: 'anual',
                            mes: null,
                            trimestre: null,
                            anio: anio - 1
                        }
                    }
                })
                ied = iedAnual?.valor
            } else if ([4, 7, 10].includes(mes)) {
                // Pago TRIMESTRAL → calcular trimestre y buscar el IED correspondiente
                tipoUtilidad = 'trimestral'
                const trimestre = mes / 3
                const iedTrimestral = await prisma.iED.findUnique({
                    where: {
                        trabajadorId_tipo_mes_trimestre_anio: {
                            trabajadorId,
                            tipo: 'trimestral',
                            mes: null,
                            trimestre,
                            anio
                        }
                    }
                })
                ied = iedTrimestral?.valor
            } else {
                return res.status(400).json({ error: `El mes ${mes} no corresponde a pago de utilidades` })
            }

            if (ied === null) {
                return res.status(400).json({
                    error: `No se encontró el IED ${tipoUtilidad} para el trabajador ${trabajador.nombreApellidos} en ${anio}`
                })
            }

            // Fórmulas
            let sbc = trt * salarioBasico * ied
            sbc = Math.round(sbc * 100) / 100

            let sbcFinal = Math.round((sbc * (penalizacion / 100)) * 100) / 100

            let netoACobrar = Math.round(sbcFinal * cds * 100) / 100

            // Guardar el resultado
            const pago = await prisma.historialPago.upsert({
                where: {
                    trabajadorId_mes_anio: {
                        trabajadorId,
                        mes,
                        anio
                    }
                },
                update: {
                    pagoUtilidades: netoACobrar,
                    [`ied${tipoUtilidad.charAt(0).toUpperCase() + tipoUtilidad.slice(1)}`]: ied
                },
                create: {
                    trabajadorId,
                    mes,
                    anio,
                    salarioBase: salarioBasico,
                    pagoResultados: 0,
                    pagoUtilidades: netoACobrar,
                    [`ied${tipoUtilidad.charAt(0).toUpperCase() + tipoUtilidad.slice(1)}`]: ied
                }
            })

            resultados.push({
                trabajadorId,
                nombre: trabajador.nombreApellidos,
                sbc,
                sbcFinal,
                netoACobrar,
                tipo: tipoUtilidad,
                ied
            })
        }

        res.status(201).json({ mensaje: 'Utilidades calculadas con éxito', resultados })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al calcular las utilidades' })
    }
}