const crypto = require('crypto');
const infoDB = require('./InfoDB.js');
const database = require('./DataBase.js');
const user = require('./User.js');
const q_Auth = require('./queries/q_Auth.js');



const ROUTE_USER_PREFIX = "/user";
const ROUTE_USER_TYPE_PREFIX = ROUTE_USER_PREFIX + "/type";

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
 * @param {string} searchWord palavra de pesquisa de email ou nome
 * @returns {JSON} {error: <se autenticado ? 0 sim : 1 nao>, users: [<lista de utilizadores(User)>]}
 */
exports.geUserList = async function (db,searchWord) {
    let result = { error: 1, users: [] };
    let search = "%" + searchWord + "%";
    let res = await db.doQuery(q_Auth.GET_USER_AND_TYPE_LIST, [search, search, search]);
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
 * @returns {JSON} {error: <se correto ? 0 sim : 2 se não existir o user ou 1 se a password estiver errada>, user: <User se autenticado ou null se nao autenticado>}
 */
exports.checkUserAndPassword = async function (db, email, password) {
    let result = { error: 2, user: {} };
    let res = await db.doQuery(q_Auth.GET_USER_AND_TYPE_BY_EMAIL, [email]);
    //se nao ocorreu nenhum erro a adquirir o resultado
    if (!res.error && res.res.length > 0) {
        result.error = 1;
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
 * @param {string} id id do utilizador
 * @param {string} password password de autenticação
 * @returns {JSON} {error: <se correto ? 0 sim : 2 se não existir o user ou 1 se a password estiver errada>, user: <User se autenticado ou null se nao autenticado>}
 */
exports.checkPasswordById = async function (db, id, password) {
    let result = { error: 2, user: {} };
    let res = await db.doQuery(q_Auth.GET_USER_AND_TYPE_BY_ID, [id]);
    //se nao ocorreu nenhum erro a adquirir o resultado
    if (!res.error && res.res.length > 0) {
        result.error = 1;
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
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do tipo de utilizador
 * @param {string} name_type nome de identificação do tipo de utilizador
 * @returns {boolean} se foi alterado
 */
exports.changerUserType = async function (db, id, name_type) {
    let result = false;
    let searchType = await this.getUserTypeByName(db, name_type);
    //console.log(searchType);
    //se nao ocorreu nenhum erro a adquirir o resultado e nao encontrou nenhum resultado
    if (searchType.error === 2) {
        //altera o tipo de utilizador
        let change = await db.doQuery(q_Auth.UPDATE_USER_TYPE, [name_type, id]);
        //se conseguiu alterar
        if (change.error === 0 && change.res.affectedRows > 0) result = true;
    } else if (!searchType.error && searchType.user_type.id + "" === id) result = true;
    return result;
};

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do tipo de utilizador
 * @returns {number} 0 -> se foi apagado, 2 -> se existem utilizadores associados, 1 -> se não existir
 */
exports.deleteUserType = async function (db, id) {
    let result = 2;
    let searchUser = await db.doQuery(q_Auth.GET_USERS_ID_LIST_BY_USER_TYPE,[id]);
    //console.log(searchType);
    //se nao ocorreu nenhum erro a adquirir o resultado e nao encontrou nenhum resultado
    if (!searchUser.error && searchUser.res.length === 0) {
        //nao existe
        result = 1;
        //elimina o tipo de utilizador
        let delUserType = await db.doDelete(q_Auth.DELETE_USER_TYPE, [id]);
        //se conseguiu eliminar
        if (delUserType.error === 0 && delUserType.res > 0) result = 0;
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
    await this.addNewUser(db, infoDB.ADMIN_EMAIL, infoDB.ADMIN_PW, infoDB.ADMIN_EMAIL, "", "", "", "", "", (await this.getUserTypeByName(db, infoDB.ADMIN_TYPE_NAME)).user_type.id);
};

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
 * @param {string} title dont know
 * @param {string} qualifications dont know
 * @returns {JSON} {error: <se registado ? 0 sim : 1 nao porque ja registado, 2 se invalido>, user: <User se registado ou null se nao registado>}
 */
exports.addNewUser = async function (db, email, password, fullname, address, birthday, cellphone, usertypeid,title,qualifications) {
    let result = { error: 1, user: {} };
    //verifica se o utilizador já existe
    let resultDb = await db.doQuery(q_Auth.GET_USER_AND_TYPE_BY_EMAIL_IGNORE_DELETE, [email]);
    //se foi autenticado com sucesso e verifica se o user ja existe
    if (!resultDb.error && resultDb.res.length === 0) {
        result.error = 2;
        //verifica se o tipo de utilizador existe
        let type = await this.getUserTypeById(db, usertypeid);
        if (!type.error) {
            //gera o hash e o salt novo da passowrd
            let pw = this.newHashPassword(password);
            //cria o novo utilizador
            resultDb = await db.doQuery(q_Auth.CREATE_USER, [email, pw.hash, pw.salt, fullname, address, birthday, cellphone, usertypeid, title, qualifications]);
            if (!resultDb.error) { 
                //prepara resposta para cliente
                result.error = 0;
                //como o tempo de guardar a nova data e de chegar ateé aqui é de uns milisegundos
                //defimos a data de agora
                result.user = new user.User({ id: resultDb.res.insertId, email: email, full_name: fullname, address: address, birthday: birthday, cellphone: cellphone, id_type_user: type.user_type.id, type_user: type.user_type.name, register_date: new Date(), last_login: new Date(), title: title, qualifications: qualifications});
            }
        }
    }
    //devolve resultado
    return result;
};

/**
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do utilizador
 * @param {string} fullname nome inteiro do utilizador
 * @param {string} address endereço do utilizador
 * @param {string} cellphone numero de telemovel do utilizador
 * @param {number} usertypeid id do tipo de utilizador
 * @param {string} title dont know
 * @param {string} qualifications dont know
 * @returns {JSON} {error: <se alterado ? 0 sim : 1 nao porque não existe, 2 se invalido>, usertype: <se error == 0 ? {id: <id user type>,name: <nome do id type>} : senao {}>}
 */
exports.changeUser = async function (db, id, fullname, address, cellphone, usertypeid, title, qualifications) {
    let result = {error: 1, usertype: {}};
    //verifica se o utilizador já existe
    let resultDb = await db.doQuery(q_Auth.GET_USER_AND_TYPE_BY_ID, [id]);
    //se foi autenticado com sucesso e verifica se o user ja existe
    if (!resultDb.error && resultDb.res.length === 1) {
        result.error = 2;
        //verifica se o tipo de utilizador existe
        let type = await this.getUserTypeById(db, usertypeid);
        if (!type.error) {
            //cria o novo utilizador
            resultDb = await db.doQuery(q_Auth.UPDATE_USER, [fullname, address, cellphone, type.user_type.id, title, qualifications, id]);
            if (!resultDb.error) {
                //prepara resposta para cliente
                result.error = 0;
                result.usertype = { id: type.user_type.id, name: type.user_type.name};
            }
        }
    }
    //devolve resultado
    return result;
};

/**
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do utilizador
 * @param {string} oldPassword password atual do utilizador
 * @param {string} newPassword nova password do utilizador
 * @returns {number} {error: <se alterado ? 0 sim : 2 nao porque não existe, 1 password errada>}
 */
exports.changeUserPassword = async function (db, id, oldPassword, newPassword) {
    //verifica se o utilizador já existe
    let resultDb = await this.checkPasswordById(db, id, oldPassword);
    let result = resultDb.error;
    //se foi autenticado com sucesso e verifica se o user ja existe
    if (!resultDb.error) {
            //new pw
            let pw = this.newHashPassword(newPassword);
            //cria o novo utilizador
            if (!(await db.doQuery(q_Auth.UPDATE_USER_PW, [pw.hash, pw.salt, id]).error)) {
                //prepara resposta para cliente
                result = 0;
            }
    }
    //devolve resultado
    return result;
};

/**
 * Devolve lista de utilizadores no sistema
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} searchWord Palavra para utilizar na pesqusia
 * @returns {JSON} {error: <se autenticado ? 0 sim : 1 nao>, user_types: [{id: <id do tipo>, name: <nome do tipo>}]}
 */
exports.getUserTypeList = async function (db,searchWord) {
    let result = { error: 1, user_types: [] };
    let res = await db.doQuery(q_Auth.GET_USER_TYPE_LIST, ["%" + searchWord + "%"]);
    //se nao ocorreu nenhum erro a adquirir o resultado
    if (res.error === 0) {
        //se existem resultados
        if (res.res.length > 0) {
            //por cada utilizador
            res.res.forEach(ut => {
                result.user_types.push({id: ut.id,name: ut.type_user});
            });
            result.error = 0;
        }
    }
    //devolve resultado
    return result;
};

/**
 * Elimina um utilizador
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do utilizador a eliminar
 * @returns {boolean} se eliminado
 */
exports.deleteUser = async function (db,id) {
    let res = await db.doQuery(q_Auth.DELETE_USER, [id]);
    //se nao ocorreu nenhum erro e se foi apagado
    if (res.error === 0 && res.res.affectedRows > 0) {
        return true;
    }
    //devolve resultado
    return false;
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
    app.post(prefix + ROUTE_USER_PREFIX + '/register', async function (req, res) {
        let result = { error: 3, message: "Não tem permissões para registar utilizadores", res: {} };
        //recebe o utilizador autenticado
        let u = thiss.getUserFromSession(req);
        //verifica se ja existe o utilizador autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                result.error = 2;
                result.message = "Insira todos os campos obrigatórios";
                if (req.body.email && req.body.password && req.body.fullname && req.body.address && req.body.birthday && req.body.cellphone && req.body.title && req.body.qualifications && req.body.usertypeid) {
                    result.error = 1;
                    //indica que nãoi foi autenticado até verificar
                    result.message = "Ocorreu um erro no registo, verifique se todos os campos săo válidos";
                    //verifica os dados de autenticação
                    let resDb = await thiss.addNewUser(db, req.body.email, req.body.password, req.body.fullname, req.body.address, req.body.birthday, req.body.cellphone, req.body.usertypeid, req.body.title, req.body.qualifications);
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
    app.post(prefix + ROUTE_USER_PREFIX + '/delete', async function (req, res) {
        let result = { error: 3, message: "Não tem permissões para eliminar utilizadores", res: {} };
        //recebe o utilizador autenticado
        let u = thiss.getUserFromSession(req);
        //verifica se ja existe o utilizador autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                result.error = 2;
                result.message = "Insira todos os campos obrigatórios";
                if (req.body.id) {
                    result.error = 1;
                    //indica que nãoi foi autenticado até verificar
                    result.message = "Utilizador não encontrado";
                    //se foi eliminado
                    if (await thiss.deleteUser(db, req.body.id)) {
                        //guarda a session - nao é criada uma nova sessão
                        //thiss.setUserIntoSession(req, resDb.user);
                        //prepara resposta para cliente
                        result.error = 0;
                        result.message = "Eliminido com sucesso";
                    }
                }
            }

        }
        //define a resposta
        res.json(result);
    });
    app.post(prefix + ROUTE_USER_PREFIX + '/changepassword', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //recebe o utilizador autenticado
        let u = thiss.getUserFromSession(req);
        //verifica se ja existe o utilizador autenticado
        if (u) {
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.password && req.body.newpassword) {
                result.error = 1;
                //indica que nãoi foi autenticado até verificar
                result.message = "Password incorreta";
                //se foi alterada
                if (await thiss.changeUserPassword(db, u.id, req.body.password, req.body.newpassword) === 0) {
                    //guarda a session - nao é criada uma nova sessão
                    //thiss.setUserIntoSession(req, resDb.user);
                    //prepara resposta para cliente
                    result.error = 0;
                    result.message = "Password alterada com sucesso";
                }
            }
        }
        //define a resposta
        res.json(result);
    });
    app.post(prefix + ROUTE_USER_PREFIX + "/change", async function (req, res) {
        let result = { error: 3, message: "Não tem permissões para alterar o utilizador", res: {} };
        //recebe o utilizador autenticado
        let u = thiss.getUserFromSession(req);
        //verifica se ja existe o utilizador autenticado
        if (u) {
            if (u.type_user === infoDB.ADMIN_TYPE_NAME || !req.body.id || req.body.id === u.id+"") {
                result.error = 2;
                result.message = "Insira todos os campos obrigatórios";
                if (req.body.fullname && req.body.address && req.body.cellphone && req.body.title && req.body.qualifications) {
                    result.error = 1;
                    //indica que nãoi foi autenticado até verificar
                    result.message = "Ocorreu um erro na alteração do utilizador, verifique se todos os campos săo válidos";
                    let id = (u.type_user === infoDB.ADMIN_TYPE_NAME ? (!req.body.id ? u.id : req.body.id) : u.id) //se for admin pode ser o id que vem do cliente ou o id do proprio utilizador, se não for, só pode ser o id do próprio utilizador
                    let u_type = (u.type_user === infoDB.ADMIN_TYPE_NAME ? (!req.body.usertypeid ? u.id_type_user : req.body.usertypeid) : u.id_type_user); //se for admin, pode escolher o tipo de utilizador, se não mé obrigatóriamente o tipo de utilizador que estava
                    //verifica os dados de autenticação
                    let resDb = await thiss.changeUser(db,
                        id,
                        req.body.fullname,
                        req.body.address,
                        req.body.cellphone,
                        u_type,
                        req.body.title,
                        req.body.qualifications
                    );
                    //se foi autenticado com sucesso
                    if (!resDb.error) {
                        //guarda a session - nao é criada uma nova sessão
                        //thiss.setUserIntoSession(req, resDb.user);
                        //prepara resposta para cliente
                        result.error = 0;
                        result.message = "Alterado com sucesso";
                        if (u.id === id) {
                            u.full_name = req.body.fullname;
                            u.address = req.body.address;
                            u.cellphone = req.body.cellphone;
                            u.title = req.body.title;
                            u.qualifications = req.body.qualifications;
                            u.id_type_user = resDb.usertype.id;
                            u.type_user = resDb.usertype.name;
                            thiss.setUserIntoSession(req, u);
                        }
                    } else if (resDb.error === 1) {
                        result.message = "Esse utilizador não existe";
                    }
                }
            }

        }
        //define a resposta
        res.json(result);
    });
    app.post(prefix + ROUTE_USER_PREFIX + '/auth', async function (req, res) {
        let result = { error: 1, message: "Todos os campos săo obrigatórios", res: {} };
        //recebe o utilizador autenticado
        let u = thiss.getUserFromSession(req);
        //verifica se ja existe o utilizador autenticado
        if (u) {
            result.message = "Utilizador já se encontra autenticado";
            result.error = 0;
            result.res = u.getJSON();
        } else if (req.body.email && req.body.password) { //verifica se estão todos os parametros
            //indica que não foi autenticado até verificar
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

    app.get(prefix + ROUTE_USER_PREFIX + '/info', async function (req, res) {
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

    app.get(prefix + ROUTE_USER_PREFIX + '/logout', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 0, message: "Sessão terminada com sucesso", res: {} };
        thiss.removeUserFromSession(req);
        //define a resposta
        res.json(result);
    });


    app.get(prefix + ROUTE_USER_PREFIX + '/list', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 1, message: "Não tem permissões para listar utilizadores", res: { users: [] } };
        //carrega os dados em sessão do utilizador
        let u = thiss.getUserFromSession(req);
        //verifica se está autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                let resultDb = await thiss.geUserList(db, !req.query.search ? "" : req.query.search);
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

    app.get(prefix + ROUTE_USER_TYPE_PREFIX +'/list', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 1, message: "Não tem permissões para listar tipos de utilizador", res: { user_types: [] } };
        //carrega os dados em sessão do utilizador
        let u = thiss.getUserFromSession(req);
        //verifica se está autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                let resultDb = await thiss.getUserTypeList(db, !req.query.search ? "" : req.query.search);
                result.error = 0;
                result.message = "Lista de tipos de utilizador";
                result.res.user_types = resultDb.user_types;
            }
        }
        //define a resposta
        res.json(result);
    });

    app.post(prefix + ROUTE_USER_TYPE_PREFIX + '/create', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 3, message: "Não tem permissões para adicionar tipos de utilizador", res: {} };
        //carrega os dados em sessão do utilizador
        let u = thiss.getUserFromSession(req);
        //verifica se está autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                result.error = 2;
                result.message="Insira todos os campos obrigatórios";
                //verifica se estão todos os campos definidos
                if (req.body.name) {
                    if (await thiss.addNewUserType(db, req.body.name)) {
                        result.error = 0;
                        result.message = "Tipo de utilizador adicionado com sucesso";
                    } else {
                        result.error = 1;
                        result.message = "Ocorreu um erro, provavelmente esse tipo de utilizador já existe";
                    }
                }
            }
        }
        //define a resposta
        res.json(result);
    });

    app.post(prefix + ROUTE_USER_TYPE_PREFIX + '/change', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 3, message: "Não tem permissões para alterar tipos de utilizador", res: {} };
        //carrega os dados em sessão do utilizador
        let u = thiss.getUserFromSession(req);
        //verifica se está autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                result.error = 2;
                result.message="Insira todos os campos obrigatórios";
                //verifica se estão todos os campos definidos
                if (req.body.id && req.body.name) {
                    if (await thiss.changerUserType(db, req.body.id, req.body.name)) {
                        result.error = 0;
                        result.message = "Tipo de utilizador alterado com sucesso";
                    } else {
                        result.error = 1;
                        result.message = "Ocorreu um erro, provavelmente o nome dado já existe";
                    }
                }
            }
        }
        //define a resposta
        res.json(result);
    });

    app.post(prefix + ROUTE_USER_TYPE_PREFIX + '/delete', async function (req, res) {
        //prepara resposta para cliente
        let result = { error: 4, message: "Não tem permissões para eliminar tipos de utilizador", res: {} };
        //carrega os dados em sessão do utilizador
        let u = thiss.getUserFromSession(req);
        //verifica se está autenticado
        if (u) {
            //verifica se este é administrador
            if (u.type_user === infoDB.ADMIN_TYPE_NAME) {
                result.error = 3;
                result.message = "Insira todos os campos obrigatórios";
                //verifica se estão todos os campos definidos
                if (req.body.id) {
                    switch (await thiss.deleteUserType(db, req.body.id)) {
                        case 0:
                            result.error = 0;
                            result.message = "Tipo de utilizador eliminado com sucesso";
                            break;
                        case 2:
                            result.error = 2;
                            result.message = "Ocorreu um erro, provavelmente existem utilizadores associados a este tipo";
                            break;
                        default:
                            result.error = 1;
                            result.message = "Esse tipo de utilizador não foi encontrado";
                    }
                }
            }
        }
        //define a resposta
        res.json(result);
    });
};