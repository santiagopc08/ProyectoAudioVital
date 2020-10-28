const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Paciente = new Schema(
    {
        _id: String,
        nombre: String,
        telefono: String,
        observaciones: String
    },
    {
        collection: 'paciente',
        toJSON: { virtuals: true }
    }
)

module.exports = mongoose.model('Paciente', Paciente)