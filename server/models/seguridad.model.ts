import * as Joi from "joi";

export const validarReqToken = (input: object) => {
  const schema = Joi.object({
    correo: Joi.string().email().required(),
  });
  return schema.validate(input);
};
