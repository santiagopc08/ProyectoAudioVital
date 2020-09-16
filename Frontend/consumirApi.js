function obtenerDatos(datos) {
    datos.map((datos, i) => {
        let nombre = document.getElementById('nombre')
        let id = document.getElementById('_id')
        let celular = document.getElementById('celular')
        let celular2 = document.getElementById('celular2')
        let o = document.getElementById('o')

        nombre.innerHTML = ""
        id.innerHTML = ""
        celular.innerHTML = ""
        celular2.innerHTML = ""
        o.innerHTML = "ADIÓS"

        console.log(datos)

        nombre.innerHTML = datos.nombre
        id.innerHTML = datos._id
        celular.innerHTML = datos.celular
        celular2.innerHTML = datos.celularOpcional
    })
}

function registrar() {
    let _id = document.getElementById('nId').value
    var nombre = document.getElementById("nombreP").value
    let celular = document.getElementById('numTel1').value
    let celular2 = document.getElementById('numTel2').value

    let Datos = {
        _id,
        nombre,
        celular,
        celularOpcional: celular2
    }

    console.log(Datos)

    registrar_paciente(Datos)
}

function obtener_datos() {
    fetch("http://localhost:3001/api/v1/paciente", {
        method: 'GET',
        headers: {
            'Accepts': 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            obtenerDatos(data)
        })
}

function registrar_paciente(Datos) {
    fetch("http://localhost:3001/api/v1/paciente", {
        method: 'POST',
        body: JSON.stringify(Datos),
        headers: {
            'Accepts': 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}