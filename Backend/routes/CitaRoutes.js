const express = require('express')
const cita = require('../controllers/CitaController')

const router = express.Router()

router.get('/cita', cita.traerCitas)
router.post('/cita', cita.crearCita)

module.exports = router