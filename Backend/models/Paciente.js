const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Paciente = new Schema(
    {
        _id: Number,
        nombre: String,
        celular: Number,
        celularOpcional: Number
    },
    {
        collection: 'paciente',
        toJSON: { virtuals: true }
    }
)

module.exports = mongoose.model('Paciente', Paciente)