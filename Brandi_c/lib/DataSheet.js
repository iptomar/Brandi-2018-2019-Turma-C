const database = require('./DataBase.js');
const user = require('./User.js');
const infoDB = require('./InfoDB.js');
const auth = require('./Auth.js');
const q_DataSheet = require('./queries/q_Datasheet.js');

const ROUTE_DATASHEET_PREFIX = "/datasheet";
const ROUTE_CATEGORIES_PREFIX = ROUTE_DATASHEET_PREFIX + "/categories";
const ROUTE_SUPER_CATEGORIES_PREFIX = ROUTE_DATASHEET_PREFIX + "/super_categories";
const ROUTE_SUB_CATEGORIES_PREFIX = ROUTE_DATASHEET_PREFIX + "/sub_categories";

/**
 * lista super categorias
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} search palavra para pesquisar no nome da ficha tecnica
 * @returns {JSON} {error: <0 se não ocorrer erro, 1 se ocorrer erro>, list:[<objetos>]}
 */
async function listSuperCategories(db, search) {
    let result = { error: 1, list: [] };
    //listagem de objetos
    let resultDb = await db.doQuery(q_DataSheet.LIST_SUPER_CATEGORY, ["%" + search + "%"]);
    //se não ocorreu nenhum erro
    if (!resultDb.error) {
        result.error = 0;
        //devolvemos a lista de fichas tecnicas
        result.list = resultDb.res;
    }
    return result;
}


/**
 * lista categorias de uma super categoria
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} search palavra para pesquisar no nome da ficha tecnica
 * @param {number} id_super_category palavra para pesquisar no nome da ficha tecnica
 * @returns {JSON} {error: <0 se não ocorrer erro, 1 se ocorrer erro>, list:[<objetos>]}
 */
async function listCategories(db, id_super_category, search) {
    let result = { error: 1, list: [] };
    //listagem de objetos
    let resultDb = await db.doQuery(q_DataSheet.LIST_CATEGORY, [id_super_category,"%" + search + "%"]);
    //se não ocorreu nenhum erro
    if (!resultDb.error) {
        result.error = 0;
        //devolvemos a lista de fichas tecnicas
        result.list = resultDb.res;
    }
    return result;
}

/**
 * lista sub categorias de uma categoria
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} search palavra para pesquisar no nome da ficha tecnica
 * @param {number} id_super_category palavra para pesquisar no nome da ficha tecnica
 * @returns {JSON} {error: <0 se não ocorrer erro, 1 se ocorrer erro>, list:[<objetos>]}
 */
async function listSubCategories(db, id_category, search) {
    let result = { error: 1, list: [] };
    //listagem de objetos
    let resultDb = await db.doQuery(q_DataSheet.LIST_SUB_CATEGORY, [id_category,"%" + search + "%"]);
    //se não ocorreu nenhum erro
    if (!resultDb.error) {
        result.error = 0;
        //devolvemos a lista de fichas tecnicas
        result.list = resultDb.res;
    }
    return result;
}


/**
 * cria uma nova super categoria
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} name nome da super categoria
 * @returns {number} id da super categoria ou -1 caso ocorra erro, -2 caso o nome ja exista
 */
async function createSuperCategory(db, name) {
    let result = -1;
    //procura super categoria se existe
    let searchCat = await db.doQuery(q_DataSheet.GET_SUPER_CATEGORY, [name]);
    if(!searchCat.error) {
        if(searchCat.res.length === 0) {
            //criação do novo objeto
            let resultDb = await db.doQuery(q_DataSheet.CREATE_SUPER_CATEGORY, [name]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.insertId;
            }
        }else result = -2;
    }
    return result;
}

/**
 * cria uma nova categoria
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} id_super_category id da supercategoria
 * @param {string} name nome da categoria
 * @returns {number} id da categoria ou -1 caso ocorra erro, -2 caso o nome ja exista
 */
async function createCategory(db, id_super_category,name) {
    let result = -1;
    //procura super categoria se existe
    let searchCat = await db.doQuery(q_DataSheet.GET_CATEGORY, [id_super_category, name]);
    if(!searchCat.error) {
        if(searchCat.res.length === 0) {
            //criação do novo objeto
            let resultDb = await db.doQuery(q_DataSheet.CREATE_CATEGORY, [name,id_super_category]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.insertId;
            }
        }else result = -2;
    }
    return result;
}

/**
 * cria uma nova sub categoria
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} id_category id da categoria
 * @param {string} name nome da sub categoria
 * @returns {number} id da sub categoria ou -1 caso ocorra erro, -2 caso o nome ja exista
 */
async function createSubCategory(db, id_category,name) {
    let result = -1;
        //procura super categoria se existe
        let searchCat = await db.doQuery(q_DataSheet.GET_SUB_CATEGORY, [id_category,name]);
        if(!searchCat.error) {
            if(searchCat.res.length === 0) {
                //criação do novo objeto
                let resultDb = await db.doQuery(q_DataSheet.CREATE_SUB_CATEGORY, [name, id_category]);
                //se não ocorreu nenhum erro, devolve o id inserido
                if (!resultDb.error) {
                    result = resultDb.res.insertId;
                }
            }else result = -2;
        }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da supercategoria
 * @param {string} name nome da supercategoria
 * @returns {number} 0 se nao ocorrer erro ou -1 caso ocorra erro, -2 caso o nome ja exista
 */
async function changeSuperCategory(db, id, name) {
    let result = -1;
    //procura super categoria se existe
    let searchCat = await db.doQuery(q_DataSheet.GET_SUPER_CATEGORY, [name]);
    if(!searchCat.error) {
        if(searchCat.res.length > 0 && searchCat.res[0].id + "" === id) {
            result=0;
        }else if(searchCat.res.length === 0) {
            //criação do novo objeto
            let resultDb = await db.doQuery(q_DataSheet.UPDATE_SUPER_CATEGORY, [name,id]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.affectedRows > 0 ? 0 : -1;
            }
        }else result = -2;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da categoria
 * @param {string} name nome da categoria
 * @returns {number} 0 se nao ocorrer erro ou -1 caso ocorra erro, -2 caso o nome ja exista
 */
async function changeCategory(db, id, name) {
    let result = -1;
    //procura super categoria se existe
    let searchCat = await db.doQuery(q_DataSheet.CHECK_CATEGORY_NAME_TO_CHANGE, [id,name]);
    if(!searchCat.error) {
        if(searchCat.res.length > 0 && searchCat.res[0].id + "" === id) {
            result=0;
        }else if(searchCat.res.length === 0) {
                //criação do novo objeto
                let resultDb = await db.doQuery(q_DataSheet.UPDATE_CATEGORY, [name,id]);
                //se não ocorreu nenhum erro, devolve o id inserido
                if (!resultDb.error) {
                    result = resultDb.res.affectedRows > 0 ? 0 : -1;
                }
        }else result = -2;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da Subcategoria
 * @param {string} name nome da Subcategoria
 * @returns {number} 0 se nao ocorrer erro ou -1 caso ocorra erro, -2 caso o nome ja exista
 */
async function changeSubCategory(db, id, name) {
    let result = -1;
    //procura super categoria se existe
    let searchCat = await db.doQuery(q_DataSheet.CHECK_SUB_CATEGORY_NAME_TO_CHANGE, [id,name]);
    if(!searchCat.error) {
        if(searchCat.res.length > 0 && searchCat.res[0].id + "" === id) {
            result=0;
        }else if(searchCat.res.length === 0) {
            //criação do novo objeto
            let resultDb = await db.doQuery(q_DataSheet.UPDATE_SUB_CATEGORY, [name,id]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.affectedRows > 0 ? 0 : -1;
            }
        } else result = -2;
    }
    return result;
}


/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da supercategoria
 * @returns {number} 0 se nao ocorrer erro ou -1 caso ocorra erro, -2 caso esteja ser utilizado
 */
async function deleteSuperCategory(db, id) {
    let result = -1;
    //procura super categoria se esta a ser utiliozada
    let searchCat = await db.doQuery(q_DataSheet.CHECK_IF_USED_SUPER_CATEGORY, [id]);
    if(!searchCat.error) {
        if(searchCat.res.length === 0) {
            //criação do novo objeto
            let resultDb = await db.doQuery(q_DataSheet.DELETE_SUPER_CATEGORY, [id]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.affectedRows > 0 ? 0 : -1;
            }
        }else result = -2;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da categoria
 * @returns {number} 0 se nao ocorrer erro ou -1 caso ocorra erro, -2 caso esteja ser utilizado
 */
async function deleteCategory(db, id) {
    let result = -1;
    //procura se a categoria se esta a ser utilizada
    let searchCat = await db.doQuery(q_DataSheet.CHECK_IF_USED_CATEGORY, [id]);
    if(!searchCat.error) {
        if(searchCat.res.length === 0) {
            //criação do novo objeto
            let resultDb = await db.doQuery(q_DataSheet.DELETE_CATEGORY, [id]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.affectedRows > 0 ? 0 : -1;
            }
        }else result = -2;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da sub categoria
 * @returns {number} 0 se nao ocorrer erro ou -1 caso ocorra erro, -2 caso esteja ser utilizado
 */
async function deleteSubCategory(db, id) {
    let result = -1;
    //procura se a sub categoria se esta a ser utilizada
    let searchCat = await db.doQuery(q_DataSheet.CHECK_IF_USED_SUB_CATEGORY, [id]);
    if(!searchCat.error) {
        if(searchCat.res.length === 0) {
            //criação do novo objeto
            let resultDb = await db.doQuery(q_DataSheet.DELETE_SUB_CATEGORY, [id]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.affectedRows > 0 ? 0 : -1;
            }
        }else result = -2;
    }
    return result;
}


/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} search palavra para pesquisar no nome da ficha tecnica
 * @returns {JSON} {error: <0 se não ocorrer erro, 1 se ocorrer erro>, list:[<objects>]}
 */
async function listDataSheet(db, search) {
    let result = { error: 1, list: [] };
    //listagem de objetos
    let resultDb = await db.doQuery(q_DataSheet.LIST_OBJECT, ["%" + search + "%"]);
    //se não ocorreu nenhum erro
    if (!resultDb.error) {
        result.error = 0;
        //devolvemos a lista de fichas tecnicas
        result.list = resultDb.res;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da ficha técnica
 * @param {string} designation designação do objeto
 * @param {string} cearcproc processo CEARC
 * @param {string} cearcprocdata data do processo CEARC
 * @param {string} cearcentrancedata data de entrada CEARC
 * @param {string} lcrmproc processo LCRM
 * @param {string} lcrmprocdata data do processo LCRM
 * @param {string} lcrmentrancedata data de entrada LCRM
 * @param {number} coordinatorid id do coordenador
 * @param {number} userId id do utilizador autenticado
 * @returns {boolean} se foi atualizado alguma coisa
 */
async function changeDataSheet(db, id, designation, cearcproc, cearcprocdata, cearcentrancedata, lcrmproc, lcrmprocdata, lcrmentrancedata, coordinatorid, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT, [designation, cearcproc, cearcprocdata, cearcentrancedata, lcrmproc, lcrmprocdata, lcrmentrancedata, coordinatorid, userId,id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} designation designação do objeto
 * @param {string} cearcproc processo CEARC
 * @param {string} cearcprocdata data do processo CEARC
 * @param {string} cearcentrancedata data de entrada CEARC
 * @param {string} lcrmproc processo LCRM
 * @param {string} lcrmprocdata data do processo LCRM
 * @param {string} lcrmentrancedata data de entrada LCRM
 * @param {number} coordinatorid id do coordenador
 * @param {number} userId id do utilizador autenticado
 * @returns {number} id da ficha técnica ou -1 caso ocorra erro
 */
async function createDataSheet(db, designation, cearcproc, cearcprocdata, cearcentrancedata, lcrmproc, lcrmprocdata, lcrmentrancedata ,coordinatorid, userId) {
    let result = -1;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.CREATE_OBJECT, [designation, cearcproc, cearcprocdata, cearcentrancedata, lcrmproc, lcrmprocdata, lcrmentrancedata, coordinatorid, userId]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.insertId;
    }
    return result;
}

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
    app.post(prefix + ROUTE_DATASHEET_PREFIX + '/createandedit', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (/**req.body.idobject && **/ req.body.designation && /**req.body.lcrmproc && req.body.lcrmprocdata && req.body.cearcprocdata && req.body.cearcentrancedata**/ req.body.cearcproc && req.body.coordinatorid && req.body.lcrmentrancedata) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //todos os campos não obrigatórios ficam como null caso não estejam definidos
                req.body.cearcprocdata = !req.body.cearcprocdata ? null : req.body.cearcprocdata;
                req.body.cearcentrancedata = !req.body.cearcentrancedata ? null : req.body.cearcentrancedata;
                req.body.lcrmproc = !req.body.lcrmproc ? null : req.body.lcrmproc;
                req.body.lcrmprocdata = !req.body.lcrmprocdata ? null : req.body.lcrmprocdata;
                //verifica se é para editar ou para criar
                if (req.body.idobject) {//se o id estiver definido é porque é para criar
                    //tenta altearar um objeto e se este foi alterado
                    if (await changeDataSheet(db, req.body.idobject, req.body.designation, req.body.cearcproc, req.body.cearcprocdata, req.body.cearcentrancedata, req.body.lcrmproc, req.body.lcrmprocdata, req.body.lcrmentrancedata, req.body.coordinatorid, u.id)) {
                        result.error = 0;
                        result.message = "Ficha técnica atualizada com sucesso";
                        //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                        result.res = { id: parseInt(req.body.idobject, 10), type: 1 };
                    }
                } else {
                    //tenta criar um novo objeto
                    let resultInsertId = await createDataSheet(db,req.body.designation, req.body.cearcproc, req.body.cearcprocdata, req.body.cearcentrancedata, req.body.lcrmproc, req.body.lcrmprocdata, req.body.lcrmentrancedata, req.body.coordinatorid, u.id);
                    //se este foi criado
                    if (resultInsertId !== -1) {
                        result.error = 0;
                        result.message = "Ficha técnica criada com sucesso";
                        //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                        result.res = { id: resultInsertId, type: 0};
                    }
                }
                
            }
        }
        res.json(result);
    });

    app.get(prefix + ROUTE_DATASHEET_PREFIX + '/list', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: { datasheets: [] } };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //caso ocorra algum tipo de erro
            result.error = 1;
            result.message = "Ocorreu um erro na aquisição da lista, por favor tente novamente";
            //lista fichas técnicas
            let resultList = await listDataSheet(db, !req.query.search ? "" : req.query.search);
            //verifica se ocorreu algum erro
            if (!resultList.error) {
                result.error = 0;
                result.message = "Lista de fichas técnicas";
                result.res.datasheets = resultList.list;
            }
        }
        res.json(result);
    });

    app.get(prefix + ROUTE_CATEGORIES_PREFIX + '/list', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: { categories: [] } };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //caso nao insira o id da categoria
            result.error = 2;
            result.message = "O id da super categoria é obrigatório";
            if(req.query.super_category) {
                //caso ocorra algum tipo de erro
                result.error = 1;
                result.message = "Ocorreu um erro na aquisição da lista, por favor tente novamente";
                //lista fichas técnicas
                let resultList = await listCategories(db, req.query.super_category, !req.query.search ? "" : req.query.search);
                //verifica se ocorreu algum erro
                if (!resultList.error) {
                    result.error = 0;
                    result.message = "Lista de categorias";
                    result.res.categories = resultList.list;
                }
            }
        }
        res.json(result);
    });

    app.get(prefix + ROUTE_SUB_CATEGORIES_PREFIX + '/list', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: { sub_categories: [] } };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //caso nao insira o id da categoria
            result.error = 2;
            result.message = "O id da categoria é obrigatório";
            if(req.query.category) {
                //caso ocorra algum tipo de erro
                result.error = 1;
                result.message = "Ocorreu um erro na aquisição da lista, por favor tente novamente";
                //lista fichas técnicas
                let resultList = await listSubCategories(db, req.query.category, !req.query.search ? "" : req.query.search);
                //verifica se ocorreu algum erro
                if (!resultList.error) {
                    result.error = 0;
                    result.message = "Lista de sub categorias";
                    result.res.sub_categories = resultList.list;
                }
            }
        }
        res.json(result);
    });

    app.get(prefix + ROUTE_SUPER_CATEGORIES_PREFIX + '/list', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: { super_categories: [] } };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //caso ocorra algum tipo de erro
            result.error = 1;
            result.message = "Ocorreu um erro na aquisição da lista, por favor tente novamente";
            //lista fichas técnicas
            let resultList = await listSuperCategories(db, !req.query.search ? "" : req.query.search);
            //verifica se ocorreu algum erro
            if (!resultList.error) {
                result.error = 0;
                result.message = "Lista de super categorias";
                result.res.super_categories = resultList.list;
            }
        }
        res.json(result);
    });


    app.post(prefix + ROUTE_SUPER_CATEGORIES_PREFIX + '/create', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para criar super categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.name) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await createSuperCategory(db,req.body.name);
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Super categoria criada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Já existe uma super categoria com esse nome";
                }
            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_CATEGORIES_PREFIX + '/create', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para criar categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.name && req.body.id_super_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await createCategory(db,req.body.id_super_category, req.body.name);
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Categoria criada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId};
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Já existe uma categoria com esse nome associada a super categoria indicada";
                }
            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_SUB_CATEGORIES_PREFIX + '/create', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para criar sub categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.name && req.body.id_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await createSubCategory(db,req.body.id_category, req.body.name);
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Sub categoria criada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId};
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Já existe uma sub categoria com esse nome associada a categoria indicada";
                }
            }
        }
        res.json(result);
    });


    app.post(prefix + ROUTE_SUB_CATEGORIES_PREFIX + '/change', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para alterar sub categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.name && req.body.id_sub_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await changeSubCategory(db,req.body.id_sub_category, req.body.name);
                //se este foi criado
                if (!resultInsertId) {
                    result.error = 0;
                    result.message = "Sub categoria alterada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: req.body.id_sub_category};
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Já existe uma sub categoria com esse nome associada a categoria indicada";
                }
            }
        }
        res.json(result);
    });


    app.post(prefix + ROUTE_CATEGORIES_PREFIX + '/change', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para alterar categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.name && req.body.id_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await changeCategory(db,req.body.id_category, req.body.name);
                //se este foi criado
                if (!resultInsertId) {
                    result.error = 0;
                    result.message = "Categoria alterada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: req.body.id_category };
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Já existe uma Categoria com esse nome associada a super categoria indicada";
                }
            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_SUPER_CATEGORIES_PREFIX + '/change', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para alterar super categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.name && req.body.id_super_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await changeSuperCategory(db, req.body.id_super_category, req.body.name);
                //se este foi criado
                if (!resultInsertId) {
                    result.error = 0;
                    result.message = "Super Categoria alterada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: req.body.id_super_category };
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Já existe uma Super Categoria com esse nome";
                }
            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_SUPER_CATEGORIES_PREFIX + '/delete', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para eliminar super categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.id_super_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await deleteSuperCategory(db, req.body.id_super_category);
                //se este foi criado
                if (!resultInsertId) {
                    result.error = 0;
                    result.message = "Super Categoria eliminada com sucesso";
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Essa super categoria está ja em utilização, é impossivel de eliminar a mesma";
                }
            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_CATEGORIES_PREFIX + '/delete', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para eliminar categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.id_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await deleteCategory(db, req.body.id_category);
                //se este foi criado
                if (!resultInsertId) {
                    result.error = 0;
                    result.message = "Categoria eliminada com sucesso";
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Essa categoria está ja em utilização, é impossivel de eliminar a mesma";
                }
            }
        }
        res.json(result);
    });

    
    app.post(prefix + ROUTE_SUB_CATEGORIES_PREFIX + '/delete', async function (req, res) {
        let result = { error: 4, message: "Não tem permissões para eliminar sub categorias", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u && u.type_user === infoDB.ADMIN_TYPE_NAME) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            if ( req.body.id_sub_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await deleteSubCategory(db, req.body.id_sub_category);
                //se este foi criado
                if (!resultInsertId) {
                    result.error = 0;
                    result.message = "Sub Categoria eliminada com sucesso";
                }else if(resultInsertId == -2) {
                    result.error=2;
                    result.message="Essa sub categoria está ja em utilização, é impossivel de eliminar a mesma";
                }
            }
        }
        res.json(result);
    });

};