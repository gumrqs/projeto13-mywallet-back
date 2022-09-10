import express,{json} from "express";
import joi from "joi";
import cors from "cors";
import dotenv from "dotenv"
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";


dotenv.config();

const server = express();
server.use(cors());
server.use(json());



const participantsSchema = joi.object({ 
    name: joi.string().required(),
    password: joi.required(),
    email: joi.string().email({ minDomainSegments: 2, tlds:{allow: ['com','net'] }}).required()
})

const mongoClient = new MongoClient(process.env.MONGO_URI)

let db;


mongoClient.connect().then(()=>{
    db = mongoClient.db(process.env.DB_NAME);
});


server.post('/sign-up', async (req,res)=>{
    const user = req.body;
    try {
        const invalidName = participantsSchema.validate(user).error;

        if(invalidName){
        
            return res.status(422).send('Formato inválido')
        }
        

        const registerUser = await db.collection('users').findOne({email:user.email});

            if(registerUser){
                return res.status(409).send('email já utilizado')
            }
            const passwordHash = bcrypt.hashSync(user.password,10);
            const response = await db.collection('users').insertOne({
                name: user.name,
                email: user.email,
                password: passwordHash
            });
            console.log(passwordHash, '*************')
            res.status(201).send('usuário registrado com sucesso!');

    } catch (error) {
        return res.status(500).send(error.message);
    }
});
server.post('/sign-in', async (req,res)=>{
    try {
        const loginUser = req.body;
        const user = await db.collection('users').findOne({email: loginUser.email})

        const passwordValid = bcrypt.compareSync(loginUser.password, user.password);
        if(user && passwordValid){
            const token= uuid();
            const response = await db.collection('sessions').insertOne({
                userId: user._id,
                token: token
            });
            console.log(response, '**************')
            return res.status(201).send(token)
        } else {
            return res.status(401).send('email ou senha inválidos')
        }
        
    } catch (error) {
       return  res.status(500).send(error.message);
    }
});

server.get('/home', async(req,res)=>{
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');

        if(!token) {
            return res.sendStatus(401)
        };

        const session = await db.collection('sessions').findOne({token: token });
        if (!session) {
            return res.sendStatus(401);
        };

        const user = await db.collection('users').findOne({_id: session.userId});
        if(user){
            const userMovements = await db.collection('movements').find().toArray();
            res.status(201).send(userMovements);
        } else{
            return res.sendStatus(401);
        }

    } catch (error) {
        console.error(error);
    }
})



const port = process.env.PORT || 5000;

server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});