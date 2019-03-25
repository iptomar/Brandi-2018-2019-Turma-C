const crypto = require('crypto');
const infoDB = require('./InfoDB.js');
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
 * Devolve lista de utilizadores no sistema
 * @param {database.Database} db Class de ligação à base de dados
 * @returns {JSON} {error: <se autenticado ? 0 sim : 1 nao>, users: [<lista de utilizadores(User)>]}
 */
exports.geUserList = async function (db) {
    let result = { error: 1, users: [] };
    let res = await db.doQuery(q_Auth.GET_USER_AND_TYPE_LIST, []);
    //se nao ocorreu nenhum erro a adquirir o resultado
    if (res.error === 0) {
        //se existem resultados
        if (res.res.length > 0) {
            //por cada utilizador
            res.res.forEach(u => {
                result.users.push(new user.User(u));
            });
            result.error = 0;
        }
    }
    //devolve resultado
    return result;
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
    if (!res.error && res.res.length > 0) {
        //verifica se a password é a correta
        if (this.validatePassword(password, res.res[0].password, res.res[0].salt)) {
            result.error = 0;
            result.user = new user.User(res.res[0]);
        }
    }
    //devolve resultado
    return result;
};

/**
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id_type numero de identificação do tipo de utilizador
 * @returns {JSON} {error: <se encontrou ? 0 sim : se ocorreu erro ? 1 : 2>, user_type: {id, name} ou {}}
 */
exports.getUserTypeById = async function (db, id_type) {
    let result = { error: 1, user_type: {} };
    let res = await db.doQuery(q_Auth.GET_USER_TYPE_BY_ID, [id_type]);
    //se nao ocorreu nenhum erro a adquirir o resultado
    if (res.error === 0) {
        result.error = 2;
        //se existem resultados
        if (res.res.length > 0) {
            result.error = 0;
            result.user_type = { id: res.res[0].id, name: res.res[0].type_user };
        }
    }
    //devolve resultado
    return result;
};

/**
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} name_type nome de identificação do tipo de utilizador
 * @returns {JSON} {error: <se encontrou ? 0 sim : se ocorreu erro ? 1 : 2>, user_type: {id, name} ou {}}
 */
exports.getUserTypeByName = async function (db, name_type) {
    let result = { error: 1, user_type: {} };
    let res = await db.doQuery(q_Auth.GET_USER_TYPE_BY_NAME, [name_type]);
    //se nao ocorreu nenhum erro a adquirir o resultado
    if (res.error === 0) {
        result.error = 2;
        //se existem resultados
        if (res.res.length > 0) {
            result.error = 0;
            result.user_type = { id: res.res[0].id, name: res.res[0].type_user };
        }
    }
    //devolve resultado
    return result;
};

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} name_type nome de identificação do tipo de utilizador
 * @returns {boolean} se foi adicionado
 */
exports.addNewUserType = async function (db, name_type) {
    let result = false;
    let searchType = await this.getUserTypeByName(db, name_type);
    //console.log(searchType);
    //se nao ocorreu nenhum erro a adquirir o resultado e nao encontrou nenhum resultado
    if (searchType.error === 2) {
        //adiciona o novo tipo de utilizador
        if ((await db.doQuery(q_Auth.ADD_NEW_USER_TYPE, [name_type])).error === 0) result = true;
    }
    return result;
};

/**
 * atualiza ultimo login do utilizador
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do utilizador
 * @returns {boolean} se foi atualizado
 */
exports.setNewLastLogin = async function (db, id) {
    let result = false;
    let res = await db.doQuery(q_Auth.SET_LAST_LOGIN_BY_ID, [id]);
    //se nao ocorreu nenhum erro
    if (res.error === 0) {
        result = true;
    }
    //devolve resultado
    return result;
};


exports.addFirstUserAndUserType = async function (db) {
    await this.addNewUserType(db, infoDB.ADMIN_TYPE_NAME);
    await this.addNewUser(db, infoDB.ADMIN_EMAIL, infoDB.ADMIN_PW, infoDB.ADMIN_EMAIL, "", "", "", (await this.getUserTypeByName(db, infoDB.ADMIN_TYPE_NAME)).user_type.id);
}

/**
 * 
/**
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} email email de autenticação
 * @param {string} password password de autenticação
 * @param {string} fullname nome inteiro do utilizador
 * @param {string} address endereço do utilizador
 * @param {string} birthday 'ano-mes-dia' - data de nascimento do utilizador
 * @param {string} cellphone numero de telemovel do utilizador
 * @param {number} usertypeid id do tipo de utilizador
 * @returns {JSON} {error: <se registado ? 0 sim : 1 nao porque ja registado, 2 se invalido>, user: <User se registado ou null se nao registado>}
 */
exports.addNewUser = async function (db, email, password, fullname, address, birthday, cellphone, usertypeid) {
    let result = { error: 1, user: {} };
    //verifica se o utilizador já existe
    let resultDb = await db.doQuery(q_Auth.GET_USER_AND_TYPE_BY_EMAIL, [email]);
    //se foi autenticado com sucesso e verifica se o user ja existe
    if (!resultDb.error && resultDb.res.length === 0) {
        result.error = 2;
        //verifica se o tipo de utilizador existe
        let type = await this.getUserTypeById(db, usertypeid);
        if (!type.error) {
            //gera o hash e o salt novo da passowrd
            let pw = this.newHashPassword(password);
            //cria o novo utilizador
            resultDb = await db.doQuery(q_Auth.CREATE_USER, [email, pw.hash, pw.salt, fullname, address, birthday, cellphone, usertypeid]);
            if (!resultDb.error) {
                //prepara resposta para cliente
                result.error = 0;
                //como o tempo de guardar a nova data e de chegar ateé aqui é de uns milisegundos
                //defimos a data de agora
                result.user = new user.User({ id: resultDb.res.insertId, email: email, full_name: fullname, address: address, birthday: birthday, cellphone: cellphone, id_type_user: type.user_type.id, type_user: type.user_type.name, last_login: new Date()/*TODO*/ });
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
 * @param {string} _prefix prefixo das rotas
 */
exports.appendToExpress = function (app, _db, _prefix) {
    let thiss = this;
    let db = _db;
    let prefix = _prefix;
    app.post(prefix + '/register', async function (req, res) {
        let result = { error: 2, message: "Não tem permissões para registar utilizadores", res: {} };
        //recebe o utilizador autenticado
        let u = thiss.getUserFromSession(req);
        //verifica se ja existe o utilizador autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                result.error = 1;
                result.message = "Insira todos os campos obrigatórios";
                if (req.body.email && req.body.password && req.body.fullname && /*req.body.address && req.body.birthday && req.body.cellphone &&*/ req.body.usertypeid) {
                    //indica que nãoi foi autenticado até verificar
                    result.message = "Ocorreu um erro no registo, verifique se todos os campos săo válidos";
                    //verifica os dados de autenticação
                    let resDb = await thiss.addNewUser(db, req.body.email, req.body.password, req.body.fullname, req.body.address, req.body.birthday, req.body.cellphone, req.body.usertypeid);
                    //se foi autenticado com sucesso
                    if (!resDb.error) {
                        //guarda a session - nao é criada uma nova sessão
                        //thiss.setUserIntoSession(req, resDb.user);
                        //prepara resposta para cliente
                        result.error = 0;
                        result.message = "Registado com sucesso";
                        result.res = resDb.user.getJSON();
                    } else if (resDb.error === 1) {
                        result.message = "Esse email já se encontra em utilização";
                    }
                }
            }

        }
        //define a resposta
        res.json(result);
    });
    app.post(prefix + '/auth', async function (req, res) {
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
                //atualiza a data de ultimo login
                await thiss.setNewLastLogin(db, resultDb.user.id);
                //como o tempo de guardar a nova data e de chegar ateé aqui é de uns milisegundos
                //defimos a data de agora
                resultDb.user.last_login = new Date();
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

    app.get(prefix + '/auth', async function (req, res) {
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

    app.get('/api/logout', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 0, message: "Sessão terminada com sucesso", res: {} };
        thiss.removeUserFromSession(req);
        //define a resposta
        res.json(result);
    });


    app.get(prefix + '/userlist', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 1, message: "Não tem permissões para listar utilizadores", res: { users: [] } };
        //carrega os dados em sessão do utilizador
        let u = thiss.getUserFromSession(req);
        //verifica se está autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                let resultDb = await thiss.geUserList(db);
                result.error = 0;
                result.message = "Lista de utilizadores";
                //por cada utilizador pede o  json deste
                resultDb.users.forEach(u => {
                    result.res.users.push(u.getJSON());
                });
            }
        }
        //define a resposta
        res.json(result);
    });

    app.post(prefix + '/addusertype', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 2, message: "Não tem permissões para adicionar tipos de utilizadores", res: {} };
        //carrega os dados em sessão do utilizador
        let u = thiss.getUserFromSession(req);
        //verifica se está autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                result.error = 1;
                result.message="Insira todos os campos obrigatórios";
                //verifica se estão todos os campos definidos
                if (req.body.name) {
                    if (await thiss.addNewType(db, req.body.name)) {
                        result.error = 0;
                        result.message = "Tipo de utilizador adicionado com sucesso";
                    } else {
                        result.message = "Ocorreu um erro, provavelmente esse tipo de utilizador já existe";
                    }
                }
            }
        }
        //define a resposta
        res.json(result);
    });
};