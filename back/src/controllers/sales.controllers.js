import { SaleModel, VendorModel } from '../models/models.js'
export const register = async (req, res) => {
    
    console.log(req.body);
    const {
        id,
        zone,
        total
    } = req.body

   try {
    //    const sale = new SaleModel({ vendor:id, zone, total })
        const savedSale = await SaleModel({ vendor: id, zone, total }).save()
    
        const savedSaleParsed = await SaleModel.findById(savedSale._id).select({ vendor: id, zone, total }).lean()

        const vendor = await VendorModel.findById(id)
        vendor.sales.push(savedSale)
        vendor.save()

       return res.json({...savedSaleParsed, message:'Venta guardada con exito!'})
   } catch (error) {
       console.log(error);
       return res.json({ error: error })
   }

};

export const searchById = async (req, res) => {
    res.json({sale:'sale by id'})
};

export const salesByVendor = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const vendorFound = await VendorModel.findById(id);
        if (!vendorFound) return res.json({ error: true, message: 'Este usuario no esta registrado en la DB' });
        const salesByVendor = await VendorModel.findById(id).select({'name':1, '_id':0}).populate('sales')
        return res.json(salesByVendor);
    } catch(error) {
        return res.json({error, message:'Algo ha ido mal'})
    }
}