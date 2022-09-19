/* eslint-disable require-jsdoc */
// import Joi from 'joi';
// import dayjs from 'dayjs';
import mongo from '../db/db.js';

// middleware - daqui a pouco ele sai daqui
async function hasUser(req, res, next) {
  const {token} = req.headers;

  try {
    const db = await mongo();

    const user = await db.collection('sessionsBD').findOne({token: token});

    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.user = user;
    // Passar pro controller
    next();
  } catch (error) {
    console.log(error);
    return res.send(500);
  }
}

export default hasUser;
