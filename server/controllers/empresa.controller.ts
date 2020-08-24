import { Request, Response } from "express";
import { queryBD } from "../services/bd.service";
import { obtenerCoordenadas } from "../services/maps.service";
import {
  validarEmpresa,
  validarcatalogo,
  CatalogoSede,
} from "../models/empresa.model";
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
    console.log("----->", localStorage.getItem("user"));

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

export const Catalogo = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const valid = validarcatalogo(data);
    if (valid.error)
      throw `Objeto no valido ${JSON.stringify(
        valid.error.details.map((det) => det.message)
      )}`;

    const { sp_existeEmpresa } = (
      await queryBD(`SELECT public."sp_existeEmpresa"(${data.id_empresa})`)
    )[0];

    const { sp_existeMoneda } = (
      await queryBD(`SELECT public."sp_existeMoneda"(${data.id_moneda})`)
    )[0];

    const { sp_existeCategoria } = (
      await queryBD(`SELECT public."sp_existeCategoria"(${data.id_categoria})`)
    )[0];

    if (
      sp_existeEmpresa == 0 ||
      sp_existeMoneda == 0 ||
      sp_existeCategoria == 0
    )
      throw {
        sp_existeEmpresa,
        sp_existeMoneda,
        sp_existeCategoria,
      };

    let query = `Insert into catalogos (tipo, nombre, descripcion,costo, id_categoria, id_moneda, id_empresa) values 
    ('${data.tipo}','${data.nombre}','${data.descripcion}',${data.costo},${data.id_categoria},${data.id_moneda},${data.id_empresa}) RETURNING id`;
    if (data.id)
      query = `UPDATE catalogos set
     tipo='${data.tipo}', nombre='${data.nombre}', descripcion = '${data.descripcion}', id_categoria=${data.id_categoria}, 
     id_moneda = ${data.id_moneda} where id = ${data.id}`;

    const result = await queryBD(query);
    if (result.error) throw result.error;

    res.send({ result: "ok", id: data.id ? data.id : result[0].id });
  } catch (err) {
    res.status(500).send({ err, msj: "Error interno" });
  }
};

export const relacionarCatalogoSede = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const valid = CatalogoSede(data);

    if (valid.error) throw valid.error.details.map((det) => det.message);

    const resultCatalogo = (
      await queryBD(
        `select * from  catalogo_sede where id_sede = ${data.id_sede}`
      )
    ).map((resp: any) => resp.id_catalogo);

    data.catalogos.forEach(async (catalogo: any) => {
      const accion = resultCatalogo.indexOf(catalogo.id_catalogo);
      let result;
      switch (accion) {
        case -1:
          result = await queryBD(
            `insert into catalogo_sede values (${data.id_sede},${catalogo.id_catalogo},${catalogo.estado})`
          );
          break;
        default:
          result = await queryBD(
            `UPDATE catalogo_sede set estado = ${catalogo.estado}
               where id_catalogo=${catalogo.id_catalogo} and id_sede = ${data.id_sede}`
          );
          break;
      }
      if (result.error) throw result.error;

      result = await queryBD(`select id_catalogo,estado from catalogo_sede`);
      if (result.error) throw result.error;
      res.send({
        data: {
          id_sede: data.id_sede,
          catalogos: result,
        },
      });
    });
  } catch (err) {
    res.status(500).send({ err, msj: "Error Interno" });
  }
};
