const express = require('express');
const bodyParser = require("body-parser");
const formidable = require('formidable');
const session = require('express-session');
const fs = require('fs');
const path = require("path");
const infoDB = require('./lib/InfoDB.js');

//const person = require('./lib/Person.js');//para eliminar
const database = require('./lib/DataBase.js');
const auth = require('./lib/Auth.js');
//porta do servidor
const PORT = 80;
//diretória de ficheiros html estáticos
const PUBLIC_DIR = __dirname + path.sep + 'html' + path.sep;
console.log("STATIC HTML PATH=\"" + PUBLIC_DIR + "\"");

//servidor express web
const app = express();
app.listen(PORT);//inicializa o servidor na porta definida
console.log("server created");
//parser que permite transformar em json o que vem por os metodos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log("body parser initialized");
//inicializaçăo do sistema de sessőes do lado do servidor
app.use(session({ secret: 'keyboard dog', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 } }));
console.log("Sessions initialized");
//inicializaçăo da pool da base de dados
const db = new database.Database(infoDB.HOST, infoDB.PORT, infoDB.USER, infoDB.PASSWORD, infoDB.DB);
console.log("Mariadb pool initialized");
let dbCreation = db.createAllTables();
if (dbCreation.error === 1) {
    console.log(dbCreation.res);
    return;
}
console.log("Database tables criadas");
//console.log(auth.newHashPassword("123456"));

//inclui pedidos relativos à sessão
auth.appendToExpress(app,db);

//transforma o pedido em um pedido com .html(caso ja nao contenha este)
app.use(function (req, res, next) {
    if (req.path.indexOf('.') === -1) {
        var file = PUBLIC_DIR + req.path + '.html';
        fs.exists(file, function (exists) {
            if (exists)
                req.url += '.html';
            next();
        });
    }
    else
        next();
});
//chama a página estática
app.use(express.static(PUBLIC_DIR));
//por defeito:
app.get('*', function (req, res) {
    res.redirect('/');
});
app.post('*', function (req, res) {
    res.redirect('/');
});
app.delete('*', function (req, res) {
    res.redirect('/');
});
app.put('*', function (req, res) {
    res.redirect('/');
});






//app.post('/login', function (req, res) {
//    var form = new formidable.IncomingForm();

//    new formidable.IncomingForm().parse(req, (err, fields, files) => {
//        if (err) {
//            console.error('Error', err);
//            throw err;
//        }
//        console.log('Fields', fields);
//        console.log('Files', files);
//    });
//    console.log(req.body);
//    console.log(req.params);
//    console.log(req.query);
//    let name = req.body.name;

//    if (!name) res.json({ error: 1, message: "Please insert name" });
//    else {
//        let p = new person.Person();
//        p.name = name;
//        req.session.pp = p;
//        req.session.person = { name: p.name };
//        console.log(req.session);
//        res.json({ error: 0, message: p.sayHello() })
//    }
//});