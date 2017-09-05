var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favorRouter = express.Router();

favorRouter.use(bodyParser.json());

favorRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    var userId = req.decoded._id;
    Favorites.findOne({'postedBy': userId})
        .populate('movies')
        .populate('postedBy')
        .exec(function (err, favorites) {
            if (err) next(err);
            res.json(favorites);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    var userId = req.decoded._id;
    Favorites.findOne({'postedBy' : userId}, function (err, favorite) {
        if (err) next(err);
        if(favorite != null) {
            var movieId = req.body._id;
            if (favorite.movies.indexOf(movieId) == -1) {
                favorite.movies.push(req.body._id);
            }
            favorite.save(function(err, favorite) {
                if (err) next(err);
                console.log('Updated Favorites');
                res.json(favorite);
            });
        }
        else {
            Favorites.create({postedBy: userId}, function (err, favor) {
                if (err) next(err);
                console.log('Favorite created!');
                favor.movies.push(req.body._id);
                favor.save(function (err, favor) {
                    if (err) next(err);
                    res.json(favor);
                });
            });
        }
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    var userId = req.decoded._id;
    Favorites.remove({'postedBy': userId}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});


favorRouter.route('/:movieId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    var userId = req.decoded._id;
    Favorites.findOneAndUpdate({'postedBy': userId}, {$pull: {movies: req.params.movieId}}, function (err, favorite) {
        if (err) next(err);
        Favorites.findOne({'postedBy': userId}, function(err, favorite){
            res.json(favorite);
        });
    });
});

module.exports = favorRouter;
