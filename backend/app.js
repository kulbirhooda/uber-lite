import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import env from './env.js'
import authRouters from "./http/Routes/auth.js"
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:env.CORS_ORIGIN
}))
app.use('/api/auth',authRouters);

const server = http.createServer(app);

server.listen(env.PORT, () => {
    console.log(`http://localhost:${env.PORT}`);
});

