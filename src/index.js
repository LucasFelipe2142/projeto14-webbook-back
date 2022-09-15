/* eslint-disable require-jsdoc */
import express from 'express';
import cors from 'cors';
import {postCadastro, getCadastro} from './cadastro.js';
import {postLogin, Delete} from './login.js';
import {postBook, getBook} from './books.js';
import {validaCadastro, validaBook} from './validations.js';

const app = start();

app.post('/cadastro', validaCadastro, postCadastro);

app.get('/cadastro', getCadastro);

app.post('/login', postLogin);

app.delete('/logout/:token', Delete);

app.post('/sold', validaBook, postBook);

app.get('/home/:genre', getBook);

app.listen(process.env.PORT, () => {
  console.log('Server running on port ' + process.env.PORT);
});

function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  return app;
}
