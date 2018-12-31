module.exports={
    ensureAuthenticated: (req,res,next) => {
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'Log in Baby @_@')
        res.redirect('/users/login')
    }
}
