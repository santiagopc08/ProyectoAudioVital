const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Cita = new Schema({
    _id: Number,
    cedula: Number,
    fecha: String,
    hora: String,
    documentos: String,
    copago: Boolean,
    valorCopago: Number,
    entidadSalud: String
}, {
    collection: 'cita',
    toJSON: { virtuals: true }
})

module.exports = mongoose.model('Cita', Cita)