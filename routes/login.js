var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('logIn', {
        member: null
    });
});


router.post('/', function(req, res, next) {
    Member.check(req.body.account, function(err, member) {
        var myaccount = req.body.account;
        var mypassword = req.body.password;
        Member.getbyaccount(myaccount, function(err, member) {
          if(err || mypassword != member.password) {
            res.render('login',{
             member : null
          });
        } else {
            req.session.member = member;
            res.redirect('/');
            return;
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.member = null;
    res.redirect('/');
    return;
});


module.exports = router;
