import joi from "joi";
/* \\ */

const participantsSchema = joi.object({ 
    name: joi.string().required(),
    password: joi.required(),
    email: joi.string().email({ minDomainSegments: 2, tlds:{allow: ['com','net'] }}).required()
})
const participantsLoginSchema = joi.object({ 
    
    password: joi.required(),
    email: joi.string().email({ minDomainSegments: 2, tlds:{allow: ['com','net'] }}).required()
})


export async function validaUsuario(req, res, next) {
	const validation = participantsSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
export async function validaUsuarioLogin(req, res, next) {
	const validation = participantsLoginSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
