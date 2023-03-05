//js
const express = require('express');
const app = express();


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Solve the security issue of sending API request through local browser
app.use(function(req, res, next) {
    req.headers['content-type'] = 'application/json';
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // For POST CORS Error
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    next();
});

//Routes
app.use('/', require('./routes/login'));


app.post('/register', function(req, res){
    console.log(req.body);
    res.end();
  });

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started on port: " + PORT));