/* eslint-disable require-jsdoc */
import Joi from 'joi';

export async function validaCadastro(req, res, next) {
  const validation = schemaRegistration.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}

export async function validaBook(req, res, next) {
  const validation = schemaBook.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    console.log(validation.error);
    return res.send(validation.error);
  }

  next();
}

const schemaRegistration = Joi.object().keys({
  name: Joi.string().min(1).required(),
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .required(),
  password: Joi.string().min(6).required(),
});

const schemaBook = Joi.object().keys({
  name: Joi.string().min(1).required(),
  pag_number: Joi.number().min(1).required(),
  description: Joi.string().min(1).required(),
  autor: Joi.string().min(1).required(),
  url: Joi.string().min(1).required(),
  price: Joi.number().required(),
  genre: Joi.string().required(),
});
