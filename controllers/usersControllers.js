import dayjs from 'dayjs';
import joi from "joi";
import db from "./db/db.js";

const valueSchema = joi.object({
    value: joi.number().precision(2).required(),
    description: joi.string().required(25)
})

export async function home(req,res){
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
            const userMovements = await db.collection('movements').find({userId:session.userId}).toArray();
    
            res.status(201).send(userMovements);
        } else{
            return res.sendStatus(401);
        }

    } catch (error) {
        console.error(error);
    }

}

export async function input(req,res){
    try {
        let day = dayjs().locale('pt-br');
        const user = req.body
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');

        if(!token) {
            return res.sendStatus(401)
        };

        const session = await db.collection('sessions').findOne({token: token });
        if (!session) {
            return res.sendStatus(401);
        };

        const RegisterUser = await db.collection('users').findOne({_id: session.userId});
        if(RegisterUser){
            const invalidValue = valueSchema.validate(user).error;

            if(invalidValue){
        
                return res.status(422).send('Formato inválido')
            }

            const response = await db.collection('movements').insertOne({
                value: user.value,
                description: user.description,
                userId: session.userId,
                date: day.format('DD/MM'),
                entry: 'positive'
            });
            console.log(response, "**********************")
            return res.status(200).send(response)
        }
        
        


    } catch (error) {
        console.error(error);
    }

}

export async function output (req,res){
    try {
        let day = dayjs().locale('pt-br');
        const user = req.body
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');

        if(!token) {
            return res.sendStatus(401)
        };

        const session = await db.collection('sessions').findOne({token: token });
        if (!session) {
            return res.sendStatus(401);
        };

        const RegisterUser = await db.collection('users').findOne({_id: session.userId});
        if(RegisterUser){
            const invalidValue = valueSchema.validate(user).error;

            if(invalidValue){
        
                return res.status(422).send('Formato inválido')
            }

            const response = await db.collection('movements').insertOne({
                value: user.value,
                description: user.description,
                userId: session.userId,
                date: day.format('DD/MM'),
                entry: 'negative'
            });
            console.log(response, "**********************")
            return res.status(200).send(response)
        }
        
        


    } catch (error) {
        console.error(error);
    }
}
