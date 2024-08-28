const request = require('supertest')
const app = require('../app.js')

//Registrar paciente
it('save patient data responding with status code 200', done => {
    const data = {
        nombre : "Santiago Pérez",
		_id : 123,
		telefono : 987654
    }
    request(app)
    .post('/api/v1/paciente')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-type', 'application/json; charset=utf-8')
    .expect(200, done);
    
})

//Consultar pacientes por nombre
it('respond with a JSON containing all patients with the result of "like" in their name for the given text', done => {
    request(app)
    .get('/api/v1/paciente/nombre/sa')
    .set('Accept', 'application/json')
    .expect('Content-type', 'application/json; charset=utf-8')
    .expect(200, done);
    
})

//Agendar una cita clinica
it('schedule a clinic appointment responding with status code 200', done => {
    const data = {
        cedula: 123,
        fecha: '1-1-2021',
        hora: 8,
        documentos: '',
        valorCopago: 0,
        entidadSalud: 'entidad'
    }
    request(app)
    .post('/api/v1/cita-clinica/')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-type', 'application/json; charset=utf-8')
    .expect(200, done);
    
})

//Agendar una cita de reparaciones
it('schedule a repair appointment responding with status code 200', done => {
    const data = {
        cedula: 123,
        fecha: '1-1-2021',
        hora: 8
    }
    request(app)
    .post('/api/v1/cita-reparaciones/')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-type', 'application/json; charset=utf-8')
    .expect(200, done);
    
})

//Obtener citas clinicas
it('respond with a JSON containing all clinical appointments for a given date', done => {
    request(app)
    .get('api/v1/cita-clinica/pacientes/15-8-2024')
    .set('Accept', 'application/json')
    .expect('Content-type', 'application/json; charset=utf-8')
    .expect(200, done);
    
})

//Obtener citas de reparaciones
it('respond with a JSON containing all repair appointments for a given date', done => {
    request(app)
    .get('/api/v1/cita-reparaciones/pacientes/25-3-2021')
    .set('Accept', 'application/json')
    .expect('Content-type', 'application/json; charset=utf-8')
    .expect(200, done);
    
})