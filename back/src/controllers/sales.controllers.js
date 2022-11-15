import { SaleModel, VendorModel } from '../models/models.js'
import mongoose from 'mongoose';
export const register = async (req, res) => {
    
    // console.log(req.body);
    const {
        id_vendedor:vendor,
        zone,
        total
    } = req.body

    
   try {
       const sale = new SaleModel({ vendor, zone, total })
       const savedSale = await sale.save()
       console.log('savedSale');
       console.log(savedSale);

       const vendorSales = await Array.from(VendorModel.findById(vendor).select({ 'sales': 1, '_id': 0 }))

       const newSales = vendorSales.concat(savedSale)
       
       const updatedVendor = await VendorModel.findOneAndUpdate({ '_id': vendor }, { sales: newSales }, { new: true });
       
    //    return new VendorModel({ '_id': vendor }, { sales: newSales }, (err, v) => {
    //        if (err) return res.json({ err: err })
    //        return res.json({res:v})
    //    })
       
    //    console.log(updatedVendor);
    //    res.json({ res: updatedVendor })
       
   } catch (error) {
       console.log(error);
       return res.json({ error: error })
   }

};

export const searchById = async (req, res) => {
    res.json({sale:'sale by id'})
};