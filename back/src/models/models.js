import mongoose from 'mongoose';
const { Schema } = mongoose;

const saleSchema = new Schema({
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    zone: String,
    total: Number
}, {
    versionKey: false,
    timestamps:true
});
export const SaleModel = mongoose.model('Sale', saleSchema);


const vendorSchema = new Schema({
    name: String,
    email:String,
    total: Number,
    sales: [{
        type: Schema.Types.ObjectId,
        ref: 'Sale',
        unique:false
    }]
}, {
    versionKey: false,
    timestamps: true,
    
});
export const VendorModel = mongoose.model('Vendor', vendorSchema)