const mongoose = require('mongoose')
require('../models/Cita');
const Cita = mongoose.model('Cita')
const utils = require('../handlers/utils')

exports.crearCita = (req, res) => {
    const cita = new Cita(req.body)
    cita.save((err, cita) => {
        utils.show(res, err, cita)
    })
}

exports.traerCitas = (req, res) => {
    Cita.find({}).exec(function (err, cita) {
        utils.show(res, err, cita)
    })
}