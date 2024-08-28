require('../models/CitaClinica')
require('../models/Paciente')

const mongoose = require('mongoose')
const utils = require('../handlers/utils')
const CitaClinica = mongoose.model('CitaClinica')
const Paciente = mongoose.model('Paciente')

exports.crearCita = (req, res) => {
    const cedula = req.body.cedula
    const fechaP = req.body.fecha
    const horaP = req.body.hora
    const cita = new CitaClinica(req.body)

    Paciente.findById(cedula).exec((err, paciente) => {
        if (paciente == undefined || paciente == null) {
            res.status(201).send({
                message: 'No se ha encontrado al paciente, no está registrado'
            })
            return
        } else {
            CitaClinica.find({ hora: horaP, fecha: fechaP }).exec((e, citas) => {
                if (err) {
                    return res.status(500).send({ message: 'Ocurrio un error en el server', error: e })
                } else {
                    if (citas.length > 0) {
                        res.status(200).send({ message: 'No hay cita disponible a esa hora' })
                        return
                    } else {
                        cita.save((err, cita) => {
                            res.status(200).send({ message: 'Cita creada exitosamente' })
                            return
                            //utils.show(res, err, cita)
                        })
                    }
                }
            })
        }
    })
}

exports.traerCitas = (req, res) => {
    // let hora = new Date().getHours()
    // let horaLocal = new Date().toLocaleTimeString()
    // console.log(hora)
    // console.log(horaLocal)
    CitaClinica.find().exec(function (err, cita) {
        utils.show(res, err, cita)
    })
}

//Citas agendadas por día
exports.citasAgendadasPorDia = (req, res) => {
    //La fecha tiene formato d/m/yyyy
    let fechaP = req.params.fecha

    CitaClinica.find({ fecha: fechaP }).exec((err, result) => {
        if (err) throw err

        let horas = []
        for (let i = 0; i < result.length; i++) {
            horas.push(result[i].hora)
        }

        res.status(200).send({ horas: horas })
    })
}

exports.citaPacientesAgendadaPorDia = async (req, res) => {
    try {
        let fechaP = req.params.fecha;
        console.log(`Buscando citas para la fecha: ${fechaP}`);

        // Obtener citas por fecha de un paciente
        let citas = await CitaClinica.find({ fecha: fechaP }).exec();
        if (!citas || citas.length === 0) {
            return res.status(404).send({ message: 'No se encontraron citas para esa fecha.' });
        }

        let horas = citas.map(cita => cita.hora);
        let cedulas = citas.map(cita => cita.cedula);

        let pacientes = await Promise.all(
            cedulas.map(cedula => Paciente.findById(cedula).exec())
        );

        if (pacientes.includes(null)) {
            console.log('Uno o más pacientes no se encontraron.');
            return res.status(404).send({ message: 'Uno o más pacientes no se encontraron.' });
        }

        let info = pacientes.map((paciente, index) => ({
            hora: horas[index],
            nombre: paciente.nombre,
            cedula: paciente._id,
            telefono: paciente.telefono
        }));

        console.log('Enviando la información de las citas:', info);
        res.status(200).send({ message: info });
    } catch (error) {
        console.error('Error en citaPacientesAgendadaPorDia:', error);
        res.status(500).send({ message: 'Ha ocurrido un problema con el servidor', error });
    }
};
