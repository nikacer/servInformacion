import { Request, Response } from "express";
import { crearToken } from "../services/auth.service";
import { validarReqToken } from "../models/seguridad.model";

export const obtenerToken = (req: Request, res: Response) => {
  try {
    const data = req.body;
    const valid = validarReqToken(data);
    if (valid.error) throw "Objeto no valido";

    res.send({ token: crearToken(data) });
  } catch (err) {
    res.status(422).send({ err });
  }
};
