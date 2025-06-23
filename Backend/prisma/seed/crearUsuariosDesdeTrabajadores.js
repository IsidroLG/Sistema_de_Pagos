import prisma from '../services/prismaClient.js'

async function main() {
    const trabajadores = await prisma.trabajador.findMany({
        include: { usuario: true }
    })

    let creados = 0

    for (const t of trabajadores) {
        if (t.usuario) continue // Ya tiene usuario asociado

        try {
            const nuevoUsuario = await prisma.usuario.create({
                data: {
                    username: t.nombreApellidos.trim().toLowerCase(),
                    password: t.idTrabajadorEmpresa.toString(), // se podría hashear si quieres más seguridad
                    rol: 'usuario',
                    trabajador: { connect: { id: t.id } }
                }
            })

            creados++
        } catch (err) {
            console.error(`❌ No se pudo crear usuario para ${t.nombreApellidos}:`, err.message)
        }
    }

    console.log(`✅ Usuarios creados: ${creados}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })