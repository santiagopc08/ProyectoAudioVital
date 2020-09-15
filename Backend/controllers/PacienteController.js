const mongoose = require('mongoose')
require('../models/Paciente');
const Paciente = mongoose.model('Paciente')
const utils = require('../handlers/utils')

exports.crearPaciente = (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.save((err, paciente) => {
        utils.show(res, err, paciente)
    })
}

exports.traerPacientes = (req, res) => {
    Paciente.find({}).exec(function (err, paciente) {
        utils.show(res, err, paciente)
    })
}


