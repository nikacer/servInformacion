import { Request, Response } from "express";
import { queryBD } from "../services/bd.service";
import { obtenerCoordenadas } from "../services/maps.service";
import { validarEmpresa } from "../models/empresa.model";
import Joi from "joi";
import { Query } from "pg";

export const consultarEmpresas = async (req: Request, res: Response) => {
  try {
    const result = await queryBD("select * from empresas");
    res.send(result);
  } catch (err) {
    res.status(500).send({ err: err });
  }
};

export const Empresa = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const result = validarEmpresa(data);
    if (result.error)
      throw (
        "Objeto No valido " +
        JSON.stringify(result.error.details.map((det) => det.message))
      );

    let query = `insert into empresas (nombre) values ('${data.nombre}') RETURNING id`;
    if (data.id) {
      query = `update empresas SET nombre = '${data.nombre}' where id= ${data.id}`;
    }
    const resultDB = await queryBD(query);
    if (resultDB.error) throw resultDB.error;
    if (!data.id) data.id = resultDB[0].id;

    await data.sedes.forEach(async (sede: any) => {
      const coordenadas = await obtenerCoordenadas(sede.direccion);
      query = `insert into sedes (direccion, coordenadas, telefono, id_empresa) values ('${sede.direccion}',point(${coordenadas.lat},${coordenadas.lng}),${sede.telefono}, '${data.id}')`;
      if (sede.id)
        query = `UPDATE sedes set direccion = '${sede.direccion}', coordenadas = point(${coordenadas.lat},${coordenadas.lng}), telefono = ${sede.telefono} WHERE id = '${sede.id}'`;
      const result = await queryBD(query);
      if (result.error) throw result.error;
    });

    res.send({ result: "ok" });
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const Catalogo = (req: Request, res: Response) => {};
