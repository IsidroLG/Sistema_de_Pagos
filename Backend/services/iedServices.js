import prisma from './prismaClient.js'

/**
 * Registrar el IED mensual al momento de hacer el pago por resultados.
 */
export async function registrarIedMensual({ trabajadorId, mes, anio, valor }) {
    await prisma.iED.upsert({
        where: {
            trabajadorId_tipo_mes_trimestre_anio: {
                trabajadorId,
                tipo: 'mensual',
                mes,
                trimestre: null,
                anio
            }
        },
        create: {
            trabajadorId,
            tipo: 'mensual',
            mes,
            anio,
            valor
        },
        update: {
            valor
        }
    })

    // Si es el tercer mes de un trimestre (marzo, junio, septiembre), intenta calcular el trimestral
    if ([3, 6, 9].includes(mes)) {
        const trimestre = mes / 3
        await calcularIedTrimestral(trabajadorId, anio, trimestre)
    }
}

/**
 * Calcula y guarda el IED trimestral si hay suficientes IEDs mensuales.
 */
async function calcularIedTrimestral(trabajadorId, anio, trimestre) {
    const mesesTrimestre = {
        1: [1, 2, 3],
        2: [4, 5, 6],
        3: [7, 8, 9]
    }

    const ieds = await prisma.iED.findMany({
        where: {
            trabajadorId,
            tipo: 'mensual',
            anio,
            mes: { in: mesesTrimestre[trimestre] }
        }
    })

    if (ieds.length === 3) {
        const promedio = ieds.reduce((acc, cur) => acc + cur.valor, 0) / 3

        await prisma.iED.upsert({
            where: {
                trabajadorId_tipo_mes_trimestre_anio: {
                    trabajadorId,
                    tipo: 'trimestral',
                    mes: null,
                    trimestre,
                    anio
                }
            },
            create: {
                trabajadorId,
                tipo: 'trimestral',
                trimestre,
                anio,
                valor: promedio
            },
            update: {
                valor: promedio
            }
        })

        // Si se completó el trimestre 3 (septiembre), intentamos calcular el anual
        if (trimestre === 3) {
            await calcularIedAnual(trabajadorId, anio)
        }
    }
}

/**
 * Calcula y guarda el IED anual si existen los tres IEDs trimestrales.
 */
async function calcularIedAnual(trabajadorId, anio) {
    const iedsTrimestrales = await prisma.iED.findMany({
        where: {
            trabajadorId,
            tipo: 'trimestral',
            anio
        }
    })

    if (iedsTrimestrales.length === 3) {
        const promedio = iedsTrimestrales.reduce((acc, cur) => acc + cur.valor, 0) / 3

        await prisma.iED.upsert({
            where: {
                trabajadorId_tipo_mes_trimestre_anio: {
                    trabajadorId,
                    tipo: 'anual',
                    mes: null,
                    trimestre: null,
                    anio
                }
            },
            create: {
                trabajadorId,
                tipo: 'anual',
                anio,
                valor: promedio
            },
            update: {
                valor: promedio
            }
        })
    }
}