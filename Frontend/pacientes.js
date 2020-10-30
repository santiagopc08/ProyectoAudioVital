var btnFechaSeleccionada = document.getElementById("btnFechaSeleccionada"),
	btnCitasContainer = document.getElementById("btnCitasContainer");

var sectionBuscar = document.getElementById("search"),
	sectionRegistrar = document.getElementById("nuevo_usuario"),
	sectionPerfil = document.getElementById("perfil");

// On select date
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

// On select type of appoinment
function openCitasClinicas() {
	document.body.classList.add("showCitasClinicas");
	getHoursClin();
}
function closeCitasClinicas() {
	document.body.classList.remove("showCitasClinicas");
}

function openReps() {
	document.body.classList.add("showReparaciones");
	getHoursReps();
}
function closeReps() {
	document.body.classList.remove("showReparaciones");
}

// For checbox in clinic appoinment
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

//				Mostrar disponibilidad horaria de citas de reparaciones				//
var occHoursReps = [];
function getHoursReps() {
	fetch(
		"http://localhost:3001/api/v1/cita-reparaciones/" +
			actualDate.getDate() +
			"-" +
			(actualMonth + 1) +
			"-" +
			actualDate.getFullYear()
	)
		.then((res) => res.json())
		.then((datos) => {
			occHoursReps = datos.horas;
			mostrarHorasReps();
		});
}

function mostrarHorasReps() {
	var horasDisponibles = [8, 9, 10, 11, 2, 3, 4, 5, 6];
	horasNuevaCita = document.getElementById("horasReps");
	btnHoraSeleccionada = document.getElementById("btnHorasReps");
	var concat = "<p style='width:100%;'>Selecciona una hora para la cita *</p>";
	for (let i = 0; i < occHoursReps.length; i++) {
		for (let j = 0; j < horasDisponibles.length; j++) {
			if (horasDisponibles[j] == parseInt(occHoursReps[i])) {
				horasDisponibles.splice(j, 1);
			}
		}
	}
	for (let i = 0; i < horasDisponibles.length; i++) {
		if (horasDisponibles[i] > 8) {
			concat +=
				"<button onclick='mostrarHoraSel(" +
				horasDisponibles[i] +
				")' class='btnSecondary wrapBoton'>" +
				horasDisponibles[i] +
				":00 AM</button>";
		} else {
			concat +=
				"<button onclick='mostrarHoraSel(" +
				horasDisponibles[i] +
				")' class='btnSecondary wrapBoton'>" +
				horasDisponibles[i] +
				":00 PM</button>";
		}
	}

	horasNuevaCita.innerHTML = concat;
	horasNuevaCita.style.display = "flex";
	btnHoraSeleccionada.style.display = "none";
}

//				Mostrar disponibilidad horaria de citas clínicas				//
var occHoursClin = [];
function getHoursClin() {
	fetch(
		"http://localhost:3001/api/v1/cita-clinica/" +
			actualDate.getDate() +
			"-" +
			(actualMonth + 1) +
			"-" +
			actualDate.getFullYear()
	)
		.then((res) => res.json())
		.then((datos) => {
			occHoursClin = datos.horas;
			mostrarHorasClin();
		});
}

function mostrarHorasClin() {
	var horasDisponibles = [8, 9, 10, 11, 2, 3, 4, 5, 6];
	horasNuevaCita = document.getElementById("horasClin");
	btnHoraSeleccionada = document.getElementById("btnHorasClin");
	var concat = "<p style='width:100%;'>Selecciona una hora para la cita *</p>";
	for (let i = 0; i < occHoursClin.length; i++) {
		for (let j = 0; j < horasDisponibles.length; j++) {
			if (horasDisponibles[j] == parseInt(occHoursClin[i])) {
				horasDisponibles.splice(j, 1);
			}
		}
	}
	for (let i = 0; i < horasDisponibles.length; i++) {
		if (horasDisponibles[i] > 8) {
			concat +=
				"<button onclick='mostrarHoraSel(" +
				horasDisponibles[i] +
				")' class='btn wrapBoton'>" +
				horasDisponibles[i] +
				":00 AM</button>";
		} else {
			concat +=
				"<button onclick='mostrarHoraSel(" +
				horasDisponibles[i] +
				")' class='btn wrapBoton'>" +
				horasDisponibles[i] +
				":00 PM</button>";
		}
	}

	horasNuevaCita.innerHTML = concat;
	horasNuevaCita.style.display = "flex";
	btnHoraSeleccionada.style.display = "none";
}

var horaSel = 0;

function mostrarHoraSel(hora) {
	var horaStr = "";
	if (hora > 8) {
		horaStr += hora + ":00 AM";
	} else {
		horaStr += hora + ":00 PM";
	}
	horaSel = hora;
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
				} else {
					resultsContainer.innerHTML = `
					<div id="nothingFound" style="padding: 0 1rem;">
						<img style="width: 60%; height: auto; margin-top: 1rem;" src="resources/confuso.svg"
							alt="nada">
						<p style="color: #002558;">No se encontró nada, prueba buscar o registrar un paciente.
						</p>
					</div>`;
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
	sectionRegistrar.style.display = "none";
	sectionBuscar.style.display = "none";
	sectionPerfil.style.display = "block";
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

//				Agendar cita clínica				//

var docs = document.getElementById("docs"),
	entidad = document.getElementById("entidad");
function agendarClin() {
	let docsStr = docs.value,
		valorCopagoStr = chkCopago.checked ? valorCopago.value : "0",
		entidadStr = entidad.value;
	if (entidadStr != "") {
		let jsonString = {
			cedula: resultsArray[profileIndex]._id,
			fecha:
				actualDate.getDate() +
				"-" +
				(actualMonth + 1) +
				"-" +
				actualDate.getFullYear(),
			hora: horaSel,
			documentos: docsStr,
			valorCopago: valorCopagoStr,
			entidadSalud: entidadStr,
		};
		fetch("http://localhost:3001/api/v1/cita-clinica/", {
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
				alert("Se agendó correctamente la cita.");
				closeCitasClinicas();
				docs.value = "";
				entidad.value = "";
			});
	} else {
		alert("Por favor indica la entidad de salud.");
	}
}

//				Agendar cita de reparaciones				//

var newRepsObs = document.getElementById("newRepsObs");
function agendarReps() {
	let newRepsObsStr = newRepsObs.value;
	if (newRepsObsStr != "") {
		let jsonString = {
			cedula: resultsArray[profileIndex]._id,
			fecha:
				actualDate.getDate() +
				"-" +
				(actualMonth + 1) +
				"-" +
				actualDate.getFullYear(),
			hora: horaSel,
			observaciones: newRepsObsStr,
		};
		fetch("http://localhost:3001/api/v1/cita-reparaciones/", {
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
				alert("Se agendó correctamente la cita.");
				closeReps();
				newRepsObs.value = "";
			});
	} else {
		alert("Por favor indica las observaciones de la reparación.");
	}
}

function showSearchRegister() {
	sectionRegistrar.style.display = "block";
	sectionBuscar.style.display = "block";
	sectionPerfil.style.display = "none";
}
