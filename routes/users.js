const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport =require('passport')


// models 
const User = require('../models/User')

// login page
router.get('/login', (req, res, next) => {
    res.render('login')
})

// Register page
router.get('/register', (req, res, next) => {
    res.render('register')
})

// Register Handle
router.post('/Register',(req, res, next) => {
   const {name, email, password, password2} = req.body
   let errors = []

   //Check required fields 
   if (!name || !email || !password || !password2){
       errors.push({msg:"Please fill in all fields"})
   }
   //Check password match
   if(password !== password2){
       errors.push({msg: 'Password do not match'})
   }

   //Check password length
   if (password.length < 6){
       errors.push({msg:'Password should be at last 6 characters'})
   }

   if (errors.length > 0){
       res.render('register',{
           errors,
           name,
           email,
           password,
           password2
       })
   }else{
       User.findOne({email:email})
       .then(user =>{
           if (user){
               // User exists
               errors.push({msg:'Email is already registered'})
               res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            })
           }else {
            const newUser = new User ({
                name,
                email,
                password
            })
            // Hash Password
            bcrypt.genSalt(10, (err,salt)=>
             bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                // set password to hashed
                newUser.password = hash;
                // save user 
                newUser.save()
                .then(user => {
                    console.log(user)
                    req.flash('success_msg','You are now Registerd And you can Log in')
                    res.redirect('/users/login')
                })
                .catch(err => console.log(err))
            }))
           }
       })
   }
})


//Login Handle
router.post('/login',(req,res,next)=>{
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next)
})

// logout Handle
router.get('/logout',(req,res)=>{
    req.logout()
    req.flash('success_msg','You are Logged out')
    res.redirect('/users/login')
})



module.exports = router;