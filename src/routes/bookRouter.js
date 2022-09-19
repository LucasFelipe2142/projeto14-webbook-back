/* eslint-disable new-cap */
import express from 'express';
import {postBook, getBook} from '../controller/books.js';
import {validaBook} from '../middlewares/validations.js';

const router = express.Router();

router.post('/sold', validaBook, postBook);

router.get('/home/:genre', getBook);

export default router;
