import mongo from '../db/db.js';


let db = await mongo();

const cartGet = async (req, res) => {
  const user = res.locals.user;

  let userId = user.userId.toString();
  

  try {
    const booksCart = await db
      .collection('cart')
      .findOne({ userId: userId });

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
  console.log(user);
  const bookData = req.body;
  console.log(bookData);

 


  try {
    //const user = await db.collection('sessionsBD').findOne({ token: user.token });
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



    // if(cart.products.some(product => bookData._id === product.id)){
    //   res.status(404).send("Este livro já está no carrinho");
    //   return;
    // }

    const upDateProducts = [...cart.products, bookData];

      let total = 0;
      for(let i=0; i<upDateProducts.length; i++){
        total = upDateProducts[i].price + total;
      }

      //const newCart = {id,upDateProducts,total}

      console.log("chegou");
      console.log(cart);
      await db.collection('cart').updateOne({ 
        _id: cart._id 
      }, { $set: {products: upDateProducts, totalPrice: total} })
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
