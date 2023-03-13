const mongoose = require("mongoose");
const Farm = require('./farmSchema')
mongoose.connect('mongodb://localhost:27017/MyFarms',{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>{
    console.log("Mongoose Server Conncetion Esatblished")
  })
  .catch((e)=>{
    console.log("Mongoose Server Connection Lost");
    console.log(e);
  })
const addFarm = [
  {
    name:"Rose Berry Farms",
    contactNumber:8073127597,
    email:"roseBerry@gmail.com"
  },
  {
    name:"Neel Mount Farms",
    contactNumber:7760777551,
    email:"neelMountFarm@gmail.com"
  }
]
Farm.inserMany(addFarm)
  .then((data)=>{
    console.log(data);
  })
  .catch((e)=>{
    console.log("ERROR !!");
    console.log(e);
  })
