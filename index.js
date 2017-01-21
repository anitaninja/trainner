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
var sub = require('./models/subject');

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Server strating .');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'welcome !!!'});
});
//------------------------------------------------------------------------
router.route('/sub')

    .get(function (req, res) {
        sub.find().exec(function (err, ss) {
            if (err)
                res.send(err);

            res.json(ss);
        });
    })

    .post(function (req, res) {
        var s = new sub();
        s.sname = req.body.sname;
        s.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Subject Infomation Inserted in table !!'});
        });
    })


            // delete  id
            .delete(function (req, res) {
                sub.remove({_id: req.params.sub_id},
                    function (err, book) {
                        if (err)
                            res.send(err);

                        res.json({message: 'Successfully deleted'});
                    });
            });

//------------------------------------------------------------------------
router.route('/author')
    .get(function (req, res) {
        Author.find().exec(function (err, authors) {
            if (err)
                res.send(err);

            res.json(authors);
        });
    })

        // delete  id
        .delete(function (req, res) {
            Author.remove({_id: req.params.Author_id},
                function (err, book) {
                    if (err)
                        res.send(err);

                    res.json({message: 'Successfully deleted'});
                });
        });

//-----------------------------------------------------------------------------
router.route('/book')

    .post(function (req, res) {
        var author = new Author();
        var flag = 0;
        Author.findOne({aname: req.body.Author}).exec(function (err, obj) {
            if (obj == null) {
                author.aname = req.body.Author;
                author.book = 1;
                author.save(function (err, savedAuthor) {
                    if (err)
                        res.send(err);
                    var book = new Book();
                    book.bname = req.body.bname;
                    book.price = req.body.price;
                    book.a_id = savedAuthor._id;


                    book.save(function (err, f) {
                        if (err)
                            res.send(err);

                        var s = new sub();
                        s.sname = req.body.sname;
                        s.book.push(f._id);
                        s.save(function (err) {
                            if (err)
                                res.send(err);
                            // s.save
                            res.json({message: 'Book Infomation Inserted in both table !!'});
                        });

                    });

                });
            }
            else {
                //console.log("--------",obj._id);
                var book = new Book();
                book.bname = req.body.bname;
                book.price = req.body.price;
                book.a_id = obj._id;
                book.save(function (err) {
                    if (err)
                        res.send(err);
                    Book.find().populate('a_id').exec(function (err, books) {
                        if (err)
                            res.send(err);

                        res.json(books);
                    });
                    //res.json({message: 'Author is exist !! Book Infomation Inserted !!'});
                });

            }
        });

    })

    // get all
    .get(function (req, res) {
        Book.find().select('-_id -__v').populate('a_id').exec(function (err, books) {
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
