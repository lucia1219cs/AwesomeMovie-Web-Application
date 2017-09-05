var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Subscriptions = require('../models/subscriptions');
var Verify = require('./verify');

var subscriptionRouter = express.Router();

subscriptionRouter.use(bodyParser.json());

subscriptionRouter.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
    Subscriptions.find({}, function (err, subscription) {
        if (err) next(err);
        res.json(subscription);
    });
})

.post(function(req, res, next){
    Subscriptions.create(req.body, function (err, subscription) {
        if (err) next(err);
        console.log('Subscription created!');
        var id = subscription._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the subscription with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Subscriptions.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

subscriptionRouter.route('/:subscriptionId')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
    Subscriptions.findById(req.params.subscriptionId, function (err, subscription) {
        if (err) next(err);
        res.json(subscription);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Subscriptions.findByIdAndRemove(req.params.subscriptionId, function (err, resp) {
       if (err) next(err);
         res.json(resp);
    });
});

module.exports = subscriptionRouter;
