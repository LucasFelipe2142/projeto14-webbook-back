/* eslint-disable require-jsdoc */
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

let db;

mongoClient.connect().then(() => {
  db = mongoClient.db('webookBD');
});

export async function postLogin(req, res) {
  db.collection('usersBD')
      .findOne({
        email: req.body.email,
      })
      .then((user) => {
        console.log(user);
        if (user === null) return res.send(404);
        else if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const token = uuid();
          db.collection('sessionsBD')
              .insertOne({
                token: token,
                userId: user._id,
              })
              .then(() => {
                delete user.password;
                res.send({token: token, name: user.name, userId: user.userId});
              });
        } else {
          res.send(404);
        }
      });
}

export async function Delete(req, res) {
  const {token} = req.params;
  console.log(token);

  db.collection('sessionsBD')
      .deleteOne({
        token: token,
      })
      .then(() => {
        console.log('achou');
        res.sendStatus(201);
      });
}
