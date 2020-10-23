var btnFechaSeleccionada = document.getElementById("btnFechaSeleccionada");
var calendar = document.getElementById("calendarVer");
var thPrev = document.getElementById("thPrevVer");
var thMonthYear = document.getElementById("thMonthYearVer");
var thNext = document.getElementById("thNextVer");
var calendarBody = document.getElementById("calendarBodyVer");
var actualDate = new Date();
var htmlBody = "";
var counter = 1;
var actualMonth = actualDate.getMonth();
var todaysDate = new Date();
var monthsString = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];
generateMonth(actualDate);

function generateHtml(monthMatrix) {
	thMonthYear.innerHTML =
		monthsString[actualDate.getMonth()] + " de " + actualDate.getFullYear();
	calendarBody.innerHTML = "";
	htmlBody = "";
	for (let i = 0; i < monthMatrix.length; i++) {
		htmlBody += "<tr style='height: auto;'>";
		for (let j = 0; j < monthMatrix[i].length; j++) {
			if (monthMatrix[i][j] != 0) {
				htmlBody +=
					"\n<td><button class='calendarButton' onclick = 'mostrarFechaSeleccionada(" +
					monthMatrix[i][j] +
					")'>" +
					monthMatrix[i][j] +
					"</button></td>";
			} else {
				htmlBody += "\n<td style='height:0; margin:0; padding:0;'></td>";
			}
			counter++;
		}
		htmlBody += "</tr>";
	}

	calendarBody.innerHTML += htmlBody;
}

function generateMonth(actualDate) {
	monthMatrix = [[], [], [], [], [], []];
	var diaSemana = actualDate.getDay();
	diaSemana = diaSemana == 0 ? 6 : diaSemana - 1;
	for (let i = 0; i < 7; i++) {
		if (actualDate.getMonth() != actualMonth || i < diaSemana) {
			monthMatrix[0][i] = 0;
		} else {
			monthMatrix[0][i] = actualDate.getDate();
			actualDate = new Date(
				actualDate.getFullYear(),
				actualDate.getMonth(),
				actualDate.getDate() + 1
			);
		}
	}
	for (let i = 1; i < 6; i++) {
		for (let j = 0; j < 7; j++) {
			if (actualDate.getMonth() != actualMonth) {
				monthMatrix[i][j] = 0;
			} else {
				monthMatrix[i][j] = actualDate.getDate();
				actualDate = new Date(
					actualDate.getFullYear(),
					actualDate.getMonth(),
					actualDate.getDate() + 1
				);
			}
		}
	}
	generateHtml(monthMatrix);
}

function nextMonth() {
	var month = actualDate.getMonth();
	var year = actualDate.getFullYear();
	if (month == 11) {
		month = 0;
		year++;
	} else {
		month++;
	}
	actualDate = new Date(year, month, 1);
	actualMonth = month;
	generateMonth(actualDate);
	thPrev.style.display = "initial";
	window.scrollTo(0, 2000);
}

function prevMonth() {
	var month = actualDate.getMonth();
	var year = actualDate.getFullYear();
	if (month == 0) {
		month = 11;
		year--;
	} else {
		month--;
	}
	actualDate = new Date(year, month, 1);
	if (actualDate.getMonth() == todaysDate.getMonth()) {
		actualDate = todaysDate;
		thPrev.style.display = "none";
	}
	actualMonth = month;
	generateMonth(actualDate);
	window.scrollTo(0, 2000);
}

function mostrarFechaSeleccionada(day) {
	actualDate = new Date(actualDate.getFullYear(), actualMonth, day);
	btnFechaSeleccionada.innerHTML =
		actualDate.getDate() +
		" de " +
		monthsString[actualMonth] +
		" del " +
		actualDate.getFullYear();
	btnFechaSeleccionada.style.display = "inherit";
	calendar.style.display = "none";
	thPrev.style.visibility = "hidden";
	mostrarCitas();
}

function mostrarCalendario() {
	btnFechaSeleccionada.style.display = "none";
	calendar.style.display = "inherit";
	thPrev.style.visibility = "visible";
	ocultarCitas();
	btnFechaSeleccionada.innerHTML = "";
}
