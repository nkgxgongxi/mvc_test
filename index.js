//js
const express = require('express');
const app = express();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

app.set('view engine', 'ejs');
app.use(express.json());

// Solve the security issue of sending API request through local browser
// Learning Notes: for a moment, the program stuck at not receiving the info from request, 
// Then I tried setting request header with a format
// Reference: https://stackoverflow.com/questions/52812561/nodejs-how-to-set-content-type-header-for-every-request
app.use(function(req, res, next) {
    req.headers['content-type'] = 'application/json';
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // For POST CORS Error
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    next();
});
//BodyParsing
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/login'));


app.post('/register', function(req, res){
    console.log(req.body);
    res.end();
  });

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started on port: " + PORT));