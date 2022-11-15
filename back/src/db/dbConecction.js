import mongoose from 'mongoose';

const password = ''
const dbName = 'ventas'
const uri =`mongodb://localhost:27017/${dbName}`



const connection =_=> mongoose.connect(uri);

export {
    connection
}