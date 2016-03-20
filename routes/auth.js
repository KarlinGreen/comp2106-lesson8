var express = require('express');
var router = express.Router();

// add authentication packages
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');
var gitHub = require('passport-github2');
var config

// GET register - show registration form
router.get('/register', function(req, res, next) {
   res.render('auth/register', {
    title: 'Register'
   });
});

// POST register
router.post('/register', function(req, res, next){
 
Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
      if (err) {
         res.render('auth/register', {title: 'Register'});
      }
      else {
         req.login(account, function(err) {
            res.redirect('/articles');
         });
      }
   });
});

// GET login - show login form
router.get('/login', function(req, res, next) {
    
    // store sess Messagess in a local variable, and clear them when page reloads
    var Messages = req.session.Messages || [];
    req.session.Messages = [];
    
    res.render('auth/login', {
        title: 'Login',
        user: req.user,
        Messages: Messages
    });
});

// POST login

router.post('/login', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/auth/login',
   failureMessage: 'Invalid Login'
}));

// make this public
module.exports = router;
