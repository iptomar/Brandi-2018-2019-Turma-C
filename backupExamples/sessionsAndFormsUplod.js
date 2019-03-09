const express = require('express');
const bodyParser = require("body-parser");
const formidable = require('formidable');
const session = require('express-session')
const person = require('./Person.js');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'keyboard cat', resave: true,saveUninitialized: true, cookie: { maxAge: 60000 }}));

app.post('/hello', function(req, res) {
var form = new formidable.IncomingForm();

new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    console.log('Fields', fields)
    console.log('Files', files)
  })
        console.log(req.body);
        console.log(req.params);
        console.log(req.query);
	let name = req.body.name;
	
       if(!name) res.json({error: 1,menssage: "Please insert name"});
	else {
	    let p =new person.Person();
	    p.name = name;
	    req.session.person = {name: p.name};
	    res.json({error: 0,menssage: p.sayHello()})
        }
})
app.get('/hello', function(req, res) {
        if(!req.session.person) res.json({error: 1, menssage: "please login"});
        else {
            
            let p = new person.Person();
            p.name=req.session.person.name
            res.json({error: 0,menssage: p.sayHello()});
        }
})

app.use('/', express.static('/var/www/html/'));
app.get('*', function(req, res) {
    res.redirect('/');
});
app.listen(80);
