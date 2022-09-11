
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI)


try {
    await mongoClient.connect();
    console.log('conectado o mongo');
} catch (err) {
    console.log('err.message')
}

   const db = mongoClient.db(process.env.DB_NAME);

   export default db;
