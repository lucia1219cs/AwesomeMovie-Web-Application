var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Comments = require('../models/comments');
var Verify = require('./verify');

var commentRouter = express.Router();

commentRouter.use(bodyParser.json());

commentRouter.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
    Comments.find({}, function (err, comment) {
        if (err) next(err);
        res.json(comment);
    });
})

.post(function(req, res, next){
    Comments.create(req.body, function (err, comment) {
        if (err) next(err);
        console.log('Comment created!');
        var id = comment._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the comment with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Comments.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

commentRouter.route('/:commentId')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
    Comments.findById(req.params.commentId, function (err, comment) {
        if (err) next(err);
        res.json(comment);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Comments.findByIdAndRemove(req.params.commentId, function (err, resp) {
       if (err) next(err);
         res.json(resp);
    });
});

module.exports = commentRouter;
