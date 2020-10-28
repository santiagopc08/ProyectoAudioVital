const express = require('express')
const paciente = require('../controllers/PacienteController')

const router = express.Router()

//get
router.get('/paciente', paciente.traerPacientes)
router.get('/paciente/nombre/:nombre', paciente.traerPacientePorNombre)
router.get('/paciente/cedula/:cedula', paciente.traerPacientePorCedula)
router.get('/paciente/controles/:cedula', paciente.cantidadControlesUsuario)

//post
router.post('/paciente', paciente.crearPaciente)
router.post('/paciente/observaciones/', paciente.agregarObservaciones)

module.exports = router