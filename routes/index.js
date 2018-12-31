const express =require('express')
const router = express.Router()

// confing auth
const{ ensureAuthenticated } = require('../config/auth') 


// welcome page
router.get('/', (req,res,next)=>{
    res.render('Welcome')
})
// dasheboard
router.get('/dashboard', ensureAuthenticated,(req,res,next)=>{
    res.render('dashboard', {
        name: req.user.name
    })
})


module.exports = router;