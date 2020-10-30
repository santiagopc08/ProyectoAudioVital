const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CitaClinica = new Schema(
	{
		cedula: String,
		fecha: String,
		hora: String,
		documentos: String,
		valorCopago: Number,
		entidadSalud: String,
		//duracion: Number,
		//estado: Number
	},
	{
		collection: "cita_clinica",
		toJSON: { virtuals: true },
	}
);

module.exports = mongoose.model("CitaClinica", CitaClinica);
