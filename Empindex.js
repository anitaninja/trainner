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
var Img = require('./Empmongo');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/ProductImages');
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
        img.EmpName = req.body.EmpName;
        img.EmpImage=req.body.EmpImage;
        img.EmpSalary = req.body.EmpSalary;
        img.EmpDept = req.body.EmpDept;
        img.Empgender=req.body.Empgender;
        img.EmpJdate=req.body.EmpJdate;

        img.save(function (err) {
            if (err)
                res.send(err);
            res.send("Employ Entry Done !!!! ");
        });
    });
    router.put('/Emp/:id', function (req, res) {
    Img.findById(req.params.id, function (err, img) {
        if (err)
            res.send(err);

        img.EmpName = req.body.EmpName;
        img.EmpSalary = req.body.EmpSalary;
        img.EmpJdate = req.body.EmpJdate;
        img.save(function (err) {
            if (err)
                res.send(err);

            res.json(img);
        });

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
router.route('/DataEntry')
    .get(function (req, res, next) {
        res.sendfile(__dirname + '/EmpDataEntry.html');
    });

app.use('/', router);
app.listen(3000);


