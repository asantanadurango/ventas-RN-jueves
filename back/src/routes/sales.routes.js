import express from 'express';
const route = express.Router();
const saleRouter = express.Router();
import {register, searchById} from '../controllers/sales.controllers.js'

route.get('/:id', searchById);
route.post('/', register);

saleRouter.use('/api/sales', route)
export {
    saleRouter
};