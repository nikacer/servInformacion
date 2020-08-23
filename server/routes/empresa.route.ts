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

  return router;
};
