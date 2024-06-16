const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    let newUser = {"username":req.query.username,"password":req.query.password}
    let filtered_users = users.filter((user) => user.username == newUser.username);
    if (filtered_users.length > 0) {
        res.send("Username already used");
        return;
    }
    else{
        users.push(newUser);
    }

    res.send("The user" + (' ')+ (req.query.username) + " Has been added!")
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        res.send(books)
      resolve("Promise 1 resolved")
    },0)})

    myPromise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })
    
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        res.send(books[isbn])
      resolve("Promise 1 resolved")
    },0)})

    myPromise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let authors = {};
  let author = req.params.author;
  for(var i in books){
    
    if (author == books[i].author.split(' ').join('_')){
        authors[i] = books[i]
    }
  }
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        res.send(authors)
        resolve("Promise 1 resolved")
    },0)})

    myPromise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })
  
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let titles = {};
    let title = req.params.title;
    for(var i in books){
      
      if (title == books[i].title.split(' ').join('_')){
          titles[i] = books[i]
      }
    }
    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
            res.send(titles)
            resolve("Promise 1 resolved")
        },0)})
    
        myPromise1.then((successMessage) => {
            console.log("From Callback " + successMessage)
          })
  
    return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let bookRev = books[isbn].reviews
    res.send(bookRev)
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
