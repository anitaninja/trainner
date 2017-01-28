var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var pSchema   = new Schema({
    EmpName: String,
    EmpSalary:Number,
    EmpDept:String
});
module.exports = mongoose.model('Img', pSchema);
