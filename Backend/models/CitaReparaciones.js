const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CitaReparaciones = new Schema({
    cedula: String,
    fecha: String,
    hora: String,
    observaciones: String,
    //estado: Number
}, {
    collection: 'cita_reparaciones',
    toJSON: { virtuals: true }
})

module.exports = mongoose.model('CitaReparaciones', CitaReparaciones)