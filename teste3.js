const express = require('express');
const mariadb = require('mariadb');
const bodyParser = require("body-parser");
const formidable = require('formidable');
const session = require('express-session');
var fs = require('fs');
const person = require('./Person.js');

var publicdir = '/var/www/html/';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({ secret: 'keyboard cat', resave: true,saveUninitialized: true, cookie: { maxAge: 60000 }}));

const pool = mariadb.createPool({
     host: 'localhost', 
     user:'brandic', 
     password: 'brandic',
	 database: 'brandi',
});
async function doQuery(q,params) {
  let conn;
  let result = {error: 1, res: undefined};
  try {
	conn = await pool.getConnection();
	let rows = await conn.query(q,params);
	result.res=rows;
	result.error=0;
  } catch (err) {
	  result.res=err;
  } finally {
	if (conn) conn.end();
	return result;
  }
}

async function doDelete(q,params) {
	let res = await doQuery(q,params);
	if(res.error == 0) res.res = res.res.affectedRows;
	return res;
}


async function getData(num) {
  return await doQuery("SELECT id from teste where id=? and id!=2",[num]);
}
app.get('/db',async function(req,res) {
	res.json(await getData(req.query.pesquisa));
});
app.delete('/db',async function(req,res) {
	res.json(await doDelete("delete from teste where id=?",[req.query.pesquisa]));
});
app.post('/login', function(req, res) {
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
	
       if(!name) res.json({error: 1,message: "Please insert name"});
	else {
	    let p =new person.Person();
	    p.name = name;
		req.session.pp=p;
	    req.session.person = {name: p.name};
		console.log(req.session);
	    res.json({error: 0,message: p.sayHello()})
        }
})
app.get('/login', function(req, res) {
        if(!req.session.person) res.json({error: 1, message: "please login"});
        else {
            
		console.log(req.session);
            let p = new person.Person();
            p.name=req.session.person.name;
            res.json({error: 0,message: p.sayHello()});
        }
});
app.use('/login2',express.static('/var/www/html/login.html'));
app.delete('/login', function(req, res) {
        req.session.destroy();
		res.json({error: 0, message: "logged out"});
});
app.use(function(req, res, next) {
  if (req.path.indexOf('.') === -1) {
    var file = publicdir + req.path + '.html';
    fs.exists(file, function(exists) {
      if (exists)
        req.url += '.html';
      next();
    });
  }
  else
    next();
});
app.use(express.static(publicdir));
app.get('*', function(req, res) {
    res.redirect('/');
});
app.post('*', function(req, res) {
    res.redirect('/');
});
app.delete('*', function(req, res) {
    res.redirect('/');
});
app.put('*', function(req, res) {
    res.redirect('/');
});
app.listen(80);
