var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bSchema = new Schema({

    bname: String,
    price: Number,
    a_id:{type: mongoose.Schema.Types.ObjectId,
             ref: 'Author'}
});
module.exports = mongoose.model('book', bSchema);