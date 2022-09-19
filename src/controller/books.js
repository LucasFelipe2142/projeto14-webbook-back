/* eslint-disable require-jsdoc */
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);


let db;

mongoClient.connect().then(() => {
  db = mongoClient.db('webookBD');
});

export async function postBook(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  db.collection('sessionsBD')
      .findOne({
        token: token,
      })
      .then((result) => {
        if (result === null) {
          console.log('aqui');
          return res.sendStatus(404);
        }
        console.log(result);
        db.collection('booksBD').insertOne({
          ...req.body,
          userID: result.userID,
        });
        res.sendStatus(201);
      });
}

export async function getBook(req, res) {
  const {genre} = req.params;
  if (genre === 'all') {
    db.collection('booksBD')
        .find()
        .toArray()
        .then((user) => {
          res.send(user);
        });
  } else {
    db.collection('booksBD')
        .find({
          genre: genre,
        })
        .toArray()
        .then((user) => {
          if (user.length === 0) return res.sendStatus(404);
          else {
            res.send(user);
          }
        });
  }
}
