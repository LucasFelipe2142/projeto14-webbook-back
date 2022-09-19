/* eslint-disable new-cap */
import express from 'express';
import {postLogin, Delete} from '../src/controller/login.js';

const router = express.Router();

router.post('/login', postLogin);

router.delete('/logout', Delete);

export default router;

