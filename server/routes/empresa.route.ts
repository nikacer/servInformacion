import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as empresaController from "../controllers/empresa.controller";

export const empresasRoute = () => {
  const router = express.Router();
  const path = "/empresa";

  router.post(
    `${path}/todas`,
    authMiddleware,
    empresaController.consultarEmpresas
  );

  router.post(`${path}/insertar`, authMiddleware, empresaController.Empresa);
  router.post(
    `${path}/catalogo/insertar`,
    authMiddleware,
    empresaController.Catalogo
  );

  router.post(
    `${path}/catalogo/sede`,
    authMiddleware,
    empresaController.relacionarCatalogoSede
  );

  return router;
};
