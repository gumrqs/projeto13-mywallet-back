import express,{json} from "express";
import cors from "cors";

import { signIn, signUp } from "./controllers/authControllers.js";
import { home, input, output } from "./controllers/usersControllers.js";




const server = express();
server.use(cors());
server.use(json());




server.post('/sign-up',signUp);
server.post('/sign-in',signIn);
server.get('/home', home);
server.post('/input', input);
server.post('/Output', output);




const port = process.env.PORT || 5000;

server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});