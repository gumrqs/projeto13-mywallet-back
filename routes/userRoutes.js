
import { Router } from "express";
import { home, input, output } from "../controllers/usersControllers.js";
import { validaUsuarioValue, verificaToken } from "../middlewares/user.middleware.js";
 

const userRoutes = Router();

userRoutes.get('/home',verificaToken, home);
userRoutes.post('/input', verificaToken, validaUsuarioValue , input);
userRoutes.post('/Output', verificaToken, validaUsuarioValue,  output);


export default userRoutes;
/* \\ */