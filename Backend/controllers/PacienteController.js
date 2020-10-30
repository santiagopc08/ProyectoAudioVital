require("../models/Paciente");
require("../models/CitaClinica");
require("../models/CitaReparaciones");

const mongoose = require("mongoose");
const utils = require("../handlers/utils");

const Paciente = mongoose.model("Paciente");
const CitaClinica = mongoose.model("CitaClinica");
const CitaReparaciones = mongoose.model("CitaReparaciones");

mongoose.set("useFindAndModify", false);

exports.crearPaciente = (req, res) => {
	const paciente = new Paciente(req.body);
	paciente.save((err, paciente) => {
		utils.show(res, err, paciente);
	});
};

exports.traerPacientes = (req, res) => {
	Paciente.find({}).exec(function (err, paciente) {
		utils.show(res, err, paciente);
	});
};

exports.traerPacientePorNombre = (req, res) => {
	let nombreP = req.params.nombre;
	Paciente.find({ nombre: new RegExp(nombreP, "i") }).exec((err, paciente) => {
		utils.show(res, err, paciente);
	});
};

exports.traerPacientePorCedula = (req, res) => {
	let cedulaP = req.params.cedula;
	Paciente.findById(cedulaP).exec((err, paciente) => {
		utils.show(res, err, paciente);
	});
};

exports.cantidadControlesUsuario = (req, res) => {
	let cedulaP = req.params.cedula;
	let cantidadControles = 0;

	CitaClinica.countDocuments({ cedula: cedulaP }, (err, result) => {
		if (err) throw err;
		cantidadControles = result;
	});

	CitaReparaciones.countDocuments({ cedula: cedulaP }, (err, result) => {
		if (err) throw err;
		cantidadControles += result;
	});

	res.status(200).send({
		message: "La cantidad de controles es:",
		controles: cantidadControles,
	});
};

exports.agregarObservaciones = (req, res) => {
	const cedula = { _id: req.body.cedula };
	let observacion = req.body.observaciones;
	Paciente.find(cedula).exec((err, result) => {
		if (err) throw err;
		observacion = observacion + " - " + result[0].observaciones;

		Paciente.findOneAndUpdate(cedula, { observaciones: observacion }).exec(
			(err, result) => {
				utils.show(res, err, result);
			}
		);
	});
};
