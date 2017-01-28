
var express = require('express');
var app = express();
var router = express.Router();
var multer  = require('multer');

var morgan = require('morgan');
app.use(morgan('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('./public', express.static(__dirname + './public'));

//var port = process.env.PORT ||; // set our port
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Image'); // connect to our database
var Img = require('./mongo');

router.route('/Emp')
    .get( function (req, res, next) {
        Img.find().exec(function (err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });

    })

    .post(function (req, res) {
        var img=new Img();
        img.EmpName=req.body.EmpName;
        img.EmpSalary=req.body.EmpSalary;
        img.EmpDept=req.body.EmpDept;

        img.save(function (err) {
            if (err)
                res.send(err);
            res.send("Employ Entry Done !!!! ");
        });
    })
    .delete(function (req, res) {

    });
router.delete('/Emp/:id', function(req, res) {
    var img=new Img();
    Img.remove({_id: req.params._id},
        function (err, book) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
});

router.route('/page')
    .get(function (req, res, next) {
        res.sendfile(__dirname + '/DataEntry.html');
    });

app.use('/', router);
app.listen(3000);


