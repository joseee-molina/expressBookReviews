const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
for(user in users){
    if(username == user.username){
        return true;
    }
}
return false;
}

const authenticatedUser = (username,password, res)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.
    if(isValid(username)==false){
return res.status(404).json({message: "Username invalid"});    }

        for(user in users){
            if((username == user.username) && (password == user.password)){
                res.send("Authenticated!")
                let accessToken = jwt.sign({
                data: user
                }, 'access', { expiresIn: 60 * 60 });
                req.session.authorization = {
                    accessToken
                }
                return res.status(200).send("User successfully logged in");
            }

        }
    
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username = req.body.username
  let password = req.body.password

  return authenticatedUser(username, password, res);

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn
  let username = req.session.username;
  res.send(username)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
