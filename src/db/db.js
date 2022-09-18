import { MongoClient } from 'mongodb';
const mongoClient = new MongoClient('mongodb://localhost:27017')

export default async function mongo () {
    let conn;

    try {
        
        conn = mongoClient.db('webookBD');
    return conn;
    } catch (error) {
        console.error(error)
        return error;    
    }
}
