/* eslint-disable require-jsdoc */
import express from 'express';
import cors from 'cors';
import {postCadastro, getCadastro} from './controller/cadastro.js';
import {postLogin, Delete} from './controller/login.js';
import {postBook, getBook} from './controller/books.js';
import {validaCadastro, validaBook} from './middlewares/validations.js';
import cartRoute from './routes/cartRoute.js';
const app = start();

app.post('/cadastro', validaCadastro, postCadastro);

app.get('/cadastro', getCadastro);

app.post('/login', postLogin);

app.delete('/logout/:token', Delete);

app.post('/sold', validaBook, postBook);

app.get('/home/:genre', getBook);

app.use(cartRoute);

// app.listen(5000);
// console.log("server running on port 5000");

app.listen(process.env.PORT, () => {
  console.log('Server running on port ' + process.env.PORT);
});

function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  return app;
}
