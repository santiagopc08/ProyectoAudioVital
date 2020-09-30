var btnOptBarL = document.getElementById("btnOptBarL")
var btnOptBarR = document.getElementById("btnOptBarR")

var agendarContainer = document.getElementById("agendarContainer")
var citasContainer = document.getElementById("citasContainer")

//Para el calendario
var btnFechaSeleccionada = document.getElementById("btnFechaSeleccionadaVer")
var calendar = document.getElementById("calendarVer")
var thPrev = document.getElementById("thPrevVer")
var thMonthYear = document.getElementById("thMonthYearVer")
var thNext = document.getElementById("thNextVer")
var calendarBody = document.getElementById("calendarBodyVer")
var actualDate = new Date()
var htmlBody = ""
var counter = 1
var actualMonth = actualDate.getMonth()
var todaysDate = new Date()
var monthsString = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]
generateMonth(actualDate)

function showAgendar() {
    citasContainer.style.display = "none";
    agendarContainer.style.display = "initial";
    btnFechaSeleccionada = document.getElementById("btnFechaSeleccionada")
    calendar = document.getElementById("calendar")
    thPrev = document.getElementById("thPrev")
    thMonthYear = document.getElementById("thMonthYear")
    thNext = document.getElementById("thNext")
    calendarBody = document.getElementById("calendarBody")
    horasNuevaCita.innerHTML = ""
    actualDate = new Date()
    generateMonth(actualDate)

    setTimeout(function() {
        btnOptBarL.style.backgroundColor = "white"
        btnOptBarL.style.color = "var(--secondaryDark)"

        btnOptBarR.style.backgroundColor = "var(--secondary)"
        btnOptBarR.style.color = "white"

        agendarContainer.style.opacity = 100;
        agendarContainer.style.zIndex = 1;

        citasContainer.style.opacity = 0;
        citasContainer.style.zIndex = -1;
    }, 100);
}

function showCitas() {
    agendarContainer.style.display = "none";
    citasContainer.style.display = "initial";
    btnFechaSeleccionada = document.getElementById("btnFechaSeleccionadaVer")
    calendar = document.getElementById("calendarVer")
    thPrev = document.getElementById("thPrevVer")
    thMonthYear = document.getElementById("thMonthYearVer")
    thNext = document.getElementById("thNextVer")
    calendarBody = document.getElementById("calendarBodyVer")

    setTimeout(function() {
        btnOptBarR.style.backgroundColor = "white"
        btnOptBarR.style.color = "var(--secondaryDark)"

        btnOptBarL.style.backgroundColor = "var(--secondary)"
        btnOptBarL.style.color = "white"

        citasContainer.style.opacity = 100;
        citasContainer.style.zIndex = 1;

        agendarContainer.style.opacity = 0;
        agendarContainer.style.zIndex = -1;
    }, 100);
}

var textareaDocs = document.getElementById("docs")

function expandirDocs() {
    var nRows = textareaDocs.value.split("\n").length;
    textareaDocs.style.height = (nRows + 2 + (nRows * 0.3)) + "em";
}

function habilitarValorCopago() {
    var chkCopago = document.getElementById("chkCopago")
    var valorCopago = document.getElementById("valorCopago")

    if (chkCopago.checked) {
        valorCopago.disabled = false
    } else {
        valorCopago.disabled = true
        valorCopago.value = ""
    }
}

//Código que soporta el calendario

function generateHtml(monthMatrix) {
    thMonthYear.innerHTML = monthsString[actualDate.getMonth()] + " de " + actualDate.getFullYear()
    calendarBody.innerHTML = ""
    htmlBody = ""
    for (let i = 0; i < monthMatrix.length; i++) {
        htmlBody += "<tr>"
        for (let j = 0; j < monthMatrix[i].length; j++) {
            if (monthMatrix[i][j] != 0) {
                htmlBody += "\n<td><button class='calendarButton' onclick = 'mostrarFechaSeleccionada(" + monthMatrix[i][j] + ")'>" + monthMatrix[i][j] + "</button></td>"
            } else {
                htmlBody += "\n<td></td>"
            }
            counter++
        }
        htmlBody += "</tr>"
    }

    calendarBody.innerHTML += htmlBody
}

function generateMonth(actualDate) {
    monthMatrix = [
        [],
        [],
        [],
        [],
        [],
        []
    ]
    var diaSemana = actualDate.getDay()
    diaSemana = diaSemana == 0 ? 6 : diaSemana - 1
    for (let i = 0; i < 7; i++) {
        if (actualDate.getMonth() != actualMonth || i < diaSemana) {
            monthMatrix[0][i] = 0;
        } else {
            monthMatrix[0][i] = actualDate.getDate()
            actualDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 1)
        }
    }
    for (let i = 1; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (actualDate.getMonth() != actualMonth) {
                monthMatrix[i][j] = 0;
            } else {
                monthMatrix[i][j] = actualDate.getDate()
                actualDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 1)
            }
        }
    }
    generateHtml(monthMatrix)
}

function nextMonth() {
    var month = actualDate.getMonth()
    var year = actualDate.getFullYear()
    if (month == 11) {
        month = 0
        year++
    } else {
        month++
    }
    actualDate = new Date(year, month, 1)
    actualMonth = month
    generateMonth(actualDate)
    thPrev.style.display = "initial"
}

function prevMonth() {
    var month = actualDate.getMonth()
    var year = actualDate.getFullYear()
    if (month == 0) {
        month = 11
        year--
    } else {
        month--
    }
    actualDate = new Date(year, month, 1)
    if (actualDate.getMonth() == todaysDate.getMonth()) {
        actualDate = todaysDate
        thPrev.style.display = "none"
    }
    actualMonth = month
    generateMonth(actualDate)
}

var citasAgendadasContainer = document.getElementById("citasAgendadasContainer")
var camposLlenos = false
var fechaSeleccionada = false

function mostrarFechaSeleccionada(day) {
    actualDate = new Date(actualDate.getFullYear(), actualMonth, day)
    btnFechaSeleccionada.innerHTML = actualDate.getDate() + " de " + monthsString[actualMonth] + " del " + actualDate.getFullYear()
    btnFechaSeleccionada.style.display = "inherit"
    calendar.style.display = "none"
    thPrev.style.visibility = "hidden"
    citasAgendadasContainer.style.display = "unset"
    fechaSeleccionada = true
    mostrarHoras()
}

function mostrarCalendario() {
    btnFechaSeleccionada.style.display = "none"
    calendar.style.display = "inherit"
    thPrev.style.visibility = "visible"
    horasNuevaCita.innerHTML = ""
    citasAgendadasContainer.style.display = "none"
    fechaSeleccionada = false
}

var horasNuevaCita = document.getElementById("horasNuevaCita")
var btnHoraSeleccionada = document.getElementById("btnHoraSeleccionada")
var horaFloat = 0

function mostrarHoras() {
    var concat = "<p style='width:100%;'>Selecciona una hora para la cita *</p>"
    var horasDisponibles = 19
    for (let i = 8; i < horasDisponibles; i++) {
        if (i < 12) {
            concat += "<button style='margin-right: 0.5rem;' onclick='mostrarHoraSeleccionada(" + i + ")' class='boton wrapBoton'>" + i + ":00 AM</button>"
            horaFloat = i + 0.5
            concat += "<button style='margin-right: 0.5rem;' onclick='mostrarHoraSeleccionada(" + horaFloat + ")' class='boton wrapBoton'>" + i + ":30 AM</button>"
        } else if (i > 13) {
            concat += "<button style='margin-right: 0.5rem;' onclick='mostrarHoraSeleccionada(" + i + ")' class='boton wrapBoton'>" + (i - 12) + ":00 PM</button>"
            horaFloat = i - 12 + 0.5
            concat += "<button style='margin-right: 0.5rem;' onclick='mostrarHoraSeleccionada(" + horaFloat + ")' class='boton wrapBoton'>" + (i - 12) + ":30 PM</button>"
        }
    }

    horasNuevaCita.innerHTML = concat
    horasNuevaCita.style.display = "flex"
    btnHoraSeleccionada.style.display = "none"
    horaFloat = 0
}

function mostrarHoraSeleccionada(hora) {
    horaFloat = hora
    var horaInt = Math.trunc(hora)
    var horaStr = ""
    if (horaInt < 12) {
        if (horaInt - hora != 0) {
            horaStr += horaInt + ":30 AM"
        } else {
            horaStr += horaInt + ":00 AM"
        }
    } else if (horaInt > 12) {
        horaInt -= 12
        if (horaInt - (hora -= 12) != 0) {
            horaStr += horaInt + ":30 AM"
        } else {
            horaStr += horaInt + ":00 AM"
        }
    }

    console.log(horaStr)
    btnHoraSeleccionada.innerHTML = horaStr
    horasNuevaCita.style.display = "none"
    btnHoraSeleccionada.style.display = "inherit"
}

var nombreInput = document.getElementById("nombre")
var numIdentificacionInput = document.getElementById("nId")
var numTelefono1Input = document.getElementById("numTel1")
var entidadSaludInput = document.getElementById("entidad")

function camposValidos() {
    if (!fechaSeleccionada || horaFloat == 0 || nombreInput.value == "" || numIdentificacionInput.value == "" ||
        numTelefono1Input.value == "" || entidadSalud.value == "") {
        return false
    }
    return true
}

//TODO: Agregar la verificación de los campos obligatorios
/**
 * Esta función retorna un JSON con toda la información empaquetada relevante para una cita,
 * a continuación se listan todas las llaves y su tipo de dato, las que son obligatorias
 * estarán marcadas con un * al final
 * fecha* Date
 * hora* float (con x.5 se denotará la hora x y 30 minutos)
 * nombre* String
 * numIdentificacion* String
 * numTelefono1* String
 * numTelefono2 String
 * documentos String
 * copago int (Si este valor no es indicado, se entiende que no requiere copago)
 * entidadSalud String
 */
function obtenerInfoCita() {
    if (camposValidos()) {
        var infoCita = { "fecha": actualDate, "hora": horaFloat }
        var numTelefono2Input = document.getElementById("numTel2")
        var documentosInput = document.getElementById("docs")
        var copagoInput = document.getElementById("valorCopago")
        infoCita.nombre = nombreInput.value
        infoCita.numIdentificacion = numIdentificacionInput.value
        infoCita.numTelefono1 = numTelefono1Input.value
        infoCita.entidadSalud = entidadSaludInput.value
        if (numTelefono2Input.value != "") {
            infoCita.numTelefono2 = numTelefono2Input.value
        }
        if (documentosInput.value != "") {
            infoCita.documentos = documentosInput.value
        }
        if (copagoInput.value != "") {
            infoCita.copago = copagoInput.value
        }
        return infoCita
    } else {
        alert("Por favor proporciona los campos obligatorios")
        return null
    }
}

function mostrarInfoCita() {
    console.log(obtenerInfoCita())
}