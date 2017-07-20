// importing modules
const express = require("express");
const path = require('path');
var bodyParser = require('body-parser')
const url = require('url');

// app is a instance of express
// to run express on top of nodejs need to run app instance
const app = express();

var tempUsername = "";

// to use middleware app.use
// express built-in middleware for static dir files to server
// from assets we serve app.css
app.use(express.static('assets'));

// for mutiple static dir
// from file we serve index.html
app.use(express.static('files'));

// to create path prefix virtual dir
// from virtual we serve images
app.use('/virtual', express.static(path.join(__dirname, 'images')));

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', 'pug');

// basic http get request on '/'
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'files/Login.html'))
});

//for diffrent type of compile (by defult .html render) other renders -> jade,pug
//app.set('view engine', 'jade');

app.get('/Login', function (req, res) {

    // res.sendFile(path.join(__dirname, 'files/Login.html'))

    //seconde way
    res.sendFile('files/Login.html', {root: __dirname})
});

// basic http get request on '/'
app.get('/SignUp', function (req, res) {
    res.sendFile(path.join(__dirname, 'files/SignUp.html'))
});

// basic http get request on '/'
app.get('/Forgot', function (req, res) {
    res.sendFile(path.join(__dirname, 'files/Forgot.html'))
});


// basic http get request on '/Test'
app.get('/Test/username/:username', function (req, res) {

    //console.log(req.params.username)
    //res.send("Hello")
    //res.send('You sent the name "' + req.body.username + '".');

    res.render((path.join(__dirname, 'files/test.pug')), {
        title: 'TestPub',
        message: req.params.username
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    })

    // res.sendFile(path.join(__dirname, 'files/Forgot.html'))
});

app.post('/LoginData', function (req, res) {

    console.log(req.body.username);

    //with Temp Variable
    // tempUsername = req.body.username;
    // res.redirect('/WelcomeScreen');


    //without Temp Variable
    res.redirect(url.format({
        pathname: "/WelcomeScreen",
        query: {
            "username": req.body.username
        }
    }));

    //res.render((path.join(__dirname, 'files/test.pug')),{ title: 'TestPub', message: req.body.username });
    //res.sendFile(path.join(__dirname, 'files/SignUp.html'))
});

app.get('/WelcomeScreen', function (req, res) {
    //with Temp Variable
    // res.render((path.join(__dirname, 'files/test.pug')),{ title: 'TestPub', message: tempUsername });

    console.log(req);
    // console.log(res.body);
    console.log(req.query.username);

    //without Temp Variable
    res.render((path.join(__dirname, 'files/test.pug')), {title: 'TestPub', message: req.query.username});
});


// server port listen on 3000
app.listen(8080, function () {
    console.log('Server is running on port 8080');
});