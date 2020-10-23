var btnFechaSeleccionada = document.getElementById("btnFechaSeleccionada");
var btnCitasContainer = document.getElementById("btnCitasContainer");

function mostrarCitas() {
	btnCitasContainer.style.transform = "scaleX(1)";
	btnCitasContainer.style.opacity = "1";
	btnCitasContainer.style.top = "0";
	btnCitasContainer.style.height = "max-content";
}

function ocultarCitas() {
	btnCitasContainer.style.top = "-5rem";
	btnCitasContainer.style.transform = "scaleX(0)";
	btnCitasContainer.style.opacity = "0";
	btnCitasContainer.style.height = "0";
	window.scrollTo(0, 2000);
}

function openCitasClinicas() {
	document.body.classList.add("showCitasClinicas");
	mostrarHorasClin();
}
function closeCitasClinicas() {
	document.body.classList.remove("showCitasClinicas");
}

function openReps() {
	document.body.classList.add("showReparaciones");
	mostrarHorasReps();
}
function closeReps() {
	document.body.classList.remove("showReparaciones");
}

var chkCopago = document.getElementById("chkCopago");
var valorCopago = document.getElementById("valorCopago");

function habilitarValorCopago() {
	if (chkCopago.checked) {
		valorCopago.disabled = false;
	} else {
		valorCopago.disabled = true;
		valorCopago.value = "";
	}
}

var horasNuevaCita;
var btnHoraSeleccionada;
var horaFloat = 0;

function mostrarHorasReps() {
	horasNuevaCita = document.getElementById("horasReps");
	btnHoraSeleccionada = document.getElementById("btnHorasReps");
	var concat = "<p style='width:100%;'>Selecciona una hora para la cita *</p>";
	var horasDisponibles = 19;
	for (let i = 8; i < horasDisponibles; i++) {
		if (i < 12) {
			concat +=
				"<button onclick='mostrarHoraSelReps(" +
				i +
				")' class='btnSecondary wrapBoton'>" +
				i +
				":00 AM</button>";
			horaFloat = i + 0.5;
			concat +=
				"<button onclick='mostrarHoraSelReps(" +
				horaFloat +
				")' class='btnSecondary wrapBoton'>" +
				i +
				":30 AM</button>";
		} else if (i > 13) {
			concat +=
				"<button onclick='mostrarHoraSelReps(" +
				i +
				")' class='btnSecondary wrapBoton'>" +
				(i - 12) +
				":00 PM</button>";
			horaFloat = i - 12 + 0.5;
			concat +=
				"<button onclick='mostrarHoraSelReps(" +
				horaFloat +
				")' class='btnSecondary wrapBoton'>" +
				(i - 12) +
				":30 PM</button>";
		}
	}

	horasNuevaCita.innerHTML = concat;
	horasNuevaCita.style.display = "flex";
	btnHoraSeleccionada.style.display = "none";
	horaFloat = 0;
}

function mostrarHoraSelReps(hora) {
	horaFloat = hora;
	var horaInt = Math.trunc(hora);
	var horaStr = "";
	if (horaInt < 12) {
		if (horaInt - hora != 0) {
			horaStr += horaInt + ":30 AM";
		} else {
			horaStr += horaInt + ":00 AM";
		}
	} else if (horaInt > 12) {
		horaInt -= 12;
		if (horaInt - (hora -= 12) != 0) {
			horaStr += horaInt + ":30 AM";
		} else {
			horaStr += horaInt + ":00 AM";
		}
	}

	console.log(horaStr);
	btnHoraSeleccionada.innerHTML = horaStr;
	horasNuevaCita.style.display = "none";
	btnHoraSeleccionada.style.display = "inherit";
}

function mostrarHorasClin() {
	horasNuevaCita = document.getElementById("horasClin");
	btnHoraSeleccionada = document.getElementById("btnHorasClin");
	var concat = "<p style='width:100%;'>Selecciona una hora para la cita *</p>";
	var horasDisponibles = 19;
	for (let i = 8; i < horasDisponibles; i++) {
		if (i < 12) {
			concat +=
				"<button onclick='mostrarHoraSelClin(" +
				i +
				")' class='btn wrapBoton'>" +
				i +
				":00 AM</button>";
			horaFloat = i + 0.5;
			concat +=
				"<button onclick='mostrarHoraSelClin(" +
				horaFloat +
				")' class='btn wrapBoton'>" +
				i +
				":30 AM</button>";
		} else if (i > 13) {
			concat +=
				"<button onclick='mostrarHoraSelClin(" +
				i +
				")' class='btn wrapBoton'>" +
				(i - 12) +
				":00 PM</button>";
			horaFloat = i - 12 + 0.5;
			concat +=
				"<button onclick='mostrarHoraSelClin(" +
				horaFloat +
				")' class='btn wrapBoton'>" +
				(i - 12) +
				":30 PM</button>";
		}
	}

	horasNuevaCita.innerHTML = concat;
	horasNuevaCita.style.display = "flex";
	btnHoraSeleccionada.style.display = "none";
	horaFloat = 0;
}

function mostrarHoraSelClin(hora) {
	horaFloat = hora;
	var horaInt = Math.trunc(hora);
	var horaStr = "";
	if (horaInt < 12) {
		if (horaInt - hora != 0) {
			horaStr += horaInt + ":30 AM";
		} else {
			horaStr += horaInt + ":00 AM";
		}
	} else if (horaInt > 12) {
		horaInt -= 12;
		if (horaInt - (hora -= 12) != 0) {
			horaStr += horaInt + ":30 AM";
		} else {
			horaStr += horaInt + ":00 AM";
		}
	}

	console.log(horaStr);
	btnHoraSeleccionada.innerHTML = horaStr;
	horasNuevaCita.style.display = "none";
	btnHoraSeleccionada.style.display = "inherit";
}
