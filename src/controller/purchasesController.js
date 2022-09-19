import mongo from '../db/db.js';

let db = await mongo();

const purchasesPost = async (req, res) => {
    const user = res.locals.user;
  
    let userId = user.userId.toString();

    const purchase = req.body;
    
  
    try {
      const booksPurchases = await db
        .collection('purchases')
        .insert({ purchase, userId });      
  
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  export{purchasesPost};
