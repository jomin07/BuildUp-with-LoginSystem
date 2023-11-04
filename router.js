const express = require('express');
const router  = express.Router();

const credentials = {
    email : 'jomin@gmail.com',
    password : '123'
}

//login user
router.post('/login',(req,res) =>{
    if(req.body.email === credentials.email && req.body.password === credentials.password){
        req.session.user = req.body.email;
        res.redirect('dashboard');
    }
    else{
        res.render('index',{title:'express',error:'Invalid Username'});
    }
});

//Route for dashboard
router.get('/dashboard',(req,res) =>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
    }
    else{
        res.send('Unauthorized User');
    }
});

//Route for Logout
router.get('/logout',(req,res) =>{
    req.session.destroy((err) =>{
        if(err){
            res.send(err);
        }
        else{
            res.render('index',{title:'express',logout:'logout successfull..!'});
        }
    });
});

module.exports = router;