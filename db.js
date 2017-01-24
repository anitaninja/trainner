var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var pSchema   = new Schema({
    StudName: String,
    StudStd:Number,
    StudAdd:String,
    StudCon:Number
});
module.exports = mongoose.model('db', pSchema);

