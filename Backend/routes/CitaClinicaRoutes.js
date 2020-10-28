const express = require('express')
const cita = require('../controllers/CitaClinicaController')

const router = express.Router()

//get
router.get('/cita-clinica', cita.traerCitas)
router.get('/cita-clinica/:fecha', cita.citasAgendadasPorDia)
router.get('/cita-clinica/pacientes/:fecha', cita.citaPacientesAgendadaPorDia)
//router.get('/cita/estado/:fecha/:hora', cita.test)

//post
router.post('/cita-clinica', cita.crearCita)

module.exports = router