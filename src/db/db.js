import { MongoClient } from 'mongodb';
const mongoClient = new MongoClient('mongodb://localhost:27017')

export default async function mongo () {
    let conn;

    try {
        
        conn = await mongoClient.db('booksBD')
    return conn;
    } catch (error) {
        console.error(error)
        return error;    
    }
}