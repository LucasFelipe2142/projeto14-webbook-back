/* eslint-disable new-cap */
import express from 'express';
import {postLogin} from '../src/controller/login.js';

const router = express.Router();

router.post('/login', postLogin);

export default router;

