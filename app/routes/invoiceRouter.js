var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify    = require('./verify');
var Orders = require('../models/order');
var Invoice = require('../models/invoice');
var Help = require('./helper');
var invoiceRouter = express.Router();

var createInvoice = function (err, invoice, next, res) {
        if(err) return next(err);
//        Orders.findById(invoice.order, function (err, order) {
//            console.log(order);
//                if(err) return next(err);
//                order.invoice = invoice._id;
//                console.log(order);
//                order.save(function (err, updatedOrder) {
//                    if(err) return next(err);
//                    console.log('updated order with invoice id:' + updatedOrder.invoice);
//                });
//        });
        Orders.update({_id: invoice.order},
        {invoice: invoice._id}, function  (err, affected, resp) {
            if(err) return next(err);
            console.log(affected);
            console.log(resp);
        });
//        res.writeHead(200, {
//            'Content-Type': 'text/plain'
//        });
//        var id = invoice._id
//        res.end('Added invoice with id: ' + id);     
    };


invoiceRouter.use(bodyParser.json());
invoiceRouter.route('/')
.get(function(req, res, next) {
    Invoice.find(req.query)
    .exec(function (err, invoice) {
        if (err) return next(err);
        res.json(invoice);
    });
})
.post(Help.reqTxt, function(req, res, next){
    Invoice.create(req.body, function(err, invoice){
        createInvoice(err, invoice, next, res);    
    });
})
.put(Help.reqTxt, function (req, res, next) {   
    Invoice.findById(req.body._id, function(err, invoice){
        if(err) return next(err);
        console.log('-----------------------------------');
        console.log(req.body.contents.length);
        var diff = req.body.contents.length - invoice.contents.length;
        for(var i = req.body.contents.length - diff - 1; i < req.body.contents.length; i++){
          invoice.contents.push(req.body.contents[i]); 
        };
        invoice.save(function(err, newInvoice){
           if (err) return next(err);
           console.log("Added " + ((req.body.contents.length) - (req.body.contents.length - diff - 1))+ " new fields to the invoice " + newInvoice._id);
        });
//        console.log( "INVOICE CONTENTS" + invoice.contents);
//        invoice.save(function (err, newInvoice) {
//            if(err) return next(err)
//            console.log('Updated invocie content!')
//            console.log('New invoice content: ' + newInvoice.contents);
//        })
        
    })
})
.delete(function(req, res, next){
    Invoice.remove({}, function(err, resp){
        if (err) return err;
        res.json(resp);
    });
})

module.exports = invoiceRouter;