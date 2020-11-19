const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const app = express();
const port = 8000;

//Define schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var contact = mongoose.model('contact', contactSchema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    
    const params = {};
    res.status(200).render('home.pug', params);
})

app.get('/contact',(req,res)=>{
    
    const params = {};
    res.status(200).render('contact.pug', params);
})

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body)
    myData.save().then(()=>{
        res.send("This data has been saved to the Database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to the database")
    });
    //res.status(200).render('contact.pug', params);
})




app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});

