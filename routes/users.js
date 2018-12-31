const express = require('express')
const router = express.Router()


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
       res.send('pass')
   }


})

module.exports = router;