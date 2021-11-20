const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3300


app.use(express.static('public'))

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

app.get('/',function(req,res){
    res.render('home')
});

app.get('/cart',function(req,res){
    res.render('cart')
});

app.get('/login',function(req,res){
    res.render('login')
})

app.get('/register',function(req,res){
    res.render('register')
})

app.listen(PORT , () =>{
    console.log(`Listening on port ${PORT}`);
})