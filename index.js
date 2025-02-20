/**Sin TLS */
//import "dotenv/config";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.js";
import express from "express";
import morganBody from "morgan-body";
//import morgan from "morgan";
import cors from "cors";
//import moment from "moment-timezone";
import { basicAuth } from "./src/helpers/basic-auth.js";
import { router } from "./src/routes/index.js";
import { connect } from "./src/database/db.js";
import { errorHandler } from "./src/helpers/error-handler.js";
import { getMonedasService } from "./src/services/moneda.service.js";
import { getTiposFormasCobrosService } from "./src/services/tipo-forma-cobro.service.js";
import { getMarcasTarjetasService } from "./src/services/marca-tarjeta.service.js";
import { getEntidadesService } from "./src/services/entidad.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

morganBody(app, { maxBodyLength: 2000 });

/*morgan.token("date", (req, res, tz) => {
  return moment().tz(tz).format("DD/MM/YYYY hh:mm:ss.SSSZ");
});

app.use(
  morgan("[:date[America/Asuncion]] :method :url :status :response-time ms")
);*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/**Database */
let connection;
try {
  connection = await connect();
} catch (error) {
  console.log(error);
}

process.on("SIGINT", async () => {
  await connection.close((err) => {
    if (err)
      console.log(
        `Error connecting to ${config.dbSid} database: ${err.message}.`
      );
  });
  console.log(`${config.dbSid} database has been disconnected.`);
  process.exit(0);
});

app.use((req, res, next) => {
  req.db = connection;
  next();
});

app.use(async (req, res, next) => {
  let monedas = await getMonedasService(connection);
  req.monedas = monedas;
  next();
});

app.use(async (req, res, next) => {
  let tiposFormasCobros = await getTiposFormasCobrosService(connection);
  req.tiposFormasCobros = tiposFormasCobros;
  next();
});

app.use(async (req, res, next) => {
  let marcasTarjetas = await getMarcasTarjetasService(connection);
  req.marcasTarjetas = marcasTarjetas;
  next();
});

app.use(async (req, res, next) => {
  let entidades = await getEntidadesService(connection);
  req.entidades = entidades;
  next();
});

app.use("/delsol/api", basicAuth, router);
app.use("*", function (req, res) {
  res.status(404).json({
    env: process.env.NODE_ENV,
    success: false,
    idTransaccion: 0,
    messages: ["Solicitud incorrecta."],
  });
});
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(
    `Server API-VENTAS running on port ${config.port} in mode ${process.env.NODE_ENV}`
  );
});

/**Con TLS */
/*import "dotenv/config";
import https from "https";
import fs from "fs";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import moment from "moment-timezone";
import { basicAuth } from "./src/helpers/basic-auth.js";
import { router } from "./src/routes/index.js";
import { connect } from "./src/database/db.js";
import { errorHandler } from "./src/helpers/error-handler.js";
import { getMonedasService } from "./src/services/moneda.service.js";
import { getTiposFormasCobrosService } from "./src/services/tipo-forma-cobro.service.js";
import { getMarcasTarjetasService } from "./src/services/marca-tarjeta.service.js";
import { getEntidadesService } from "./src/services/entidad.service.js";

const app = express();

morgan.token("date", (req, res, tz) => {
  return moment().tz(tz).format("DD/MM/YYYY hh:mm:ss.SSSZ");
});

app.use(
  morgan("[:date[America/Asuncion]] :method :url :status :response-time ms")
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let connection;
try {
  connection = await connect();
} catch (error) {
  console.log(error);
}

process.on("SIGINT", async () => {
  await connection.close((err) => {
    if (err)
      console.log(
        `Error connecting to ${process.env.DB_SID} database: ${err.message}.`
      );
  });
  console.log(`${process.env.DB_SID} database has been disconnected.`);
  process.exit(0);
});

app.use((req, res, next) => {
  req.db = connection;
  next();
});

app.use(async (req, res, next) => {
  let monedas = await getMonedasService(connection);
  req.monedas = monedas;
  next();
});

app.use(async (req, res, next) => {
  let tiposFormasCobros = await getTiposFormasCobrosService(connection);
  req.tiposFormasCobros = tiposFormasCobros;
  next();
});

app.use(async (req, res, next) => {
  let marcasTarjetas = await getMarcasTarjetasService(connection);
  req.marcasTarjetas = marcasTarjetas;
  next();
});

app.use(async (req, res, next) => {
  let entidades = await getEntidadesService(connection);
  req.entidades = entidades;
  next();
});

app.use("/delsol/api", basicAuth, router);
app.use("*", function (req, res) {
  res.status(404).json({
    success: false,
    idTransaccion: 0,
    messages: ["Solicitud incorrecta."],
  });
});
app.use(errorHandler);

const options = {
  key: fs.readFileSync(`${process.cwd()}/cert/${process.env.KEY}`),
  cert: fs.readFileSync(`${process.cwd()}/cert/${process.env.CERT}`),
  passphrase: process.env.PASSPHRASE,
};

const server = https.createServer(options, app);

server.listen(process.env.PORT, () => {
  console.log("TLS Server API-VENTAS running on port " + process.env.PORT);
});*/
