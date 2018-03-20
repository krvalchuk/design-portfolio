var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public/portfolio'));

//email sender

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
    port: 465,
   secure: true,
    requireTLS: true,
    service: 'gmail',
    auth: {
        //CREDENTIALS ARE NOT AVAILABLE FOR OPEN CODE
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

function sendEmail(subject, text) {
	console.log('E-mail sent');
    var mailOptions = {
        //CREDENTIALS ARE NOT AVAILABLE FOR OPEN CODE
       subject: subject,
       text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
       if (error) {
           console.log(error);
       } else {
           console.log('Email sent: ' + info.response);
       }
    });
}


//serving pages & responses

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/email', function (req, res) {
    var subject = 'Message from portfolio site visitor';
    var text = 'Hello! You have a new client:) \n\nName: ' + req.body.name +
        '\nEmail: ' + req.body.email +
        '\nMessage: ' + req.body.message+
        '\n \nHave a nice day!';
    sendEmail(subject, text);
    res.end('Message sent!');
});

app.listen(process.env.PORT || 5000);