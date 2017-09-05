var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    },
    number:  {
        type: Number,
        required: true
    },
    date:  {
        type: Date,
        required: true
    },
    time:  {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

var Tickets = mongoose.model('Ticket', ticketSchema);

module.exports = Tickets;
