const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session =  require('express-session');
const {v4:uuidv4} = require('uuid');

const router = require('./router');

const PORT = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.use(express.static('./public'));

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);

app.get('/',(req,res) =>{
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.render('index', { title: 'Login System' });
    }
});


app.listen(PORT,() =>{
    console.log(`Server started at ${PORT}`);
});

