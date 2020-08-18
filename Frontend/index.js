var btnOptBarL = document.getElementById("btnOptBarL")
var btnOptBarR = document.getElementById("btnOptBarR")

var agendarContainer = document.getElementById("agendarContainer")
var citasContainer = document.getElementById("citasContainer")

function showAgendar() {
    citasContainer.style.display = "none";
    agendarContainer.style.display = "initial";

    setTimeout(function() {
        btnOptBarL.style.backgroundColor = "white"
        btnOptBarL.style.color = "var(--secondaryDark)"

        btnOptBarR.style.backgroundColor = "var(--secondary)"
        btnOptBarR.style.color = "var(--primaryDark)"

        agendarContainer.style.opacity = 100;
        agendarContainer.style.zIndex = 1;

        citasContainer.style.opacity = 0;
        citasContainer.style.zIndex = -1;
    }, 100);
}

function showCitas() {
    agendarContainer.style.display = "none";
    citasContainer.style.display = "initial";

    setTimeout(function() {
        btnOptBarR.style.backgroundColor = "white"
        btnOptBarR.style.color = "var(--secondaryDark)"

        btnOptBarL.style.backgroundColor = "var(--secondary)"
        btnOptBarL.style.color = "var(--primaryDark)"

        citasContainer.style.opacity = 100;
        citasContainer.style.zIndex = 1;

        agendarContainer.style.opacity = 0;
        agendarContainer.style.zIndex = -1;
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