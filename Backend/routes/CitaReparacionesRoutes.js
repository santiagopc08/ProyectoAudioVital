const express = require('express')
const cita = require('../controllers/CitaReparacionesController')

const router = express.Router()

//get
router.get('/cita-reparaciones', cita.traerCitas)
router.get('/cita-reparaciones/:fecha', cita.citasAgendadasPorDia)
router.get('/cita-reparaciones/pacientes/:fecha', cita.citaPacientesAgendadaPorDia)

//post
router.post('/cita-reparaciones', cita.crearCita)

module.exports = router