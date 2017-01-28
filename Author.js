var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var aSchema   = new Schema({
    aname: String,
    book:Number,
    Book:{type: [mongoose.Schema.Types.ObjectId],
        ref: 'book'}
});

module.exports = mongoose.model('Author', aSchema);