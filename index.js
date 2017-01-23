
var express = require('express');
var app = express();
var router = express.Router();
var multer  = require('multer');

var morgan = require('morgan');
app.use(morgan('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // set our port
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Image'); // connect to our database
var Img = require('./mongo');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/ProductImages');
    },
    filename: function (req, file, cb) {
        console.log("----");
        var filename = Date.now() + file.originalname;
        req.body.EmpImage = filename;
        console.log(filename);
        cb(null,filename);
    }
})

var upload = multer({ storage: storage }).any();


router.route('/Emp')
    .get( function (req, res, next) {
        Img.find().exec(function (err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });

    })

    .post(upload, function (req, res, next) {
        var img=new Img();
        img.EmpName=req.body.EmpName;
        img.EmpImage=req.body.EmpImage;
        img.EmpSalary=req.body.EmpSalary;
        img.EmpDept=req.body.EmpDept;
        var d = new Date;
        console.log(d);
        img.EmpJoinDate=d;

        img.save(function (err) {
            if (err)
                res.send(err);
            res.send("Employ Entry Done !! ");
        });
    });
//sort by Emp salary..,.
router.route('/Empsort')
    .post( function (req, res, next) {
        Img.find({  "EmpDept" : req.body.EmpDept}).sort({"EmpSalary":1}).exec( function(err, doc) {
            res.json(doc);

        });

    });

//Find minimum Salary
router.route('/Empmin')
    .post( function (req, res, next) {
       Img.find({  "EmpDept" : req.body.EmpDept}).sort({"EmpSalary":1}).exec( function(err, doc) {
           res.json(doc[0]);

       });

    });

//Find Maximum salary
router.route('/Empmax')
    .post( function (req, res, next) {
        Img.find({  "EmpDept" : req.body.EmpDept}).sort({"EmpSalary":-1}).exec( function(err, doc) {

            res.json(doc[0]);

        });

    });


app.use('/', router);
app.listen(3000);


