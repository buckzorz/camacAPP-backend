var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify    = require('./verify');
var Orders = require('../models/order');
var Invoice = require('../models/invoice')
var Help = require('./helper');
var orderRouter = express.Router();


orderRouter.use(bodyParser.json());
orderRouter.route('/')
.get(function (req, res, next) {
    Orders.find(req.query)
        .select('orderdetails reference')
//        .populate('invoice')
        .exec(function (err, order){
        if (err) return next(err);
        res.json(order);
    });
})
.post(Help.RefGen, Help.reqTxt, function (req, res, next){
    Orders.create(req.body, function(err, order){
        if (err) return next(err);
        console.log('Created order!');
        var id = order._id;
        var ref = order.reference
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added order with id: ' + id + ' and ' + ref + ' reference!');
    })
})
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Orders.remove({}, function(err, resp){
        if (err) return err;
        res.json(resp);
    });
})
orderRouter.route('/:orderId')
.get(function (req, res, next) {
    console.log(req);
    console.log("asdasdsad");
    console.log(req.params.orderId);
    //CHANGE THIS WHEN DONE
    Orders.findById(req.params.orderId)
        .populate('invoice')
        .exec(function(err, order){
            if(err) return next(err);
            res.json(order);
    });
})
.put(Help.reqTxt, function (req, res, next) {
    var update = {};
    
    update.orderDetails = req.body.orderDetails ? req.body.orderDetails: undefined;
    update.client = req.body.client ? req.body.client: undefined;
    update.wheelspec = req.body.wheelspec ? req.body.wheelspec: undefined;
    
    //isn'n done yet
    Orders.findByIdAndUpdate(req.params.orderId,{$set: update},{new: true})
        .exec(function (err, order) {
            if(err) return next(err);
            console.log("Order has been updated successfuly and now looks like this: " + order.toJson);
            res.json(order)
        });
})
.delete(function (req, res, next) {
    Orders.findById(req.params.orderId)
        .exec(function (err, order) {
            if (err) return next(err);
            Invoice.findById(order.invoice).remove().exec();
            Orders.remove(req.params.orderId, function (err) {
                if (err) return next(err);
                });
        });
    Orders.count(req.params.orderId, function (err, count) {
        if (err) return next(err);
        
        if(count == 0){
            console.log('Removed order successfully');
        } else {
            console.log('There has been a problem!');
        }
    })
    
})

module.exports = orderRouter;