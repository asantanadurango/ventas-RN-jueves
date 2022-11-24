import { response } from 'express';
import { VendorModel, SaleModel } from '../models/models.js';

export const clear = async (_, res) => {
    const vendorsDeleted = await VendorModel.deleteMany({})
    vendorsDeleted.message = 'vendors deleted'
    
    const salesDeleted = await SaleModel.deleteMany({})
    salesDeleted.message = 'sales deleted'

    return res.json({vendors:vendorsDeleted, sales:salesDeleted})
    
}