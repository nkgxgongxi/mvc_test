//js
const express = require('express');
const app = express();
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

app.set('view engine', 'ejs');
app.use(express.json());

// Learning Notes: for a moment, the program stuck at not receiving the info from request, 
// Then I tried setting request header with a format
// Reference: https://stackoverflow.com/questions/52812561/nodejs-how-to-set-content-type-header-for-every-request
// Later Notes: It seems like this snippet of codes cause a conflict for server to receive POST request body, 
// therefore comment out.
// app.use(function(req, res, next) {
//     req.headers['content-type'] = 'application/json';
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // For POST CORS Error
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
//     next();
// });

//BodyParsing
app.use(express.urlencoded({extended: false}));
// Didn't understand how use Session worked
app.use(session({
  secret:'oneboy',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/login'));

// console.log("right before trying to post.")
// app.post('/register', function(req, res){
//     console.log(req.body);
//     res.end();
//   });

//   app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started on port: " + PORT));