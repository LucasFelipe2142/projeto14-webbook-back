/* eslint-disable new-cap */
import express from 'express';
import {postLogin, del} from '../src/controller/login.js';

const router = express.Router();

router.post('/login', postLogin);

router.delete('/logout', del);

export default router;

