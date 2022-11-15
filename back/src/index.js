import express from 'express'
import dotenv from 'dotenv'; dotenv.config()
const { PORT } = process.env
import cors from 'cors'
import { connection } from './db/dbConecction.js';
const app = express()
import {vendorRouter}from './routes/vendors.routes.js'
import {saleRouter}from './routes/sales.routes.js'

connection()
    .then(()=>console.log('conectado a la db'))
    .catch(err => console.log(err))
app.use(cors())
app.use(express.json())
app.use(vendorRouter)
app.use(saleRouter)



app.listen(PORT, () => {
    console.clear();
    console.log('server on port', PORT);
})