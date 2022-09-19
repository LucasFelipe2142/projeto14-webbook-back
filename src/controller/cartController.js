import mongo from '../db/db.js';
import dotenv from 'dotenv';

dotenv.config();

const db = await mongo();

const cartClean = async (req, res) => {
  const user = res.locals.user;



  const userId = user.userId.toString();

  try {
    await db
        .collection('cart')
        .deleteMany({userId});

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const cartGet = async (req, res) => {
  const user = res.locals.user;



  const userId = user.userId.toString();

  try {
    const booksCart = await db
        .collection('cart')
        .findOne({userId: user.userId});


      console.log(booksCart);
    if (!booksCart) {
      res.sendStatus(404);
      return;
    }

    res.status(200).send(booksCart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const cartInsert = async (req, res) => {
  const user = res.locals.user;

  const bookData = req.body;


  try {
    
    const userId = user.userId.toString();
    console.log(user);

    const cart = await db
        .collection('cart')
        .findOne({userId: userId});

      if (!cart) {
        const newCart = {
          userId:userId, 
          products:[bookData],
          totalPrice:bookData.price};

          await db.collection('cart').insertOne(newCart);
          return res.sendStatus(200);
      }


    

    const upDateProducts = [...cart.products, bookData];

    let total = 0;
    for (let i=0; i<upDateProducts.length; i++) {
      total = upDateProducts[i].price + total;
    }

    await db.collection('cart').updateOne({
      _id: cart._id,
    }, {$set: {products: upDateProducts, totalPrice: total}});
    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}
export {cartGet, cartInsert, cartClean};
