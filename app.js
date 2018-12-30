const express =require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const app = express()


// DB Config
const {MongoURL} = require('./config/keys')

// Connect to Mongo
mongoose.connect(MongoURL, {useNewUrlParser: true})
    .then(result => console.log('Database is Ready For You *_*'))
    .catch(err => console.log(err))


// EJS / View
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({extended:false}))

//  Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))














module.exports = app;
