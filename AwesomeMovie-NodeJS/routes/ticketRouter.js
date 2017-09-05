var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Tickets = require('../models/tickets');
var Verify = require('./verify');

var ticketRouter = express.Router();

ticketRouter.use(bodyParser.json());

ticketRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    var userId = req.decoded._id;
    Tickets.find({'postedBy': userId})
        .populate('movie')
        .populate('postedBy')
        .exec(function (err, tickets) {
            if (err) next(err);
            res.json(tickets);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    req.body.postedBy = req.decoded._id;
    Tickets.create(req.body, function (err, ticket) {
        if (err) next(err);
        console.log('Ticket created!');
        ticket.save(function (err, ticket) {
            if (err) next(err);
            res.json(ticket);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    var userId = req.decoded._id;
    Tickets.remove({'postedBy': userId}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

ticketRouter.route('/:ticketId')

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Tickets.findById(req.params.ticketId, function (err, ticket) {
       if (err) next(err);
       if (ticket.postedBy != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
       }
    });
    Tickets.findByIdAndRemove(req.params.ticketId, function (err, resp) {
       if (err) next(err);
       res.json(resp);
    });
});

module.exports = ticketRouter;
