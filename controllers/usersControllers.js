import dayjs from 'dayjs';
import db from "./db/db.js";

export async function home(req,res){
    try {
        const user = res.locals.user;
        if(user){
            console.log(res, "meu pai socorro")
            const userMovements = await db.collection('movements').find({userId:user._id}).toArray();
    
            return res.status(200).send(userMovements);
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
        const user = res.locals.user;
        if(user){

            const movement = req.body;

            const response = await db.collection('movements').insertOne({
                value: movement.value,
                description: movement.description,
                userId: user._id,
                date: day.format('DD/MM'),
                entry: 'positive'
            });
            return res.status(200).send(response)
        }
    } catch (error) {
        console.error(error);
    }

}

export async function output (req,res){
    try {
        let day = dayjs().locale('pt-br');
       
        const user = res.locals.user;
        if(user){
            const movement = req.body
            const response = await db.collection('movements').insertOne({
                value: movement.value,
                description: movement.description,
                userId: user._id,
                date: day.format('DD/MM'),
                entry: 'negative'
            });
            
            return res.status(200).send('ok')
        }

    } catch (error) {
        console.error(error);
    }
}
