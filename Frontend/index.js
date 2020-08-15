var btnOptBarL = document.getElementById("btnOptBarL")
var btnOptBarR = document.getElementById("btnOptBarR")

function showAgendar() {
    btnOptBarL.style.backgroundColor = "white"
    btnOptBarL.style.color = "var(--secondaryDark)"

    btnOptBarR.style.backgroundColor = "var(--secondary)"
    btnOptBarR.style.color = "white"
}

function showCitas() {
    btnOptBarR.style.backgroundColor = "white"
    btnOptBarR.style.color = "var(--secondaryDark)"

    btnOptBarL.style.backgroundColor = "var(--secondary)"
    btnOptBarL.style.color = "white"
}