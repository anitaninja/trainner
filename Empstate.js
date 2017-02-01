/**
 * Created by lcom64_one on 2/1/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var sSchema   = new Schema({
    State_Id:Number,
    State_Name:String
});
module.exports = mongoose.model('State', sSchema);

