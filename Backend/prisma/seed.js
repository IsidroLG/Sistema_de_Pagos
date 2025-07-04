import prisma from '../src/services/prismaClient.js'
import bcrypt from 'bcryptjs'

const trabajadores = [
    {
        nombreApellidos: 'Luis Ramón Pargas Pérez',
        carnetIdentidad: '89090235967',
        idTrabajadorEmpresa: 82463,
        direccionParticular: 'Miguel Lopez 14 E, Botello Reparto Sosa',
        fechaIngreso: new Date('2021-05-10'),
        jubiladoRecontratado: false,
        madresTrabajadoras: false,
        rol: 'Director',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '890902luisramon', password: 'Luis123' }
    },
    {
        nombreApellidos: 'Leyvis Mara Machado Lozada',
        carnetIdentidad: '97120716813',
        idTrabajadorEmpresa: 89155,
        direccionParticular: 'Calle 16 # 65 Rpto Aguilera',
        fechaIngreso: new Date('2022-02-15'),
        jubiladoRecontratado: false,
        madresTrabajadoras: true,
        rol: 'Tecnico en Gestión Documental',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '971207leyvis', password: 'Leyvis123' }
    },
    {
        nombreApellidos: 'Yariana Contreras Mendoza',
        carnetIdentidad: '95062841859',
        idTrabajadorEmpresa: 85677,
        direccionParticular: 'Edificio 21 Apto B6  Rpto Aguilera',
        fechaIngreso: new Date('2019-10-01'),
        jubiladoRecontratado: false,
        madresTrabajadoras: true,
        rol: 'Técnico A en Gestión Económica',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '950628yariana', password: 'yariana123' }
    },
    {
        nombreApellidos: 'Aliuska Margarita Pupo Roselló',
        carnetIdentidad: '89060135959',
        idTrabajadorEmpresa: 89400,
        direccionParticular: 'Osvaldo Herrera # 20 F % Adolfo Villamar y Fco Vega, Rpto Santo Domingo',
        fechaIngreso: new Date('2018-03-20'),
        jubiladoRecontratado: false,
        madresTrabajadoras: true,
        rol: 'Especialista  B en Asistencia Tecnica',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '890601aliuska', password: 'aliuska123' }
    },
    {
        nombreApellidos: 'Emerio Machado Naranjo',
        carnetIdentidad: '65010724120',
        idTrabajadorEmpresa: 57662,
        direccionParticular: 'Calle 35 #3 e/ 22 y J. Espinosa ',
        fechaIngreso: new Date('2020-07-01'),
        jubiladoRecontratado: true,
        madresTrabajadoras: false,
        rol: 'Chofer D',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '650107emerio', password: 'emerio123' }
    },
    {
        nombreApellidos: 'Leodan Daniel Balboa Velázquez',
        carnetIdentidad: '02082176788',
        idTrabajadorEmpresa: 88239,
        direccionParticular: 'Calle LL # 5 E % Calle 16 y 17 Rpto San Antonio',
        fechaIngreso: new Date('2021-11-15'),
        jubiladoRecontratado: false,
        madresTrabajadoras: false,
        rol: 'Técnico en Ciencias Informáticas',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '020821leo', password: 'leo123' }
    },
    {
        nombreApellidos: 'Rafael Alejandro Licea Romero',
        carnetIdentidad: '89112535944',
        idTrabajadorEmpresa: 1007,
        direccionParticular: 'Calle 8 No. 19 F/ Teniente Peison y Calle Rio Rpto Primero',
        fechaIngreso: new Date('2017-01-30'),
        jubiladoRecontratado: false,
        madresTrabajadoras: false,
        rol: 'Técnico en Ciencias Informáticas',
        uebNombre: 'UEB InfoCom ',
        usuario: { username: '891125rafael', password: 'rafael123' }
    },
    {
        nombreApellidos: 'José Manuel Ávila Collazo',
        carnetIdentidad: '90090240309',
        idTrabajadorEmpresa: 88679,
        direccionParticular: 'Calle José Martí # 90 % Gonzalo de Quesada y Villalón, Rpto Primero',
        fechaIngreso: new Date('2023-02-28'),
        jubiladoRecontratado: false,
        madresTrabajadoras: false,
        rol: 'Técnico en Ciencias Informáticas',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '900902jose', password: 'jose123' }
    },
    {
        nombreApellidos: 'Carlos Alberto Prieto Martínez',
        carnetIdentidad: '96120818828',
        idTrabajadorEmpresa: 89438,
        direccionParticular: 'Calle 22 #6 F A % Calle 39 y 37 Rpto Altura de Buena Vista',
        fechaIngreso: new Date('2015-04-12'),
        jubiladoRecontratado: false,
        madresTrabajadoras: false,
        rol: 'Técnico en Ciencias Informáticas',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '961208carlos', password: 'carlos123' }
    },
    {
        nombreApellidos: 'Osmel Parra Vázquez',
        carnetIdentidad: '90013140269',
        idTrabajadorEmpresa: 82464,
        direccionParticular: 'E Martinez # 83 A. Reyes y San Pedro Buena Vista',
        fechaIngreso: new Date('2024-01-05'),
        jubiladoRecontratado: false,
        madresTrabajadoras: false,
        rol: 'auxiliar',
        uebNombre: 'UEB InfoCom',
        usuario: { username: '900131osmel', password: 'osmelu123' }
    }
]

async function main() {
    const uebs = {}

    // Crear UEBs si no existen
    for (const ueb of [...new Set(trabajadores.map(t => t.uebNombre))]) {
        const creada = await prisma.uEB.upsert({
            where: { nombre: ueb },
            update: {},
            create: { nombre: ueb }
        })
        uebs[ueb] = creada.id
    }

    for (const t of trabajadores) {
        const trabajador = await prisma.trabajador.create({
            data: {
                nombreApellidos: t.nombreApellidos,
                carnetIdentidad: t.carnetIdentidad,
                idTrabajadorEmpresa: t.idTrabajadorEmpresa,
                direccionParticular: t.direccionParticular,
                fechaIngreso: t.fechaIngreso,
                jubiladoRecontratado: t.jubiladoRecontratado,
                madresTrabajadoras: t.madresTrabajadoras,
                rol: t.rol,
                ueb: { connect: { id: uebs[t.uebNombre] } },
                cargo: {
                    create: {
                        funcionDesignacion: 'Genérico',
                        nivelEscolar: '12mo'
                    }
                },
                salario: {
                    create: {
                        salarioTotal: 5000 + Math.floor(Math.random() * 500),
                        escala: 3000
                    }
                },
                talla: {
                    create: {
                        pantalonSaya: 32,
                        camisaBlusa: 'M',
                        calzado: 40
                    }
                }
            }
        })

        await prisma.usuario.create({
            data: {
                username: t.usuario.username,
                password: await bcrypt.hash(t.usuario.password, 10),
                rol: 'usuario',
                trabajador: { connect: { id: trabajador.id } }
            }
        })
    }

    console.log('✅ Seed completo generado con 10 trabajadores, 2 UEBs y 10 usuarios.')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())