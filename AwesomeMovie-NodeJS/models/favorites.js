var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favorSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorite', favorSchema);

module.exports = Favorites;
