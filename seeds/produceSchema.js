const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:String,
  price:Number,
  type:String,
  farm:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Farm'
  }
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product
