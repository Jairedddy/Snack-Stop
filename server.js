require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)


const url = 'mongodb://localhost/snackstop';
mongoose.connect(url,{ useNewUrlParser:true , useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open' , () => {
    console.log('Database connected......');
}).on('error',(err)=>{
    console.log(err);
});

let mongoStore = new MongoDbStore({
        mongooseConnection: connection,
        collection: 'sessions'
        })

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge : 1000 * 60 * 60 *24}
}))

app.use(flash())

app.use(express.static('public'))
app.use(express.json())

app.use((req,res,next) => {
    res.locals.session = req.session
    next()
})


app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')



require('./routes/web')(app)


app.listen(PORT , () =>{
    console.log(`Listening on port ${PORT}`);
})