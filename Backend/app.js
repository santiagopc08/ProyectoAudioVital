const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
const db = require("./db/db");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1", routes);

db.then(() => {
	console.log("Se ha conectado a la base de datos");
});

app.set("port", process.env.PORT || 3001);

const server = app.listen(app.get("port"), () => {
	console.log("El servidor está en:");
	console.log("http://localhost:" + server.address().port);
});
