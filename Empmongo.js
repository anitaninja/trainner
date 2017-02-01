var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var pSchema   = new Schema({
    EmpName: String,
    EmpImage:String,
    EmpEmail:String,
    EmpState:String,
    EmpCity:String,
    Empgender:String,
    EmpBOD:String,
    EmpActive:Boolean
});
module.exports = mongoose.model('Img', pSchema);
