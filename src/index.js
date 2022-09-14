/* eslint-disable require-jsdoc */
import express from 'express';
import cors from 'cors';
import Joi from 'joi';
import {postCadastro, getCadastro} from './cadastro.js';
import {postLogin, Delete} from './login.js';

const app = start();

async function validaCadastro(req, res, next) {
  const validation = schemaRegistration.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    return res.sendStatus(422);
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

app.post('/cadastro', validaCadastro, postCadastro);

app.get('/cadastro', getCadastro);

app.post('/login', postLogin);

app.delete('/logout/:token', Delete);

app.listen(5000);

function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  return app;
}
