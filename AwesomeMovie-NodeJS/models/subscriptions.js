var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscribeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Subscriptions = mongoose.model('Subsription', subscribeSchema);

module.exports = Subscriptions;
