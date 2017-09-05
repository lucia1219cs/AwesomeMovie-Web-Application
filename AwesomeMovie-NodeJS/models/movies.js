var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var movieSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    genres: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    reviews:[reviewSchema]
}, {
    timestamps: true
});

var Movies = mongoose.model('Movie', movieSchema);

module.exports = Movies;
