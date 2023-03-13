const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const farmSchema = new mongoose.Schema({
  name:String,
  contactNumber:Number,
  email:String,
  product:{
    type:[ mongoose.Schema.Types.ObjectId ],
    ref:'Product'
  }
})
const Farm = mongoose.model('Farm',farmSchema);
module.exports = Farm
