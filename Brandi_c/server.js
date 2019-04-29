const express = require('express');
const bodyParser = require("body-parser");
const formidable = require('formidable');
const session = require('express-session');
const fs = require('fs');
const path = require("path");
const infoDB = require('./lib/InfoDB.js');

//const person = require('./lib/Person.js');//para eliminar
//----------------------------------- LIBS -----------------------------------
const database = require('./lib/DataBase.js');
const auth = require('./lib/Auth.js');
const datasheet = require('./lib/DataSheet');


//----------------------------------- END LIBS -----------------------------------
//porta do servidor
const PORT = 8080;
const PREFIX_ROUTE = '/api';
//diretória de ficheiros html estáticos
const PUBLIC_DIR = __dirname + path.sep + 'html' + path.sep;
console.log("STATIC HTML PATH=\"" + PUBLIC_DIR + "\"");

//inicializaçăo da pool da base de dados
const db = new database.Database(infoDB.HOST, infoDB.PORT, infoDB.USER, infoDB.PASSWORD, infoDB.DB);
//tenta criar todas as tabelas necessárias para a app
console.log("Mariadb pool initialized");
db.createAllTables()
.then(() => {
    //servidor express web
    const app = express();
    //permite cors 
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    //inicializa o servidor na porta definida
    app.listen(PORT);
    console.log("server created in port: " + PORT);
    //parser que permite transformar em json o que vem por os metodos
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    console.log("body parser initialized");
    //inicializaçăo do sistema de sessőes do lado do servidor
    app.use(session({ secret: 'keyboard dog', resave: true, saveUninitialized: true, cookie: { maxAge: 60000*60*24/*1 dia*/ } }));
    console.log("Sessions initialized");
    console.log("Database tables criadas");
    auth.addFirstUserAndUserType(db);
    console.log("Admin user and default user types created");
    //console.log(auth.newHashPassword("123456"));

    //----------------------------------- LIBS APPEND ROUTES -----------------------------------
    //inclui pedidos relativos à sessão
    auth.appendToExpress(app, db, PREFIX_ROUTE);
    //inclui pedidos relativos à ficha técnica
    datasheet.appendToExpress(app, db, PREFIX_ROUTE);


    //----------------------------------- END LIBS APPEND ROUTES  -----------------------------------
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
})
.catch((error) => {
    console.log(dbCreation.res);
})
