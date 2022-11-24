import express from 'express'
import dotenv from 'dotenv'; dotenv.config()
const { PORT } = process.env
import cors from 'cors'
import { connection } from './db/dbConecction.js';
const app = express()
import {vendorRouter}from './routes/vendors.routes.js'
import {saleRouter}from './routes/sales.routes.js'
import { clear } from './controllers/db.controllers.js';

connection()
    .then(()=>console.log('conectado a la db'))
    .catch(error => console.log(error))
app.use(cors())
app.use(express.json())
app.use(vendorRouter)
app.use(saleRouter)
app.get('/api/db/clear', clear)



app.listen(PORT, () => {
    console.clear();
    console.log('server on port', PORT);
})