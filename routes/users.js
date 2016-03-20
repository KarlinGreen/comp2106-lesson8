var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Account = require('../models/account');
var passport = require('passport');

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {

/* Use the account to find our users */
  Account.find(function(err, accounts){


// if there is an error, log it in the console.
    if (err){
      console.log(err);
      res.end(err);
    }
//Otherwise, proceed to the page.
    else{
      res.render('users', {
        title: 'Users',
        users: accounts
         });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next;
    }
    else{
        res.redirect('/auth/login');
    }
}

module.exports = router;
