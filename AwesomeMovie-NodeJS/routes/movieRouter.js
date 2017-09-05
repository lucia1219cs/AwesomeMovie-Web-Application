var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Movies = require('../models/movies');
var Verify = require('./verify');

var movieRouter = express.Router();

movieRouter.use(bodyParser.json());

movieRouter.route('/')

.get(function(req,res,next){
    Movies.find(req.query)
        .populate('reviews.postedBy')
        .exec(function (err, movie) {
        if (err) throw next(err);
        res.json(movie);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Movies.create(req.body, function (err, movie) {
        if (err) next(err);
        console.log('Movie created!');
        var id = movie._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the movie with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Movies.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

movieRouter.route('/:movieId')

.get(function(req,res,next){
    Movies.findById(req.params.movieId)
        .populate('reviews.postedBy')
        .exec(function (err, movie) {
        if (err) next(err);
        res.json(movie);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Movies.findByIdAndUpdate(req.params.movieId, {
        $set: req.body
    }, {
        new: true
    }, function (err, movie) {
        if (err) next(err);
        res.json(movie);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Movies.findByIdAndRemove(req.params.movieId, function (err, resp) {        
        if (err) next(err);
          res.json(resp);
    });
});

movieRouter.route('/:movieId/reviews')
.get(function (req, res, next) {
    Movies.findById(req.params.movieId)
        .populate('reviews.postedBy')
        .exec(function (err, movie) {
        if (err) next(err);
        res.json(movie.reviews);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Movies.findById(req.params.movieId, function (err, movie) {
        if (err) next(err);
        req.body.postedBy = req.decoded._id;
        movie.reviews.push(req.body);
        movie.save(function (err, movie) {
            if (err) next(err);
            console.log('Updated Reviews!');
            res.json(movie);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Movies.findById(req.params.movieId, function (err, movie) {
        if (err) next(err);
        for (var i = (movie.reviews.length - 1); i >= 0; i--) {
            movie.reviews.id(movie.reviews[i]._id).remove();
        }
        movie.save(function (err, result) {
            if (err) next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all reviews!');
        });
    });
});

movieRouter.route('/:movieId/reviews/:reviewId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Movies.findById(req.params.movieId)
        .populate('reviews.postedBy')
        .exec(function (err, movie) {
        if (err) next(err);
        res.json(movie.reviews.id(req.params.reviewId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    Movies.findById(req.params.movieId, function (err, movie) {
        if (err) next(err);
        movie.reviews.id(req.params.reviewId).remove();
        req.body.postedBy = req.decoded._id;
        movie.reviews.push(req.body);
        movie.save(function (err, movie) {
            if (err) next(err);
            console.log('Updated Reviews!');
            res.json(movie);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Movies.findById(req.params.movieId, function (err, movie) {

        if (movie.reviews.id(req.params.movieId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }

        movie.reviews.id(req.params.reviewId).remove();
        movie.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});

module.exports = movieRouter;
