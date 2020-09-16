const express = require('express')
const paciente = require('../controllers/PacienteController')

const router = express.Router()

router.get('/paciente', paciente.traerPacientes)
router.post('/paciente', paciente.crearPaciente)

module.exports = router