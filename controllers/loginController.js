//js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res) => {
    res.render("register", {});
};

//Post Request for Register
const registerUser = async (req, res) => {
    const {name, email, location, password, confirm} = req.body;
    if (!name || !email || !password || !confirm) {
        console.log("Please fill empty fields.");
    }

    if (password !== confirm) {
        console.log("Password must match.");
    }
    else {
        //await in this line is necessary, otherwise, the condition checking starts even before the sql query returns the result
        let findUserFlag = await User.findOne(email);
        console.log(findUserFlag);
        if (findUserFlag === true) {
            console.log("Email exsits.");
            res.render("register", {
                name,
                email,
                password,
                confirm,
            });
        } 
        else {
            //Validation
            //Learning notes: Pay attention to constructor definition, 
            // and {name, email, password, location} is different from four variables as name, email, password, location
            const newUser = new User(
                name,
                email,
                password,
                location,
            );
            //Password Hashing
            bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(res.redirect("/login"))
                        .catch((err) => console.log(err));
                })
            );
        }
    }
};

const loginView = (req, res) => {
    res.render("login", {});
};

module.exports = {
    registerView,
    registerUser,
    loginView
};