var citasAgendadasContainer = document.getElementById(
	"citasAgendadasContainer"
);
var btnFechaSeleccionada = document.getElementById("btnFechaSeleccionada");

function mostrarCitas() {
	getAppoints();
}

function ocultarCitas() {
	citasAgendadasContainer.innerHTML = "";
}

var cantidadCitas = 0;

//				Obtener citas clinicas				//

async function getAppoints() {
	cantidadCitas = 0;
	let response = await fetch(
		"http://localhost:3001/api/v1/cita-clinica/pacientes/" +
			actualDate.getDate() +
			"-" +
			(actualMonth + 1) +
			"-" +
			actualDate.getFullYear()
	);
	let info = await response.json();
	let citas = info.message;
	for (let i = 0; i < citas.length; i++) {
		const citaInfo = citas[i];
		console.log(citaInfo);
		let horaStr =
			parseInt(citaInfo.hora) > 7
				? citaInfo.hora + ":00AM"
				: citaInfo.hora + ":00PM";
		citasAgendadasContainer.innerHTML += `<div class="smallCard">
					<h4 class="subtitlePrimary">Cita clínica</h4>
					<p>${horaStr}</p>
					<details>
						<summary>${citaInfo.nombre}</summary>
						<p>${citaInfo.cedula}</p>
						<p style="margin-bottom: 0;">${citaInfo.telefono}</p>
					</details>
				</div>`;
		cantidadCitas = i;
	}
	response = await fetch(
		"http://localhost:3001/api/v1/cita-reparaciones/pacientes/" +
			actualDate.getDate() +
			"-" +
			(actualMonth + 1) +
			"-" +
			actualDate.getFullYear()
	);
	info = await response.json();
	citas = info.message;
	for (let i = 0; i < citas.length; i++) {
		console.log(citas);
		const citaInfo = citas[i];
		let horaStr =
			parseInt(citaInfo.hora) > 7
				? citaInfo.hora + ":00AM"
				: citaInfo.hora + ":00PM";
		citasAgendadasContainer.innerHTML += `<div class="smallCard">
					<h4 class="subtitleSecondary">Cita de reparaciones</h4>
					<p>${horaStr}</p>
					<details>
						<summary>${citaInfo.nombre}</summary>
						<p>${citaInfo.cedula}</p>
						<p style="margin-bottom: 0;">${citaInfo.telefono}</p>
					</details>
				</div>`;
		cantidadCitas = i;
	}
	if (citasAgendadasContainer.innerHTML.length < 1) {
		citasAgendadasContainer.innerHTML = `
			<div id="nothingFound" style="padding: 0 1rem;">
				<img style="width: 60%; height: auto; margin-top: 1rem;" src="resources/confuso.svg"
					alt="nada">
				<p style="color: #002558;">No se encontró nada, puedes agendar citas en la ventana de pacientes.
				</p>
			</div>`;
	}
}
