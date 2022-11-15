import { VendorModel} from '../models/models.js'
export const register = async (req, res) => {
    
    const {
        name,
        email,
        total
    } = req.body

    try {
        const vendor = await VendorModel({ name, email, total }).save()
        return res.json({res:vendor}) 
    } catch (error) {
        return res.json({error})
    }
};

export const searchById = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const vendor = await VendorModel.findById(id)
        return res.json({res:vendor})
    } catch (error) {
        return res.json({error})
    }
};

export const salesByVendorId = async (req, res) => {

  
};
// const { id, name } = req.params
// console.log(id);

// const paths = await VendorModel.find().getPopulatedPaths()
// console.log(paths);

// const vendor = await VendorModel.findOne({ name }).populate('vendor_id')
// console.log(vendor);

// const boo = await new VendorModel({}).populated('vendor_id')
// console.log(boo);


// res.json({res:'Ñeeeee'})


// try {
//     const vendorSales = await VendorModel.findById(id).populate('vendor_id').exec()
//     return res.json({res:vendorSales})
// } catch (error) {
//     return res.json({error})
// }