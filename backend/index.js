//--Server JS--
const express = require('express');
const path = require('path'); 
const cors = require('cors')  
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path: 'backend/.env'});
const cookieParser = require('cookie-parser')
const MongoDbStore = require('connect-mongo')
var bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('express-flash')

const app = express();

const PORT = process.env.PORT || 3000;
mongoose.set('strictQuery', true);
const connection = mongoose.connect(process.env.Mongoose_connect,{useNewUrlParser: true, useUnifiedTopology: true}).then((response)=>{
    console.log('MongoDb connected');
});

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
});

app.use(cors({
    credentials: true,
    origin: true,
    
})) ;

app.use(flash())

//session create in mongodb 
app.use(session({
    secret: process.env.SECRET_key,
    resave: false, 
    
    
    store: MongoDbStore.create({
        mongoUrl: process.env.Mongoose_connect
    }),
    saveUninitialized: false, //here it will not initialize unless anything is passed inside session
    cookie: {maxAge: 1000*60*60*6} //6 hour

}))


//app middlewares
//used to handle cross-site request on 2 locals
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'/public')))

//required api.js file and passed app to there
require('./routes/api')(app)
