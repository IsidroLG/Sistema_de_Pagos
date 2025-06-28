📘 Documentación del Backend – API para Sistema de Gestión de Pagos
Última actualización: 25 junio 2025


🔐 Autenticación
POST /auth/login
- Request Body (JSON):
{
  "username": "1186carlosmartinezperez",
  "password": "contraseña"
}


- Response:
{
  "mensaje": "Inicio de sesión exitoso",
  "token": "JWT_TOKEN",
  "rol": "usuario",
  "trabajadorId": 1
}



POST /auth/registro-admin
- Request Body:
{
  "username": "admin1",
  "password": "admin123",
  "claveSecreta": "ADMIN"
}


- Response:
{
  "mensaje": "Administrador creado con éxito",
  "id": 3
}



PUT /auth/cambiar-password
- Headers:
Authorization: Bearer JWT_TOKEN
- Body:
{
  "username": "1186carlosmartinezperez",
  "actualPassword": "1186",
  "nuevaPassword": "miClaveNueva123"
}


- Response:
{ "mensaje": "Contraseña actualizada correctamente" }



👤 Mi perfil
GET /mi-perfil
- Headers:
Authorization: Bearer JWT_TOKEN
- Response:
{
  "datosTrabajador": {
    "nombre": "Carlos Martínez",
    "idEmpresa": 1186,
    "categoria": "Técnico B",
    "ueb": "UEB 3",
    "salarioBase": 4950,
    "tallaCamisa": "M",
    "tallaPantalon": "32",
    "tallaCalzado": "41"
  },
  "historialPagos": [
    {
      "anio": 2024,
      "mes": "junio",
      "pagoResultados": 580,
      "utilidad": 1200,
      ...
    }
  ],
  "ieds": [
    {
      "anio": 2024,
      "mes": "junio",
      "tipo": "mensual",
      "valor": 0.9
    }
  ]
}



👔 Trabajadores
POST http://localhost:3000/trabajadores/crearTrabajador

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)
-Body:
{
  "nombreApellidos": "Dayana Pérez González",
  "carnetIdentidad": "94040867891",
  "idTrabajadorEmpresa": 1187,
  "direccionParticular": "Calle 5 No. 102, Las Tunas",
  "fechaAlta": "2022-09-01T00:00:00.000Z",
  "fuenteProcedencia": "Empresa Azucarera",
  "fechaBaja": null,
  "rol": "técnico",
  "fechaIngreso": "2020-06-10T00:00:00.000Z",
  "jubiladoRecontratado": false,
  "madresTrabajadoras": true,
  "uebId": 2,
  "cargo": {
    "organoCargo": "Área de Calidad",
    "categoriaOcupacion": "Técnico A",
    "funcionDesignacion": "Inspectora de Control",
    "nivelPreparacion": "Técnico Superior",
    "titulo": "Bioquímica de los Alimentos",
    "tipoContrato": "Indeterminado",
    "tridente": "Calidad",
    "ubicacionFuerza": "UEB 2",
    "nivelEscolar": "12mo",
    "defensa": "Pasiva",
    "raza": "Blanca",
    "militancia": "PCC",
    "grupoEscala": "VIII",
    "grupoEscalaN": 8
  },
  "salario": {
    "salarioTotal": 5120,
    "escala": 3200,
    "cla": 500,
    "turnos": 700,
    "maestriaDoctorado": 0,
    "anosServicio": 6,
    "otros": "Incentivo por control de calidad"
  },
  "talla": {
    "pantalonSaya": 30,
    "camisaBlusa": "S",
    "calzado": 38,
    "overol": "M"
  }
}

-Response:
{
  "id": 6,
  "idTrabajadorEmpresa": 1187,
  "nombreApellidos": "Dayana Pérez González",
  "carnetIdentidad": "94040867891",
  "direccionParticular": "Calle 5 No. 102, Las Tunas",
  "fechaAlta": "2022-09-01T00:00:00.000Z",
  "fuenteProcedencia": "Empresa Azucarera",
  "fechaBaja": null,
  "rol": "técnico",
  "fechaIngreso": "2020-06-10T00:00:00.000Z",
  "jubiladoRecontratado": false,
  "madresTrabajadoras": true,
  "uebId": 2,
  "ueb": {
    "id": 2,
    "nombre": "UEB Centro de Operaciones"
  },
  "cargo": {
    "id": 2,
    "trabajadorId": 6,
    "organoCargo": "Área de Calidad",
    "categoriaOcupacion": "Técnico A",
    "funcionDesignacion": "Inspectora de Control",
    "nivelPreparacion": "Técnico Superior",
    "titulo": "Bioquímica de los Alimentos",
    "tipoContrato": "Indeterminado",
    "tridente": "Calidad",
    "ubicacionFuerza": "UEB 2",
    "nivelEscolar": "12mo",
    "defensa": "Pasiva",
    "raza": "Blanca",
    "militancia": "PCC",
    "grupoEscala": "VIII",
    "grupoEscalaN": 8
  },
  "salario": {
    "id": 2,
    "trabajadorId": 6,
    "salarioTotal": 5120,
    "escala": 3200,
    "cla": 500,
    "turnos": 700,
    "maestriaDoctorado": 0,
    "anosServicio": 6,
    "otros": "Incentivo por control de calidad"
  },
  "talla": {
    "id": 2,
    "trabajadorId": 6,
    "pantalonSaya": 30,
    "camisaBlusa": "S",
    "calzado": 38,
    "overol": "M"
  }
}

PUT http://localhost:3000/trabajadores/actualizarTrabajador/6
- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)
- Body:
{
  "nombreApellidos": "Dayana Pérez Ramos",
  "carnetIdentidad": "94040867891",
  "idTrabajadorEmpresa": 1187,
  "direccionParticular": "Calle 5 No. 102, Las Tunas",
  "fechaAlta": "2022-09-01T00:00:00.000Z",
  "fuenteProcedencia": "Empresa Azucarera",
  "fechaBaja": null,
  "rol": "técnico",
  "fechaIngreso": "2020-06-10T00:00:00.000Z",
  "jubiladoRecontratado": false,
  "madresTrabajadoras": true,
  "uebId": 2,
  "cargo": {
    "organoCargo": "Área de Calidad",
    "categoriaOcupacion": "Técnico A",
    "funcionDesignacion": "Inspectora de Control",
    "nivelPreparacion": "Técnico Superior",
    "titulo": "Bioquímica de los Alimentos",
    "tipoContrato": "Indeterminado",
    "tridente": "Calidad",
    "ubicacionFuerza": "UEB 2",
    "nivelEscolar": "12mo",
    "defensa": "Pasiva",
    "raza": "Blanca",
    "militancia": "PCC",
    "grupoEscala": "VIII",
    "grupoEscalaN": 8
  },
  "salario": {
    "salarioTotal": 5120,
    "escala": 3200,
    "cla": 500,
    "turnos": 700,
    "maestriaDoctorado": 0,
    "anosServicio": 6,
    "otros": "Incentivo por control de calidad"
  },
  "talla": {
    "pantalonSaya": 30,
    "camisaBlusa": "S",
    "calzado": 38,
    "overol": "M"
  }
}

-Response:
{
  "id": 6,
  "idTrabajadorEmpresa": 1187,
  "nombreApellidos": "Dayana Pérez Ramos",
  "carnetIdentidad": "94040867891",
  "direccionParticular": "Calle 5 No. 102, Las Tunas",
  "fechaAlta": "2022-09-01T00:00:00.000Z",
  "fuenteProcedencia": "Empresa Azucarera",
  "fechaBaja": null,
  "rol": "técnico",
  "fechaIngreso": "2020-06-10T00:00:00.000Z",
  "jubiladoRecontratado": false,
  "madresTrabajadoras": true,
  "uebId": 2,
  "ueb": {
    "id": 2,
    "nombre": "UEB Centro de Operaciones"
  },
  "cargo": {
    "id": 2,
    "trabajadorId": 6,
    "organoCargo": "Área de Calidad",
    "categoriaOcupacion": "Técnico A",
    "funcionDesignacion": "Inspectora de Control",
    "nivelPreparacion": "Técnico Superior",
    "titulo": "Bioquímica de los Alimentos",
    "tipoContrato": "Indeterminado",
    "tridente": "Calidad",
    "ubicacionFuerza": "UEB 2",
    "nivelEscolar": "12mo",
    "defensa": "Pasiva",
    "raza": "Blanca",
    "militancia": "PCC",
    "grupoEscala": "VIII",
    "grupoEscalaN": 8
  },
  "salario": {
    "id": 2,
    "trabajadorId": 6,
    "salarioTotal": 5120,
    "escala": 3200,
    "cla": 500,
    "turnos": 700,
    "maestriaDoctorado": 0,
    "anosServicio": 6,
    "otros": "Incentivo por control de calidad"
  },
  "talla": {
    "id": 2,
    "trabajadorId": 6,
    "pantalonSaya": 30,
    "camisaBlusa": "S",
    "calzado": 38,
    "overol": "M"
  }
}

-DELETE http://localhost:3000/trabajadores/eliminarTrabajador/1

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)
- Response:
{
  "message": "Trabajador eliminado correctamente"
}


//importar




---------------------------------------------------------------------

👥 Usuarios
--GET http://localhost:3000/usuarios/listarUsuarios
- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)
- Response:
[
  {
    "id": 2,
    "username": "930524carlosmartinez",
    "password": "$2b$10$nfbAQlBNQDZZTEIcQ8YUse3ofD9lAXIbpkgF2RMNGQUPipkMF4sZW",
    "rol": "usuario",
    "trabajadorId": 1,
    "creadoEn": "2025-06-27T23:49:43.240Z",
    "trabajador": {
      "nombreApellidos": "Carlos Martínez",
      "idTrabajadorEmpresa": 1186,
      "ueb": {
        "id": 3,
        "nombre": "UEB InfoCom"
      }
    }
  },
  {
    "id": 1,
    "username": "admin1",
    "password": "$2b$10$1hInzyGm84kz0iyEpNedoehWIavbd51uXFjG8aKgXuy5ySNr3mtfG",
    "rol": "admin",
    "trabajadorId": null,
    "creadoEn": "2025-06-27T22:45:21.476Z",
    "trabajador": null
  }
]

--POST http://localhost:3000/usuarios/crearUsuario

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)
-Body:
{
  "trabajadorId": 1,
  "username": "930524carlosmartinez",
  "password": "claveSegura123",
  "rol": "usuario"
}
- Response:
{
  "mensaje": "Usuario creado",
  "usuario": {
    "id": 2,
    "username": "930524carlosmartinez",
    "password": "$2b$10$nfbAQlBNQDZZTEIcQ8YUse3ofD9lAXIbpkgF2RMNGQUPipkMF4sZW",
    "rol": "usuario",
    "trabajadorId": 1,
    "creadoEn": "2025-06-27T23:49:43.240Z",
    "trabajador": {
      "id": 1,
      "idTrabajadorEmpresa": 1186,
      "nombreApellidos": "Carlos Martínez",
      "carnetIdentidad": "93052412345",
      "direccionParticular": "Calle 12 No. 45, Guantánamo",
      "fechaAlta": "2023-01-15T00:00:00.000Z",
      "fuenteProcedencia": "Ministerio de Energía",
      "fechaBaja": null,
      "rol": "operativo",
      "fechaIngreso": "2021-03-20T00:00:00.000Z",
      "jubiladoRecontratado": false,
      "madresTrabajadoras": false,
      "uebId": 3
    }
  }
}


--GET http://localhost:3000/usuarios/obtenerUsuario/2

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)
-Response:
{
  "id": 2,
  "username": "930524carlosmartinez",
  "password": "$2b$10$nfbAQlBNQDZZTEIcQ8YUse3ofD9lAXIbpkgF2RMNGQUPipkMF4sZW",
  "rol": "usuario",
  "trabajadorId": 1,
  "creadoEn": "2025-06-27T23:49:43.240Z",
  "trabajador": {
    "id": 1,
    "idTrabajadorEmpresa": 1186,
    "nombreApellidos": "Carlos Martínez",
    "carnetIdentidad": "93052412345",
    "direccionParticular": "Calle 12 No. 45, Guantánamo",
    "fechaAlta": "2023-01-15T00:00:00.000Z",
    "fuenteProcedencia": "Ministerio de Energía",
    "fechaBaja": null,
    "rol": "operativo",
    "fechaIngreso": "2021-03-20T00:00:00.000Z",
    "jubiladoRecontratado": false,
    "madresTrabajadoras": false,
    "uebId": 3
  }
}

--PUT http://localhost:3000/usuarios/actualizarUsuario/2

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)
-Body:
{
 "username": "930524carlos"
}

-Response:
{
  "mensaje": "Usuario actualizado",
  "usuario": {
    "id": 2,
    "username": "930524carlos",
    "password": "$2b$10$nfbAQlBNQDZZTEIcQ8YUse3ofD9lAXIbpkgF2RMNGQUPipkMF4sZW",
    "rol": "usuario",
    "trabajadorId": 1,
    "creadoEn": "2025-06-27T23:49:43.240Z",
    "trabajador": {
      "id": 1,
      "idTrabajadorEmpresa": 1186,
      "nombreApellidos": "Carlos Martínez",
      "carnetIdentidad": "93052412345",
      "direccionParticular": "Calle 12 No. 45, Guantánamo",
      "fechaAlta": "2023-01-15T00:00:00.000Z",
      "fuenteProcedencia": "Ministerio de Energía",
      "fechaBaja": null,
      "rol": "operativo",
      "fechaIngreso": "2021-03-20T00:00:00.000Z",
      "jubiladoRecontratado": false,
      "madresTrabajadoras": false,
      "uebId": 3
    }
  }
}

--DELETE http://localhost:3000/usuarios/eliminarUsuario/2

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)









--------------------------------------------------------------------------------------------------------------------


💰 Pagos
POST /pagos
(crearPago)
Registra un nuevo pago por mes/año al trabajador.
- Headers: Authorization: Bearer JWT_TOKEN (admin)
- Body:
{
  "trabajadorId": 1,
  "anio": 2024,
  "mes": "junio",
  "pagoResultados": 580,
  "utilidad": 1200,
  "iedMensual": 0.9
}


- Response:
{ "mensaje": "Pago registrado exitosamente" }



GET /pagos/:trabajadorId
(obtenerHistorial)
Devuelve todos los pagos de un trabajador.
[
  { "anio": 2024, "mes": "junio", "pagoResultados": 580, "utilidad": 1200 },
  ...
]



GET /pagos/:trabajadorId/:anio/:mes
(obtenerPagoPorMes)
Devuelve el pago de un mes específico.
- Response:
{
  "anio": 2024,
  "mes": "junio",
  "pagoResultados": 580,
  "utilidad": 1200,
  "iedMensual": 0.9
}



PUT /pagos/:id
(actualizarPago)
Edita un pago ya existente.
- Body:
{ "pagoResultados": 620, "utilidad": 1300 }


- Response:
{ "mensaje": "Pago actualizado correctamente" }

DELETE /pagos/:id
(eliminarPago)
Elimina un pago del historial.
- Response:
{ "mensaje": "Pago eliminado correctamente" }

--------------------------------------------------------------------------------------------------------------------


🏢 UEBs
POST http://localhost:3000/ueb/crearUEB

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)

- Body:
{ "nombre": "UEB RRHH" }

-Response:
{
  "id": 4,
  "nombre": "UEB RRHH"
}



GET http://localhost:3000/ueb/listarUEBs

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)

-Response:
[
  {
    "id": 1,
    "nombre": "UEB Direccion General",
    "trabajadores": []
  },
  {
    "id": 2,
    "nombre": "UEB Centro de Operaciones",
    "trabajadores": [
      {
        "id": 6,
        "idTrabajadorEmpresa": 1187,
        "nombreApellidos": "Dayana Pérez Ramos",
        "carnetIdentidad": "94040867891",
        "direccionParticular": "Calle 5 No. 102, Las Tunas",
        "fechaAlta": "2022-09-01T00:00:00.000Z",
        "fuenteProcedencia": "Empresa Azucarera",
        "fechaBaja": null,
        "rol": "técnico",
        "fechaIngreso": "2020-06-10T00:00:00.000Z",
        "jubiladoRecontratado": false,
        "madresTrabajadoras": true,
        "uebId": 2
      }
    ]
  },
  {
    "id": 3,
    "nombre": "UEB InfoCom",
    "trabajadores": []
  },
  {
    "id": 4,
    "nombre": "UEB RRHH",
    "trabajadores": []
  }
]

GET http://localhost:3000/ueb/obtenerUEB/2

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)

-Response:
{
  "id": 2,
  "nombre": "UEB Centro de Operaciones",
  "trabajadores": [
    {
      "id": 6,
      "idTrabajadorEmpresa": 1187,
      "nombreApellidos": "Dayana Pérez Ramos",
      "carnetIdentidad": "94040867891",
      "direccionParticular": "Calle 5 No. 102, Las Tunas",
      "fechaAlta": "2022-09-01T00:00:00.000Z",
      "fuenteProcedencia": "Empresa Azucarera",
      "fechaBaja": null,
      "rol": "técnico",
      "fechaIngreso": "2020-06-10T00:00:00.000Z",
      "jubiladoRecontratado": false,
      "madresTrabajadoras": true,
      "uebId": 2
    }
  ]
}


PUT http://localhost:3000/ueb/actualizarUEB/4

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)

-Body:
{ "nombre": "UEB Recursos Humanos" }

-Response:
{
  "id": 4,
  "nombre": "UEB Recursos Humanos"
}


DELETE http://localhost:3000/ueb/eliminarUEB/4

- Headers:
Authorization: Bearer JWT_TOKEN (debe ser admin)

-Response:
{
  "mensaje": "UEB eliminada con éxito"
}
--------------------------------------------------------------------------


🧾 Utilidades
POST /utilidades/calcular
(calcularUtilidades)
Asigna utilidades a todos los trabajadores por mes.
- Headers: Authorization: Bearer JWT_TOKEN (admin)
- Body:
{ "anio": 2024, "mes": "junio", "importeTotal": 450000 }


- Response:
{ "mensaje": "Utilidades asignadas correctamente" }






