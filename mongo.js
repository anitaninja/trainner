/**
 * Created by lcom64_one on 1/23/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var pSchema   = new Schema({
    EmpName: String,
    EmpSalary:Number,
    EmpDept:String
});
module.exports = mongoose.model('Img', pSchema);










// var express = require('express');
// var app = express();
// var router = express.Router();
// var multer  = require('multer');
//
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/ProductImages');
//     },
//     filename: function (req, file, cb) {
//         console.log("----");
//         var filename = Date.now() + file.originalname;
//         req.body.productImage = filename;
//         cb(null,filename);
//     }
// })
//
// var upload = multer({ storage: storage }).any();
//
//
// router.route('/product')
//     .get( function (req, res, next) {
//         console.log("Inside get");
//         res.send("Called");
//     })
//
//     .post(upload, function (req, res, next) {
//         console.log("Inside post");
//         res.send("Called");
//     });
//
// app.use('/', router);
// app.listen(3000);
//
// module.exports = app;
