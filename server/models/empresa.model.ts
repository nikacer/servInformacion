import * as Joi from "joi";

export const validarEmpresa = (input: object) => {
  const sedes = Joi.object({
    id: Joi.string().optional(),
    direccion: Joi.string().required(),
    telefono: Joi.number().required(),
  });

  const schema = Joi.object({
    id: Joi.string().optional(),
    nombre: Joi.string().required(),
    sedes: Joi.array().ordered(sedes).required().min(1),
  });

  return schema.validate(input);
};

export const validarcatalogo = (input: object) => {
  const catalogo = Joi.object({
    id: Joi.string().optional(),
    tipo: Joi.string().required().max(1),
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    costo: Joi.number().required(),
    id_moneda: Joi.number().required(),
    id_categoria: Joi.number().required(),
    id_empresa: Joi.number().required(),
  });

  return catalogo.validate(input);
};

export const CatalogoSede = (input: object) => {
  const catalogoSede = Joi.object({
    id_catalogo: Joi.number().required(),
    estado: Joi.boolean().required(),
  });

  const schema = Joi.object({
    id_sede: Joi.number().required(),
    catalogos: Joi.array().ordered(catalogoSede).min(1),
  });

  return schema.validate(input);
};
