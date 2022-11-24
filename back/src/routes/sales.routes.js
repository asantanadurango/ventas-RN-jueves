import express from 'express';
const route = express.Router();
const saleRouter = express.Router();
import {register, searchById, salesByVendor} from '../controllers/sales.controllers.js'

// route.get('/:id', searchById);
route.get('/:id', salesByVendor);
route.post('/', register);


saleRouter.use('/api/sales', route)
export {
    saleRouter
};