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
	getHoursClin();
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

//				Registrar un nuevo paciente				//
var newPatientName = document.getElementById("newPatientName"),
	newPatientId = document.getElementById("newPatientId"),
	newPatientPhone = document.getElementById("newPatientPhone"),
	newPatientObs = document.getElementById("newPatientObs");

function registrar(datos) {
	fetch("http://localhost:3001/api/v1/paciente", {
		method: "POST",
		body: JSON.stringify(datos),
		headers: {
			Accepts: "application/json",
			"Content-type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			emptyRegistryFields();
			alert("Se guardó correctamente el usuario.");
		})
		.catch((err) => console.log(err));
}

function emptyRegistryFields() {
	newPatientName.value = "";
	newPatientId.value = "";
	newPatientPhone.value = "";
	newPatientObs.value = "";
}

function validateRegFields() {
	if (isNaN(newPatientPhone.value)) {
		alert("Debes ingresar un número telefónico válido").show();
		return;
	} else if (
		newPatientName.value == "" ||
		newPatientId.value == "" ||
		newPatientPhone.value == ""
	) {
		alert("Indica los campos necesarios por favor");
		return;
	} else {
		let nombre = newPatientName.value,
			_id = parseInt(newPatientId.value),
			telefono = parseInt(newPatientPhone.value),
			observaciones = newPatientObs.value;
		let info = {
			_id,
			nombre,
			telefono,
			observaciones,
		};
		if (observaciones == "") {
			info = {
				_id,
				nombre,
				telefono,
			};
		}
		registrar(info);
	}
}

//				Buscar un paciente por nombre				//
var nombre = "",
	resultsContainer = document.getElementById("searchResultsContainer"),
	nameSearchField = document.getElementById("nameSearch"),
	resultsArray = [];
function buscar() {
	nombre = nameSearchField.value;
	if (nombre != "") {
		resultsContainer.innerHTML = "";
		fetch("http://localhost:3001/api/v1/paciente/nombre/" + nombre)
			.then((res) => res.json())
			.then((datos) => {
				resultsArray = datos;
				if (datos.length > 0) {
					resultsContainer.innerHTML +=
						"<P>Selecciona uno de los nombres para ver su perfil</P>";
				}
				for (var i = 0; i < datos.length; i++) {
					resultsContainer.innerHTML += `<a class="internalLink" onclick="mostrarPerfil(${i})">
					<button>
						<p>${datos[i].nombre}</p>
						<p>${datos[i]._id}</p>
					</button>
				</a>`;
				}
			});
	} else {
		alert("Por favor indica algo para buscar.");
	}
}

//				Mostrar perfil de un paciente				//
var profileName = document.getElementById("profileName"),
	profileId = document.getElementById("profileId"),
	profileControlsQ = document.getElementById("profileControlsQ"),
	profilePhone = document.getElementById("profilePhone"),
	profileObs = document.getElementById("profileObs"),
	profileIndex = 0;
function mostrarPerfil(index) {
	profileIndex = index;
	profileName.innerHTML = resultsArray[index].nombre;
	profileId.innerHTML = resultsArray[index]._id;
	profilePhone.innerHTML = resultsArray[index].telefono;
	profileObs.innerHTML = resultsArray[index].observaciones;
	fetch(
		"http://localhost:3001/api/v1/paciente/controles/" + resultsArray[index]._id
	)
		.then((res) => res.json())
		.then((info) => {
			profileControlsQ.innerHTML = info.controles;
		});
}

//				Actualizar observaciones				//

var profileObsField = document.getElementById("profileObsField");
function updateObs() {
	let obs = profileObsField.value;
	if (obs != "") {
		let jsonString = {
			cedula: resultsArray[profileIndex]._id,
			observaciones: obs,
		};
		fetch("http://localhost:3001/api/v1/paciente/observaciones/", {
			method: "POST",
			body: JSON.stringify(jsonString),
			headers: {
				Accepts: "application/json",
				"Content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((info) => {
				console.log(info);
				profileObs.innerHTML = info.observaciones + " " + obs;
				profileObsField.value = "";
			});
	} else {
		alert("Agrega algo a las observaciones antes de guardar.");
	}
}

//				Mostrar disponibilidad horaria de citas clínicas				//

function getHoursClin() {}
