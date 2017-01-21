var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var aSchema   = new Schema({
    aname: String,
    book:Number
});

module.exports = mongoose.model('Author', aSchema);