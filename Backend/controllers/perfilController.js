import prisma from '../services/prismaClient.js'

export const obtenerPerfil = async (req, res) => {
    const { trabajadorId } = req.usuario

    try {
        const trabajador = await prisma.trabajador.findUnique({
            where: { id: trabajadorId },
            include: {
                salario: true,
                historialPagos: { orderBy: { anio: 'desc' } },
                iEDs: {
                    orderBy: [
                        { anio: 'desc' },
                        { tipo: 'asc' },
                        { mes: 'asc' },
                        { trimestre: 'asc' }
                    ]
                }
            }
        })

        if (!trabajador) {
            return res.status(404).json({ error: 'Trabajador no encontrado' })
        }

        res.json({
            datosTrabajador: {
                nombre: trabajador.nombreApellidos,
                idEmpresa: trabajador.idTrabajadorEmpresa,
                categoria: trabajador.categoria,
                ueb: trabajador.ueb,
                salarioBase: trabajador.salario?.salarioTotal || null,
                tallaCamisa: trabajador.tallaCamisa || null,
                tallaPantalon: trabajador.tallaPantalon || null,
                tallaCalzado: trabajador.tallaCalzado || null
            },
            historialPagos: trabajador.historialPagos,
            ieds: trabajador.iEDs
        })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la información del perfil' })
    }
}