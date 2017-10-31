var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');
var Help = require('./helper');


router.get('/', function(req, res, next) {
    User.find(function (err, user){
        if (err) throw err;
        res.json(user);
    });
});


router.post('/register', Help.reqTxt, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body.username + req.body.password);
    User.register(new User({ username : req.body.username}),
         req.body.password, function(err, user){
            if (err) {
                return res.status(500).json({err: err});
            }
            if(req.body.name) {
                user.firstname = req.body.firtstname;
            }
            if(req.body.email) {
                user.email = req.body.email;
            }
            if(req.body.phone) {
                user.phone = req.body.phone;
            }
        user.save(function(err, user) {
            passport.authenticate('local')(req, res, function (){
                return res.status(200).json({status: 'Registration successful!',
                                            user: user});
            });
        });
    });
});


router.post('/login',  function(req,res,next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Wasnt able to login'
                });
            }
            
            var token = Verify.getToken({"username": user.username, "_id":user._id, "admin":user.admin});
            res.status(200).json({
                status: 'Login successful',
                success: true,
                token: token,
                mechanic: user.mechanic
            });
        });
    })(req,res,next);
});

router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({
        status: 'gg wp'
    });
});

module.exports = router;
