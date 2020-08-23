import express from "express";
import * as seguridadController from "../controllers/seguridad.controller";

export const seguridadRoute = () => {
  const router = express.Router();
  const path = "/seguridad";

  router.post(`${path}/token`, seguridadController.obtenerToken);

  return router;
};
