import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import db from "./db/db.js";

export async function signUp(req,res){
    
    try {
        const user = req.body;
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
}

export async function signIn(req,res){
    
    try {
        const loginUser = req.body;

        const user = await db.collection('users').findOne({email: loginUser.email})

        const passwordValid = bcrypt.compareSync(loginUser.password, user.password);
        console.log(user, '****************')
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

}


