var express = require('express');
var bodyParser = require('body-parser');

exports.RefGen = function(req, res, next){
    var text = "";
    var possible = "0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    req.body.reference = text;
    next();
};

exports.reqTxt = function(req, res, next) {
    console.log(req.body);
    console.log(req.query);
    next();
}

