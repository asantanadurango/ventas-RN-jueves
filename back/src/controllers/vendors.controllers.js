import { VendorModel} from '../models/models.js'
export const register = async (req, res) => {
    
    const {
        name,
        email,
        total
    } = req.body

    try {
        const registeredUser = await VendorModel.findOne({ email }).lean()
        if (registeredUser) return res.json({ error:true, message: 'Este usuario ya se encuentra registrado en la DB' })
        
        await VendorModel({ name, email, total }).save()
        const vendor = await VendorModel.exists({ email })
        vendor.message = 'Usuario creado con exito!'
        return res.json(vendor) 
    } catch (error) {
        return res.json({error})
    }
};

export const searchById = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const vendorFound = await VendorModel.findById(id)
        if(!vendorFound) return res.json({error:true, message:'Este usuario no esta registrado en la DB'})
        
        const vendor = await VendorModel.findById(id)
            .select({ email: 1, name: 1, _id: 0 }).lean()
        return res.json({...vendor, message:'Usuario encontrado'})
    } catch (err) {
        return res.json({...err, error:true, message:'Este usuario no esta registrado en la DB'})
    }
};

export const vendorSales = async (req, res) => {
    const {id} = req.params
    const vendorSales = await VendorModel.findById(id).select({ '_id': 0 }).lean()
    res.json(vendorSales)
};