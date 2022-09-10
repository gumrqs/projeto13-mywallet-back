import express,{json} from "express";
import Joi from "joi";
import cors from "cors";
import dotenv from "dotenv"
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

dotenv.config();

const server = express();
server.use(cors());
server.use(json());
 
const mongoClient = new MongoClient(process.env.MONGO_URI)

let db;

mongoClient.connect().then(()=>{
    db = mongoClient.db(process.env.DB_NAME);
});









const port = process.env.PORT || 5000;

server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});