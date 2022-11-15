import express from 'express';
const route = express.Router();
const vendorRouter = express.Router();
import {register, searchById, salesByVendorId} from '../controllers/vendors.controllers.js'

route.get('/:id', searchById);
route.post('/', register);

vendorRouter.use('/api/vendors', route)
export {
    vendorRouter
};