import joi from "joi";
import db from "../controllers/db/db.js";
/* \\ */

const valueSchema = joi.object({
    value: joi.number().precision(2).required(),
    description: joi.string().required(25)
})

export async function validaUsuarioValue(req, res, next) {
	const validation = valueSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}

export async function verificaToken (req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
      if (!token) {
      return res.sendStatus(401);
      }
  
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
  
      const user = await db.collection("users").findOne({ 
          _id: session.userId 
      });
      
      delete user.password;
  
      res.locals.user = user;
  
    next();
  }

  