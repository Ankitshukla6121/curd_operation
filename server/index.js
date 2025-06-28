 const express = require('express');
 const mongoose = require('mongoose')
 const bodyparser= require('body-parser')
 const cors= require('cors')

 const app= express();

 app.use(cors());
 app.use(bodyparser.json());

 mongoose.connect('mongodb+srv://curd:curd@cluster0.3msnruz.mongodb.net/').then(()=>{
    console.log("mongodb connected")
 }).catch(err=> console.log(err))

 const ItemSchema = new mongoose.Schema({
    name:String,
    description:String,
 });

 const Item = mongoose.model('Item',ItemSchema);


// curd operation 
app.get('/',(req,res)=>{
    res.send('welcome');
})

// add the item

app.post('/item',async(req,res)=>{
    const newItem= new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
})

// get the items

app.get('/items',async(req,res)=>{
    const items= await Item.find();
    res.json(items);

})

//  updates the data


app.put('/item/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// delete

app.delete('/item/:id',async(req,res)=>{

    await Item.findByIdAndDelete(req.params.id);
    res.json("delted");
})

 app.listen(8080,()=>{
    console.log(`server is the running on the port ${8080}`);
 })