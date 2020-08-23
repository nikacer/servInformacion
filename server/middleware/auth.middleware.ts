import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../services/auth.service";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const status = verificarToken(token);
      if (status) {
        next();
      } else {
        throw "Token incorrecto";
      }
    }
  } catch (err) {
    res.status(401).send({
      error: err,
    });
  }
};
