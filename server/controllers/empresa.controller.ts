import { Request, Response } from "express";

export const consultarEmpresas = (req: Request, res: Response) => {
  console.log("entro");

  res.status(200).send({ resul: "ok" });
};
