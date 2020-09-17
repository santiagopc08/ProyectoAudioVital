const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Cita = new Schema({
    cedula: Number,
    fecha: String,
    hora: String,
    documentos: String,
    copago: Boolean,
    valorCopago: Number,
    entidadSalud: String,
    estado: Number
}, {
    collection: 'cita',
    toJSON: { virtuals: true }
})

module.exports = mongoose.model('Cita', Cita)