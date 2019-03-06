const crypto = require('crypto');
const database = require('./DataBase.js');
const user = require('./User.js');
const q_Auth = require('./queries/q_Auth.js');

/**
 * transforma a password em hash
 * @param {string} password password para converter em hash
 * @param {string} salt salt para juntar a passowrd
 * @returns {string} hash da password
 */
function getHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}

/**
 * transforma password em hash
 * @param {string} password password
 * @returns {object} {hash: <password hash>, salt: <salt used>}
 */
exports.newHashPassword = function (password) {
    let salt = crypto.randomBytes(16).toString('hex');
    return { hash: getHash(password, salt), salt: salt };
};
/**
 * 
 * @param {string} password password in plain
 * @param {string} passwordComp password in hash form
 * @param {string} salt salt used in first hash
 * @returns {boolean} if password is valid
 */
exports.validatePassword = function (password, passwordComp, salt) {
    return getHash(password, salt) === passwordComp;
};


/**
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} email email de autenticação
 * @param {string} password password de autenticação
 * @returns {JSON} {error: <se autenticado ? 0 sim : 1 nao>, user: <User se autenticado ou null se nao autenticado>}
 */
exports.checkUserAndPassword = async function (db, email, password) {
    let result = { error: 1, user: {} };
    let res = await db.doQuery(q_Auth.GET_USER_AND_TYPE_BY_EMAIL, [email]);
    //se nao ocorreu nenhum erro a adquirir o resultado
    if (res.error === 0) {
        //se existem resultados
        if (res.res.length > 0) {
            //verifica se a password é a correta
            if (this.validatePassword(password, res.res[0].password, res.res[0].salt)) {
                result.error = 0;
                result.user = new user.User(res.res[0]);
            }
        }
    }
    //devolve resultado
    return result;
};

/**
 * guarda user na session
 * @param {Request} req request do express
 * @param {user.User} user utilizador autenticado
 */
exports.setUserIntoSession = function (req, user) {
    req.session.user = user.getJSON();
};

/**
 * verifica e devolve User da session
 * @param {Request} req request do express
 * @returns {user.User} devolve o utilizador caso este esteja autenticadou ou null caso nãoe steja
 */
exports.getUserFromSession = function (req) {
    if (req.session.user) {
        return new user.User(req.session.user);
    } else return null;
};

/**
 * faz logout ao utilizador
 * @param {Request} req request do express
 */
exports.removeUserFromSession = function (req) {
    req.session.destroy();
};

/**
 * Adição dos pedidos relativos à autenticação
 * @param {Express} app servidor express
 * @param {database.Database} _db base de dados
 */
exports.appendToExpress = function (app, _db) {
    let thiss = this;
    let db = _db;
    app.post('/auth', async function (req, res) {
        let result = { error: 1, message: "Todos os campos săo obrigatórios", res: {} };
        //recebe o utilizador autenticado
        let u = thiss.getUserFromSession(req);
        //verifica se ja existe o utilizador autenticado
        if (u) {
            result.message = "Utilizador já se encontra autenticado";
            result.error = 0;
            result.res = u.getJSON();
        } else if (req.body.email && req.body.password) { //verifica se estão todos os parametros
            //indica que nãoi foi autenticado até verificar
            result.message = "Ocorreu um erro na autenticaçăo, verifique se todos os campos săo válidos";
            //verifica os dados de autenticação
            let resultDb = await thiss.checkUserAndPassword(db, req.body.email, req.body.password);
            //se foi autenticado com sucesso
            if (!resultDb.error) {
                //guarda a session
                thiss.setUserIntoSession(req, resultDb.user);
                //prepara resposta para cliente
                result.error = 0;
                result.message = "Autenticado com sucesso";
                result.res = resultDb.user.getJSON();
            }
        }
        //define a resposta
        res.json(result);
    });

    app.get('/auth', async function (req, res) {
        let result = { error: 1, message: "Por favor efectue autenticação", res: {} };
        //recebe o utilizador autenticado
        let u = thiss.getUserFromSession(req);
        //verifica se está autenticado
        if (u) {
            //prepara resposta para cliente
            result.error = 0;
            result.message = "Bem-vindo " + u.full_name;
            result.res = u.getJSON();
        }
        //define a resposta
        res.json(result);
    });

    app.get('/logout', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 0, message: "Sessão terminada com sucesso", res: {} };
        thiss.removeUserFromSession(req);
        //define a resposta
        res.json(result);
    });
};