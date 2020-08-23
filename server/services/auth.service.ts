import jwt from "jsonwebtoken";
import { environment } from "./environment.service";

export const crearToken = (data: any): string => {
  return jwt.sign(data, environment.pass, {
    expiresIn: 60 * 60 * 24,
  });
};

export const verificarToken = (bearer: string): boolean => {
  const token = bearer.replace("Bearer ", "");
  let ret = false;
  jwt.verify(token, environment.pass, (err: any, data: any) => {
    if (!err) {
      ret = true;
    }
  });

  return ret;
};
