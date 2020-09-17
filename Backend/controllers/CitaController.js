require('../models/Cita')
require('../models/Paciente')

const mongoose = require('mongoose')
const utils = require('../handlers/utils')
const Cita = mongoose.model('Cita')
const Paciente = mongoose.model('Paciente')

exports.crearCita = (req, res) => {
    const cedula = req.body.cedula
    const fechaP = req.body.fecha
    const horaP = req.body.hora
    const cita = new Cita(req.body)

    Paciente.findById(cedula).exec((err, paciente) => {
        if (paciente == undefined || paciente == null) {
            res.status(201).send({
                message: 'No se ha encontrado al paciente, no está registrado'
            })
        } else {
            Cita.find({ estado: 1, hora: horaP, fecha: fechaP }).exec((e, citas) => {
                if (err) {
                    return res.status(500).send({ message: 'Ocurrio un error en el server', error: e })
                }
                if (citas.length > 0) {
                    res.status(200).send({ message: 'No hay cita disponible a esa hora' })
                } else {
                    cita.save((err, cita) => {
                        res.status(200).send({message: 'Cita creada exitosamente'})
                        //utils.show(res, err, cita)
                    })
                }
            })
        }
    })
}

exports.traerCitas = (req, res) => {
    let hora = new Date().getHours()
    let horaLocal = new Date().toLocaleTimeString()
    console.log(hora)
    console.log(horaLocal)
    Cita.find({estado: 1}).exec(function (err, cita) {
        utils.show(res, err, cita)
    })
}

// //BUSCANDO DISPONIBILIDAD
// exports.test = (req, res) => {
//     let fechaP = req.params.fecha
//     let horaP = req.params.hora
//     Cita.find({ estado: 1, hora: horaP, fecha: fechaP }).exec((err, citas) => {
//         if (err) {
//             return res.status(500).send({ message: 'Ocurrio un error en el server', error: err })
//         }
//         if (citas.length > 0) {
//             res.status(200).send(true)
//         } else {
//             res.status(200).send(false)
//         }
//     })
// }