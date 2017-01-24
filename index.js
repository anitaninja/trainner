var express = require('express');
var app = express();
var router = express.Router();

var morgan = require('morgan');
app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

var port = process.env.PORT || 8080; // set our port
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Image'); // connect to our database
var db = require('./Database/db');

router.route('/Data')
    .get(function (req, res, next) {
        db.find().exec(function (err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    })
    .post(function (req, res) {

        var s = new db();
        s.StudName = req.body.StudName;
        s.StudStd = req.body.StudStd;
        s.StudAdd = req.body.StudAdd;
        s.StudCon = req.body.StudCon;
        s.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Student Infomation Inserted !!'});
        });
    });
router.route('/lucky')
    .get(function (req, res) {
        db.find().exec(function (err, result) {
            if (err)
                res.send(err);
            var index = Math.floor(Math.random() * (result.length));

            res.json(result[index]);
        });

    });
router.route('/filter')
    .post(function (req, res) {
        db.find().exec(function (err, result) {
            if (err)
                res.send(err);
            res.json(_.filter(result, {'StudStd': req.body.StudStd}));
        });

    });

router.route('/group')
    .post(function (req, res) {
        db.find().exec(function (err, result) {
            if (err)
                res.send(err);
            res.json(_.groupBy(result.StudStd, 'length'));
        });

    });

router.route('/sort')
    .get(function (req, res) {
        db.find().exec(function (err, result) {
            if (err)
                res.send(err);

            _.sortBy(result, [function (o) {
                res.json(o.StudName)
            }]);
        });

    });



app.use('/', router);
app.listen(3000);


