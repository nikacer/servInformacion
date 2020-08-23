import express from "express";
import bodyParser from "body-parser";
import { environment } from "./services/environment.service";

import { empresasRoute } from "./routes/empresa.route";
import { seguridadRoute } from "./routes/seguridad.route";

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(seguridadRoute());
server.use(empresasRoute());

const port = environment.port;

server.listen(port, () => {
  console.log(`Servicio iniciado en el puerto ${port}`);
});
