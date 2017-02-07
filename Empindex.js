var express = require('express');
var app = express();
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});
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
var Img = require('./Empmongo');
var State = require('./Empstate');
var City = require('./Empcity');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/ProductImages');
    },
    filename: function (req, file, cb) {
        console.log("----");
        var filename = Date.now() + file.originalname;
        req.body.CImage = filename;
        console.log(req.body.CImage);
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

            res.json(result);
        });

    })

    .post( upload,function (req, res) {
        var files = req.files;
        console.log(files);
        var img = new Img();
        img.CName = req.body.CName;
        img.CImage=req.body.CImage;
        img.CPName = req.body.CPName;



        img.save(function (err) {
            if (err)
                res.send(err);
            res.send("Customer Entry Done !!!! ");
        });
    });

router.put('/Emp/:id', function (req, res) {

    Img.findById(req.params.id, function (err, img) {
        img.CName = req.body.CName;
        img.CImage=req.body.CImage;
        img.CPName = req.body.CPName;
        img.save(function (err) {
            if (err)
                res.send(err);
            else
                res.json(img);
        });

    });
});

// router.put( '/Emp/:id', function( req, res ) {
//      Img.findById( req.params.id, function( err, img ) {
//         img.CName = req.body.CName;
//         img.CImage=req.body.CImage;
//         img.CPName = req.body.CPName;
//
//        img.save( function( err ) {
//             if( !err ) {
//                 console.log( ' updated' );
//                 return res.send( img );
//             } else {
//                 console.log( err );
//                 return res.send('ERROR');
//             }
//         });
//     });
// });
router.delete('/Emp/:id', function (req, res) {
    var img = new Img();
    Img.remove({_id: req.params.id},
        function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
});
// router.get('/City/:State_Id', function (req, res, next) {
//     City.findById(req.params.id, function (err, user) {
//         if (err)
//             res.send(err);
//
//         res.json(user);
//     });
//
// })
router.get('/Emp/:id', function (req, res, next) {
    Img.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);

        res.json(user);
    });

})
// router.route('/')
//     .get(function (req, res, next) {
//         res.sendfile(__dirname + '/index.html');
//     });

app.use('/', router);
app.listen(3000);


