import joi from 'joi';
import dayjs from 'dayjs';

import mongo from '../db/db.js';


let db = await mongo();

const cartGet = async (req, res) => {
  const user = res.locals.user;

  try {
    const booksCart = await db
      .collection('cart')
      .findOne({ id: user.id });

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
    const cart = await db
      .collection('cart')
      .findOne({id: user.id});

      if (!cart) {
        const newCart = {userid:user.id, 
          products:[bookData],
          totalPrice:bookData.price};

          await db.collection('cart').insertOne({
            newCart
          });
          return res.sendStatus(200);
      }



    if(cart.product.some(product => bookData._id === product.id)){
      res.sendStatus(404)
      return;
    }

    const upDateProducts = [...cart.products, bookData];

      let total = 0;
      for(i=0; i<upDateProducts.length; i++){
        total = upDateProducts[i].price + total;
      }

      const newCart = {id,upDateProducts,totalPrice}

      await db.collection('cart').updateOne({ 
        _id: user._id 
      }, { $set: newCart })
      return res.sendStatus(200);

    
   //   products:[{name: , price:, sinopse:, quant:, imgUrl:}, {}, {}]}
    //  totalPrice
    //  id
    
  } catch(error)
    {
      console.log(error);
      res.sendStatus(500)
    }

};

export { cartGet, cartInsert};
