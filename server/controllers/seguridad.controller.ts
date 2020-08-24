import { Request, Response } from "express";
import { crearToken } from "../services/auth.service";
import { validarReqToken } from "../models/seguridad.model";
import { queryBD } from "../services/bd.service";

export const obtenerToken = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const valid = validarReqToken(data);
    if (valid.error) throw "Objeto no valido";

    const db = await queryBD(
      `select nombre,correo,id_empresa,rol from usuarios where correo = '${data.correo}'`
    );
    if (db.length === 1) {
      localStorage.setItem("user", JSON.stringify(db[0]));
      res.send({ token: crearToken(data) });
    } else {
      throw "usuario no existe";
    }
  } catch (err) {
    res.status(422).send({ err });
  }
};
