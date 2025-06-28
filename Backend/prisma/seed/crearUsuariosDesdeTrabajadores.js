import prisma from '../services/prismaClient.js'
import bcrypt from 'bcryptjs'

function limpiarUsername(id, nombreApellidos) {
    return `${id}${nombreApellidos}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // elimina tildes
        .replace(/\s+/g, '') // elimina espacios
}

async function main() {
    const trabajadores = await prisma.trabajador.findMany({
        include: { usuario: true }
    })

    let creados = 0

    for (const t of trabajadores) {
        if (t.usuario) continue // Ya tiene usuario

        const username = limpiarUsername(t.idTrabajadorEmpresa, t.nombreApellidos)
        const hash = await bcrypt.hash(t.idTrabajadorEmpresa.toString(), 10)

        try {
            await prisma.usuario.create({
                data: {
                    username,
                    password: hash,
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
        console.error('Error general:', e)
        process.exit(1)
    })