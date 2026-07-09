import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import env from './env'
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
