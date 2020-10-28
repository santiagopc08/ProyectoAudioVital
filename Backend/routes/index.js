const express = require('express')

const pacienteRoutes = require('./PacienteRoutes')
const citaClinicaRoutes = require('./CitaClinicaRoutes')
const citaReparacionesRoutes = require('./CitaReparacionesRoutes')

const router = express.Router()

router.use('/', pacienteRoutes)
router.use('/', citaClinicaRoutes)
router.use('/', citaReparacionesRoutes)

module.exports = router