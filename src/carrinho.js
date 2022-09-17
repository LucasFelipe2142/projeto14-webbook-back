import db from './db/db';


  export async function getBook(req, res) {

    
    if (genre === 'all') {
      db.collection('booksBD')
          .find()
          .toArray()
          .then((user) => {
            res.send(user);
          });
    } else {
      db.collection('booksBD').find({
        genre: genre,
      }).toArray().then((user) => {
        if (user.length === 0) return res.sendStatus(404);
        else {
          res.send(user);
        }
      });
    }
  }