const mongoose = require('mongoose')
require('../models/CitaClinica');
require('../models/Paciente');

const db = mongoose.connect('mongodb://localhost:27017/AudioVital', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = db
