var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8081; // set our port
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/inventary'); // connect to our database
var Author = require('./models/Author');
var Book = require('./models/book');

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Server strating .');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'welcome !!!'});
});

//-----------------------------------------------------------------------------
router.route('/book')

    .post(function (req, res) {



        var author=new Author();
        var flag=0;
        Author.find({aname: author.aname}).exec(function(err,obj){
            if(obj.aname !== req.body.Author) {
                console.log('Author is not exist'+obj.aname);
                flag=1;
            }
            else
            {
                console.log('Author is exist');
            }
        });
        author.aname=req.body.Author;
        author.book=1;
        author.save(function (err, savedAuthor) {
            if (err)
                res.send(err);
                var book = new Book();
                book.bname = req.body.bname;
                book.price = req.body.price;
                book.a_id = savedAuthor._id;
                book.save(function (err) {
                    if (err)
                        res.send(err);
                res.json({message: 'Book Infomation Inserted !!'});
            });
        });
    })

    // get all
    .get(function (req, res) {
        Book.find().populate('a_id').exec(function (err, books) {
            if (err)
                res.send(err);

            res.json(books);
        });
    });


router.route('/book/:book_id')

// get
    .get(function (req, res) {
        Book.findById(req.params.book_id, function (err, book) {
            if (err)
                res.send(err);
            res.json(book);
        });
    })

    // update id
    .put(function (req, res) {
        Book.findById(req.params.book_id, function (err, book) {

            if (err)
                res.send(err);

            book.bname = req.body.bname;
            book.price = req.body.price;
            book.Author = req.body.Author;
            book.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Book info updated!'});
            });

        });
    })

    // delete  id
    .delete(function (req, res) {
        Book.remove({_id: req.params.book_id},
            function (err, book) {
                if (err)
                    res.send(err);

                res.json({message: 'Successfully deleted'});
            });
    });


// REGISTER OUR ROUTES
app.use('/', router);

// START THE SERVER
app.listen(port);
console.log('Start server on port ' + port);
