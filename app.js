const express =require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const passport =require('passport')

require('./config/passport')(passport)
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

// exppress Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connecct flash
app.use(flash())

//Global vars 
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//  Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))


module.exports = app;
