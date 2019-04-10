const database = require('./DataBase.js');
const user = require('./User.js');
const auth = require('./Auth.js');
const q_DataSheet = require('./queries/q_DataSheet.js');

const ROUTE_USER_PREFIX = "/datasheet";

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} search palavra para pesquisar no nome da ficha tecnica
 * @returns {JSON} {error: <0 se não ocorrer erro, 1 se ocorrer erro>, list:[<objetos>]}
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
    app.post(prefix + ROUTE_USER_PREFIX + '/createandedit', async function (req, res) {
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

    app.get(prefix + ROUTE_USER_PREFIX + '/list', async function (req, res) {
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
};