/**
 * Created by lcom64_one on 2/1/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var cSchema   = new Schema({
   City_Name:String,
    State_Id:{type: mongoose.Schema.Types.ObjectId,
        ref: 'State'}

});
module.exports = mongoose.model('City', cSchema);
