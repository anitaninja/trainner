var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sSchema = new Schema({

    sname: String,
    Book:{type: [mongoose.Schema.Types.ObjectId],
        ref: 'book'}

});
module.exports = mongoose.model('sub', sSchema);