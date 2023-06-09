const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Farm = require('./farmSchema');
const Product = require('./seeds/produceSchema')
const path = require('path');
const flash =  require('connect-flash');
const session = require('express-session');
const sessionOption = {secret:'ThisIsNotaGoodSEcret',resave:false,saveUninitialized:false}


// const atlasUrl = "mongodb+srv://fayazkudremane3000:yepAXXvmr0KDbRAL@cluster0.rmjzaoy.mongodb.net/?retryWrites=true&w=majority";
const atlasUrl = "mongodb+srv://fayazkudremane3000:MBcjcRpc49Ktm214@cluster0.skgcv6i.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(atlasUrl,{ useNewUrlParser: true , useUnifiedTopology: true })
  .then(()=>{
    console.log("Mongoose Server Conncetion Esatblished")
  })
  .catch((e)=>{
    console.log("Mongoose Server Connection Lost");
    console.log(e)
  })


app.use(express.urlencoded({ extended:true }));
app.use(session(sessionOption));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.message = req.flash('success');
  next();
})
app.set('views',path.join(__dirname,'templates'));
app.set('view engine','ejs')

app.get('/farms',async (req,res)=>{
  const farms = await Farm.find();
  res.render('home',{ farms });
})
app.get('/farms/new',(req,res)=>{
  res.render('new');
})

app.get('/farms/:id',async (req,res)=>{
  const id = req.params.id;
  const farm = await Farm.findById(id).populate('product');
  //console.log(farm)
  res.render('show', {farm})
})

app.get('/farms/:id/addNewProduct',async (req,res)=>{
  const id = req.params.id;
  const farm = await Farm.findById(id);
  res.render('addProduct',{ farm })
})

app.post('/farms/:id',async (req,res)=>{
  const product = new Product;
  const farm = await Farm.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.type = req.body.type;
  farm.product.push(product)
  product.farm = farm;
  await product.save();
  await farm.save();
  res.redirect(`/farms/${req.params.id}`);
})
app.post('/farms',async (req,res)=>{
  const farm = new Farm;
  farm.name = req.body.name;
  farm.contactNumber = req.body.contactNumber;
  farm.email = req.body.email;
  //console.log(farm);
  req.flash('success','Farm created successfully !');
  await farm.save();
  res.redirect('/farms')
})

      // Products Routes ........

app.get('/products',async (req,res)=>{
  const fruits = await Product.find({type:{$eq:'Fruit'}}).populate('farm');
  const vege = await Product.find({type:{$eq:'Vegetables'}}).populate('farm');
  res.render('productIndex',{ fruits,vege  })
})
app.get('/products/:id',async(req,res)=>{
  const id = req.params.id;
  const product = await Product.findById(id).populate('farm');
  // console.log(product)
  res.render('productShow',{ product })
})
app.listen(3000, ()=>{
  console.log("listening to the PORT 3000");
})
