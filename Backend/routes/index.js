const express = require('express')

const pacienteRoutes = require('./PacienteRoutes')
const citaRoutes = require('./CitaRoutes')

const router = express.Router()

router.use('/', pacienteRoutes)
router.use('/', citaRoutes)

module.exports = router