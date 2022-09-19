/* eslint-disable new-cap */
import express from 'express';
import {postCadastro, getCadastro} from '../controller/cadastro.js';
import {validaCadastro} from '../middlewares/validations.js';

const router = express.Router();

router.post('/cadastro', validaCadastro, postCadastro);

router.get('/cadastro', getCadastro);

export default router;
