var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    subject:  {
        type: String,
        required: true
    },
    message:  {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;
