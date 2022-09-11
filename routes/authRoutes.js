import { signIn, signUp } from "../controllers/authControllers.js"
import { Router } from "express";
import {validaUsuario, validaUsuarioLogin} from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/sign-up',validaUsuario, signUp);
authRouter.post('/sign-in',validaUsuarioLogin, signIn);

export default authRouter;