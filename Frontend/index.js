var btnOptBarL = document.getElementById("btnOptBarL")
var btnOptBarM = document.getElementById("btnOptBarM")
var btnOptBarR = document.getElementById("btnOptBarR")

var agendarContainer = document.getElementById("agendarContainer")
var registrarContainer = document.getElementById("registrarContainer")
var citasContainer = document.getElementById("citasContainer")

function showCitas() {
    agendarContainer.style.display = "none";
    citasContainer.style.display = "initial";
    registrarContainer.style.display = "none";

    setTimeout(function() {
        btnOptBarR.style.backgroundColor = "white"
        btnOptBarR.style.color = "var(--secondaryDark)"

        btnOptBarL.style.backgroundColor = "var(--secondary)"
        btnOptBarL.style.color = "var(--primaryDark)"

        btnOptBarM.style.backgroundColor = "white"
        btnOptBarM.style.color = "var(--secondaryDark)"

        citasContainer.style.opacity = 100;
        citasContainer.style.zIndex = 1;

        agendarContainer.style.opacity = 0;
        agendarContainer.style.zIndex = -1;

        registrarContainer.style.opacity = 0;
        registrarContainer.style.zIndex = -1;
    }, 100);
}

function showRegistrar() {
    citasContainer.style.display = "none";
    registrarContainer.style.display = "initial"
    agendarContainer.style.display = "none";

    setTimeout(function() {
        btnOptBarM.style.backgroundColor = "var(--secondary)"
        btnOptBarM.style.color = "var(--primaryDark)"

        btnOptBarR.style.backgroundColor = "white"
        btnOptBarR.style.color = "var(--secondaryDark)"

        btnOptBarL.style.backgroundColor = "white"
        btnOptBarL.style.color = "var(--secondaryDark)"

        registrarContainer.style.opacity = 100;
        registrarContainer.style.zIndex = 1;

        agendarContainer.style.opacity = 0;
        agendarContainer.style.zIndex = 1;

        citasContainer.style.opacity = 0;
        citasContainer.style.zIndex = -1;
    }, 100);
}

function showAgendar() {
    citasContainer.style.display = "none";
    agendarContainer.style.display = "initial";
    registrarContainer.style.display = "none";

    setTimeout(function() {
        btnOptBarL.style.backgroundColor = "white"
        btnOptBarL.style.color = "var(--secondaryDark)"

        btnOptBarM.style.backgroundColor = "white"
        btnOptBarM.style.color = "var(--secondaryDark)"

        btnOptBarR.style.backgroundColor = "var(--secondary)"
        btnOptBarR.style.color = "var(--primaryDark)"

        agendarContainer.style.opacity = 100;
        agendarContainer.style.zIndex = 1;

        citasContainer.style.opacity = 0;
        citasContainer.style.zIndex = -1;

        registrarContainer.style.opacity = 0;
        registrarContainer.style.zIndex = -1;

    }, 100);
}

var textareaDocs = document.getElementById("docs")

expandirDocs()

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
var calendarBody = document.getElementById("calendarBody")
var calendar = document.getElementById("calendar")
var btnFechaSeleccionada = document.getElementById("btnFechaSeleccionada")

var htmlBody = ""
var counter = 1
var thMonthYear = document.getElementById("thMonthYear")
var thNext = document.getElementById("thNext")
var thPrev = document.getElementById("thPrev")
var actualDate = new Date()
var actualMonth = actualDate.getMonth()
var todaysDate = new Date()
var monthsString = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]
generateMonth(actualDate)

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

function mostrarFechaSeleccionada(dia) {
    var fecha = new Date(actualDate.getFullYear(), actualMonth, dia)
    btnFechaSeleccionada.innerHTML = fecha.getDate() + " de " + monthsString[actualMonth] + " del " + fecha.getFullYear()
    btnFechaSeleccionada.style.display = "inherit"
    calendar.style.display = "none"
    thPrev.style.visibility = "hidden"
}

function mostrarCalendario() {
    btnFechaSeleccionada.style.display = "none"
    calendar.style.display = "inherit"
    thPrev.style.visibility = "visible"
}