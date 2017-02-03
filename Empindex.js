var express = require('express');
var app = express();
var router = express.Router();
var multer = require('multer');

var morgan = require('morgan');
app.use(morgan('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('./public', express.static(__dirname + './public'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Image'); // connect to our database
var Img = require('./moduls/Empmongo');
var State = require('./moduls/Empstate');
var City = require('./moduls/Empcity');

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/EmpProfilePic');
    },
    filename: function (req, file, cb) {
        console.log("----");
        var filename = Date.now() + file.originalname;
        req.body.EmpImage = filename;
        console.log(req.body.EmpImage);
        cb(null, filename);
    }
});

var upload = multer({storage: storage}).any();
//app.use(upload.array());

router.route('/State')
    .get(function (req, res, next) {
        State.find().exec(function (err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });

    })

    .post(function (req, res) {

        var state = new State();
        state.State_Id = req.body.State_Id;
        state.State_Name=req.body.State_Name;


        state.save(function (err) {
            if (err)
                res.send(err);
            res.send("State Entry Done !!!! ");
        });
    });

router.route('/City')
    .get(function (req, res, next) {
        City.find().exec(function (err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });

    })

    .delete(function (req, res) {

            City.remove({_id: req.params.id},
                function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'City Successfully deleted'});
                });
        }
    )
    .post(function (req, res) {

        var city = new City();
        city.City_Name = req.body.City_Name;
        city.State_Id=req.body.State_Id;


        city.save(function (err) {
            if (err)
                res.send(err);
            res.send("City Entry Done !!!! ");
        });
    });
router.route('/filter/:id')
    .get(function (req, res) {
        City.find({ State_Id: { $eq: req.params.id } }).exec(function (err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });

router.route('/Emp')
    .get(function (req, res, next) {
        Img.find().exec(function (err, result) {
            if (err)
                res.send(err);
            res.send(result);
            console.log(result);
        });

    })

    .post( upload,function (req, res) {
        var files = req.files;
        console.log(files);
        var img = new Img();
        img.EmpName = req.body.EmpName;
        img.EmpImage=req.body.EmpImage;
        img.EmpEmail = req.body.EmpEmail;
        img.EmpState = req.body.EmpState;
        img.EmpCity=req.body.EmpCity;
        img.Empgender=req.body.Empgender;
        img.EmpBOD=req.body.EmpBOD;
        img.EmpActive=req.body.EmpActive;


        img.save(function (err) {
            if (err)
                res.send(err);
            res.send("Employ Entry Done !!!! ");
        });
    });

router.delete('/Emp/:id', function (req, res) {
    var img = new Img();
    Img.remove({_id: req.params.id},
        function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
});

router.get('/Emp/:id', function (req, res, next) {
    Img.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);

        res.json(user);
    });

})
router.route('/EmpDataEntry')
    .get(function (req, res, next) {
        res.sendfile(__dirname +'/public' +'/views'+'/page'+ '/register.html');
    });

app.use('/', router);
app.listen(3000);


