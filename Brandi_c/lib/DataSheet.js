﻿const database = require('./DataBase.js');
const user = require('./User.js');
const infoDB = require('./InfoDB.js');
const auth = require('./Auth.js');
const q_DataSheet = require('./queries/q_Datasheet.js');
const path = require("path");
const fs = require("fs");
const global = require('./Global');
const formidable = require('formidable');

const ROUTE_DATASHEET_PREFIX = "/datasheet";
const ROUTE_CATEGORIES_PREFIX = ROUTE_DATASHEET_PREFIX + "/categories";
const ROUTE_SUPER_CATEGORIES_PREFIX = ROUTE_DATASHEET_PREFIX + "/super_categories";
const ROUTE_SUB_CATEGORIES_PREFIX = ROUTE_DATASHEET_PREFIX + "/sub_categories";


const ROUTE_CONTACTS_PREFIX = ROUTE_DATASHEET_PREFIX + "/contacts";
const ROUTE_SOURCES_PREFIX = ROUTE_DATASHEET_PREFIX + "/sources";
const ROUTE_TESTS_PREFIX = ROUTE_DATASHEET_PREFIX + "/tests";
const ROUTE_WORKSHEET_PREFIX = ROUTE_DATASHEET_PREFIX + "/worksheet";
const ROUTE_SOLUBILITY_PREFIX = ROUTE_DATASHEET_PREFIX + "/solubility";
const ROUTE_SOLUBTESTS_PREFIX = ROUTE_DATASHEET_PREFIX + "/solvent";


/*
 * testes -------------------------------------------------------------------------
 * /


/**
 *
 * lista Exames
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id_object id do objeto associado
 * @param {string} search palavra pesquisa
 * @returns {Array<Sources>} [<exames>]
 */
async function listTests(db, id_object, search) {
    let s = "%" + search + "%";
    //lista tests
    let resultDb = await db.doQuery(q_DataSheet.LIST_TESTS, [id_object,s,s,s,s,s]);
    //se não ocorreu nenhum erro, devolve lista
    if (!resultDb.error) {
        return resultDb.res;
    }
    return [];
}




/**
 * 
 * Cria um exame
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} object_id id do objeto associado
 * @param {string} type_reference tipo de referencia
 * @param {string} location localização do exame
 * @param {string} objectives objetivos do exame
 * @param {number} technician técnico do exame
 * @param {string} results resultados do exame
 */
async function createTests(db, id_object, type_reference, location, objectives, technician, results) {
    let result = -1;
    //procura exame se existe
    let checkObjecto = await db.doQuery(q_DataSheet.CHECK_OBJECT, [id_object]);
    if (!checkObjecto.error) {
        if (checkObjecto.res.length > 0) {
            //criação do novo exame
            let resultDb = await db.doQuery(q_DataSheet.CREATE_TESTS, [id_object, type_reference, location, objectives, technician, results]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.insertId;
            }
        } else result = -2;
    }
    return result;
}

/**
 * Edita o exame
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} object_id id do objeto associado
 * @param {string} type_reference tipo de referencia
 * @param {string} location localização do exame
 * @param {string} objectives objetivos do exame
 * @param {number} technician técnico do exame
 * @param {string} results resultados do exame
 * @returns {number} id do exame ou -1 caso ocorra erro, -2 caso o objeto nao exista
 */
async function changeTests(db, id, type_reference, location, objectives, technician, results) {
    let result = -1;
    //alteração do novo exame
    let resultDb = await db.doQuery(q_DataSheet.CHANGE_TESTS, [type_reference, location, objectives, technician, results, id]);
    //se não ocorreu nenhum erro
    if (!resultDb.error) {
        result = 0;
    }
    return result;
}
  

/**
 * apaga exame
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id do exame
 * @returns {number} 0 caso nao ocorra nenhum erro ou -1 caso ocorra erro
 */
async function deleteTests(db, id) {
    let result = -1;
    //criação do novo exame
    let resultDb = await db.doQuery(q_DataSheet.DELETE_TESTS, [id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0 ? 0 : -1;
    }
    return result;
}


/**
 *busca exame
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id do exame
 * @returns {JSON} {<exame>}
 */
async function getTest(db, id) {
    //procura Exame
    let resultDb = await db.doQuery(q_DataSheet.GET_TESTS, [id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error && resultDb.res.length > 0) {
        return resultDb.res[0];
    }
    return null;
}




















/*
 * FIM FIM  FIM FIM testes -------------------------------------------------------------------------
 * /

/*
 * Folha de Obra -------------------------------------------------------------------------
 * /
 
 
 
 
/**
 * lista worksheet
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id_object id do objeto associado
 * @returns {Array<Sourdces>} [<Folhas de Obra>]
 */
async function listWorksheet(db, id_object, search) {
    let s = "%" + search + "%";
    //lista folhas de obra
    let resultDb = await db.doQuery(q_DataSheet.LIST_WORKSHEET, [id_object,s,s]);
    //se não ocorreu nenhum erro, devolve lista
    if (!resultDb.error) {
        return resultDb.res;
    }
    return [];
}


/**
 * Edita a folha
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} object_id id do objeto associado
 * @param {Date} worksheet_date data da folha de obra
 * @param {string} procedure_type tipo de procedimento
 * @param {string} observations observações
 * @param {string} materials materiais da obra
 * @param {number} amount quantidades
 * @param {number} duration duração do processo
 * @param {number} technician técnico da obra
 * @returns {number} id do exame ou -1 caso ocorra erro, -2 caso o objeto nao exista
 */
async function changeWorksheet(db, id, worksheet_date, procedure_type, observations, materials, amount, duration, technician) {
    let result = -1;
    //alteração da folha
    let resultDb = await db.doQuery(q_DataSheet.CHANGE_WORKSHEET, [worksheet_date, procedure_type, observations, materials, amount, duration, technician, id]);
    //se não ocorreu nenhum erro
    if (!resultDb.error) {
        result = 0;
    }
    return result;
}



/**
 * 
 * Cria uma folha de obra
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} object_id id do objeto associado
 * @param {Date} worksheet_date data da folha de obra
 * @param {string} procedure_type tipo de procedimento
 * @param {string} observations observações 
 * @param {string} materials materiais da obra
 * @param {number} amount quantidades
 * @param {number} duration duração do processo
 * @param {number} technician técnico da obra
 */
async function createWorksheet(db, id_object, worksheet_date, procedure_type, observations, materials, amount, duration, technician) {
    let result = -1;
    //procura exame se existe
    let checkObjecto = await db.doQuery(q_DataSheet.CHECK_OBJECT, [id_object]);
    if (!checkObjecto.error) {
        if (checkObjecto.res.length > 0) {
            //criação do novo exame
            let resultDb = await db.doQuery(q_DataSheet.CREATE_WORKSHEET, [id_object, worksheet_date, procedure_type, observations, materials, amount, duration, technician]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.insertId;
            }
        } else result = -2;
    }
    return result;
}


/**
 * apaga folha de obra
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id da folha de obra
 * @returns {number} 0 caso nao ocorra nenhum erro ou -1 caso ocorra erro
 */
async function deleteWorksheet(db, id) {
    let result = -1;
    //criação do novo exame
    let resultDb = await db.doQuery(q_DataSheet.DELETE_WORKSHEET, [id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0 ? 0 : -1;
    }
    return result;
}

/**
 *busca folha de obra
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id da folha de obra
 * @returns {JSON} {<Folhas de Obra>}
 */
async function getWorksheet(db, id) {
    //procura Exame
    let resultDb = await db.doQuery(q_DataSheet.GET_WORKSHEET, [id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error && resultDb.res.length > 0) {
        return resultDb.res[0];
    }
    return null;
}


/*
 * FIM FIM  FIM FIM Folha de Obra -------------------------------------------------------------------------
 * /


/*
 * Testes de solubilidade -------------------------------------------------------------------------
 * /

/**
 * lista Teste de solubilidade
 *
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id_object id do objeto associado
 * @returns {Array<Sourdces>} [<Testes de solubilidade>]
 */
async function listSolubility(db, object_id, search) {
    let s = "%" + search + "%";
    //lista Testes de solubilidade
    let resultDb = await db.doQuery(q_DataSheet.LIST_SOLUBILITY, [object_id, s, s]);
    //se não ocorreu nenhum erro, devolve lista
    if (!resultDb.error) {
        return resultDb.res;
    }
    return [];
}


/**
 * cria Teste de solubilidade
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} object_id - id do objeto associado
 * @param {string} description - descrição do teste
 * @param {string} features características
 * @param {number} technician técnico do teste
 * @param {Date} solub_date data do teste
 */
async function createSolubility(db, object_id, description, features, technician, solub_date) {
    let result = -1;
    //procura teste se existe
    let checkObjecto = await db.doQuery(q_DataSheet.CHECK_OBJECT, [object_id]);
    if (!checkObjecto.error) {
        if (checkObjecto.res.length > 0) {
            //criação do novo teste
            let resultDb = await db.doQuery(q_DataSheet.CREATE_SOLUBILITY, [object_id, description, features, technician, solub_date]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.insertId;
            }
        } else result = -2;
    }
    return result;
}

/*
 * FIM  Testes de solubilidade -------------------------------------------------------------------------
 * /



/*
 * Testes de solvente -------------------------------------------------------------------------
 /



/**
 * lista Teste de solvente
 *
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id_object id do objeto associado
 * @returns {Array<Sourdces>} [<Testes de solvente>]
 */
async function listSolvent(db, tbl_solubilityid, search) {
    let s = "%" + search + "%";
    //lista Testes de solvente
    let resultDb = await db.doQuery(q_DataSheet.LIST_SOLUBTESTS, [tbl_solubilityid, s, s]);
    //se não ocorreu nenhum erro, devolve lista
    if (!resultDb.error) {
        return resultDb.res;
    }
    return [];
}


/**
 * cria Teste de solvente
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} tbl_solubilityid - id do objeto associado
 * @param {string} solvent - solvente utilizado no teste
 * @param {number} efficiency - eficiência do teste
 * @param {string} observations - observações do teste de solvente
 */
async function createSolvent(db, tbl_solubilityid, solvent, efficiency, observations) {
    let result = -1;
    //procura teste se existe
    let checkObjecto = await db.doQuery(q_DataSheet.CHECK_SOLUBILITY, [tbl_solubilityid]);
    if (!checkObjecto.error) {
        if (checkObjecto.res.length > 0) {
            //criação do novo teste
            let resultDb = await db.doQuery(q_DataSheet.CREATE_SOLUBTESTS, [tbl_solubilityid, solvent, efficiency, observations]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.insertId;
            }
        } else result = -2;
    }
    return result;
}

/*
 * FIM  Testes de solvente -------------------------------------------------------------------------
 * /



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
 * lista super categorias
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da datasheet
 * @returns {JSON} {error: <0 se não ocorrer erro, 1 se ocorrer erro>, datasheet:<objeto>}
 */
async function getDatasheet(db, id) {
    let result = { error: 1, datasheet: null };
    //get objeto
    let resultDb = await db.doQuery(q_DataSheet.GET_OBJECT, [id]);
    //se não ocorreu nenhum erro
    if (!resultDb.error && resultDb.res.length > 0) {
        result.error = 0;
        //devolvemos a ficha tecnica
        result.datasheet = resultDb.res[0];
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
 * 
 *
 * cria um contacto
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} full_name nome da pessoa
 * @param {string} address morada da pessoa
 * @param {string} email email da pessoa
 * @param {string} phone numero de telemovel da pessoa
 * @returns {number} id do contacto ou -1 caso ocorra erro, -2 caso o email ja exista, -3 caso o contacto ja exista, -4 caso o nome ja exista
 */
async function createContact(db,full_name, address, email, phone) {
    let result = -1;
    //procura contacto se existe
    let searchContact = await db.doQuery(q_DataSheet.SEARCH_CONTACT_1, [full_name, email, phone]);
    if (!searchContact.error) {
        if (searchContact.res.length === 0) {
            //criação do novo contacto
            let resultDb = await db.doQuery(q_DataSheet.CREATE_CONTACT, [full_name, address, email, phone]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.insertId;
            }
        } else {
            if (searchContact.res[0].phone.toLowerCase() === phone.toLowerCase()) result = -3;
            else if (searchContact.res[0].email.toLowerCase() === email.toLowerCase()) result = -2;
            else if (searchContact.res[0].full_name.toLowerCase() === full_name.toLowerCase()) result = -4;
        }
    }
    return result;
}

/**
 * 
 * altera um contacto
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do contacto da pessoa
 * @param {string} full_name nome da pessoa
 * @param {string} address morada da pessoa
 * @param {string} email email da pessoa
 * @param {string} phone numero de telemovel da pessoa
 * @returns {number} 0 se correr tudo como planeado ou -1 caso ocorra erro, -2 caso o email ja exista, -3 caso o contacto ja exista, -4 caso o nome ja exista
 */
async function changeContact(db, id, full_name, address, email, phone) {
    let result = -1;
    //procura contacto se existe
    let searchContact = await db.doQuery(q_DataSheet.SEARCH_CONTACT_CHANGE_1, [full_name, email, phone, id]);
    if (!searchContact.error) {
        if (searchContact.res.length === 0) {
            //altera contacto
            let resultDb = await db.doQuery(q_DataSheet.CHNAGE_CONTACT, [full_name, address, email, phone, id]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.affectedRows > 0 ? 0 : -1;
            }
        } else {
            if (searchContact.res[0].phone.toLowerCase() === phone.toLowerCase()) result = -3;
            else if (searchContact.res[0].email.toLowerCase() === email.toLowerCase()) result = -2;
            else if (searchContact.res[0].full_name.toLowerCase() === full_name.toLowerCase()) result = -4;
        }
    }
    return result;
}


/**
 * 
 * elimina um contacto
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do contacto da pessoa
 * @returns {number} 0 se correr tudo como planeado ou -1 caso ocorra erro, -2 caso esteja a ser utilizado
 */
async function deleteContact(db, id) {
    let result = -1;
    //procura contacto se existe
    let searchContact = await db.doQuery(q_DataSheet.CHECK_CONTACT_USUAGE, [id, id, id]);
    if (!searchContact.error) {
        if (searchContact.res.length === 0) {
            //altera contacto
            let resultDb = await db.doQuery(q_DataSheet.DELETE_CONTACT, [id]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.affectedRows > 0 ? 0 : -1;
            }
        } else {
            result = -2;
        }
    }
    return result;
}

/**
 * 
 * devolve um contacto
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id do contacto da pessoa
 * @returns {JSON} {<contact>} ou null caso nao seja encontrado
 */
async function getContact(db, id) {
    //altera contacto
    let resultDb = await db.doQuery(q_DataSheet.GET_CONTACT, [id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error && resultDb.res.length > 0) {
        return resultDb.res[0];
    }
    return null;
}

/**
 * 
 * lista contactos
 * @param {database.Database} db Class de ligação à base de dados
 * @param {string} search palavra pesquisa
 * @returns {Array<Contacts>} [<contacts>]
 */
async function listContact(db, search) {
    let s = "%" + search + "%";
    //altera contacto
    let resultDb = await db.doQuery(q_DataSheet.LIST_CONTACTS, [s, s, s, s]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        return resultDb.res;
    }
    return [];
}


/**
 * apaga fonte
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id da fonte
 * @returns {number} 0 caso nao ocorra nenhum erro ou -1 caso ocorra erro
 */
async function deleteSource(db, id) {
    let result = -1;
    //criação do novo contacto
    let resultDb = await db.doQuery(q_DataSheet.DELETE_SOURCE, [id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0 ? 0 : -1;
    }
    return result;
}

/**
 * cria fonte
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id da fonte
 * @returns {JSON} {<fonte>}
 */
async function getSource(db, id) {
    //procura fonte
    let resultDb = await db.doQuery(q_DataSheet.GET_SOURCE, [id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error && resultDb.res.length > 0) {
        return resultDb.res[0];
    }
    return null;
}


/**
 * cria fonte
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} object_id id do objeto associado
 * @param {number} source_type_set se é um set
 * @param {string} source fonte
 * @param {string} source_type tipo de fonte
 * @param {string} source_site site da fonte
 * @param {string} source_quota quota da source
 * @param {Date} source_date data de criação da fonte
 * @returns {number} id da foñte ou -1 caso ocorra erro, -2 caso o objeto nao exista
 */
async function createSource(db, object_id, source_type_set, source, source_type, source_site, source_quota, source_date) {
    let result = -1;
    //procura contacto se existe
    let checkObjecto = await db.doQuery(q_DataSheet.CHECK_OBJECT, [object_id]);
    if (!checkObjecto.error) {
        if (checkObjecto.res.length > 0) {
            //criação do novo contacto
            let resultDb = await db.doQuery(q_DataSheet.CREATE_SOURCE, [object_id, source_type_set, source, source_type, source_site, source_quota, source_date]);
            //se não ocorreu nenhum erro, devolve o id inserido
            if (!resultDb.error) {
                result = resultDb.res.insertId;
            }
        } else result = -2;
    }
    return result;
}


/**
 * edita fonte
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da fonte
 * @param {number} source_type_set se é um set
 * @param {string} source fonte
 * @param {string} source_type tipo de fonte
 * @param {string} source_site site da fonte
 * @param {string} source_quota 
 * @param {Date} source_date data de criação da fonte
 * @returns {number} 0 caso nao ocorra nenhum erro ou -1 caso ocorra erro
 */
async function changeSource(db, id, source_type_set, source, source_type, source_site, source_quota, source_date) {
    let result = -1;
    //alteração do novo contacto
    let resultDb = await db.doQuery(q_DataSheet.CHANGE_SOURCE, [source_type_set, source, source_type, source_site, source_quota, source_date,id]);
    //se não ocorreu nenhum erro
    if (!resultDb.error) {
        result = 0;
    }
    return result;
}

/**
 * 
 * lista fontes
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id_object id do objeto associado
 * @param {string} search palavra pesquisa
 * @returns {Array<Sourdces>} [<fontes>]
 */
async function listSources(db, id_object, search) {
    //lista sources
    let resultDb = await db.doQuery(q_DataSheet.LIST_SOURCES, [id_object, "%" + search + "%"]);
    //se não ocorreu nenhum erro, devolve lista
    if (!resultDb.error) {
        return resultDb.res;
    }
    return [];
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
 * @param {string} supercategory super categoria da ficha
 * @param {string} category categoria da ficha
 * @param {string} subcategory sub categoria da ficha
 * @param {number} userId id do utilizador autenticado
 * @returns {boolean} se foi atualizado alguma coisa
 */
async function changeDataSheetP1(db, id, designation, cearcproc, cearcprocdata, cearcentrancedata, lcrmproc, lcrmprocdata, lcrmentrancedata, coordinatorid, supercategory, category, subcategory, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P1, [designation, cearcproc, cearcprocdata, cearcentrancedata, lcrmproc, lcrmprocdata, lcrmentrancedata, coordinatorid, userId, supercategory, category, subcategory, id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da ficha técnica
 * @param {string} dimensions dimensões do objeto
 * @param {string} other_dimensions - outras dimensões
 * @param {string} tipology - tipologia do objeto
 * @param {string} site - localização
 * @param {number} object_owner -proprietário
 * @param {number} owner - dono da obra
 * @param {number} patron - mecenas 
 * @param {number} userId - id do utilizador autenticado
 * @returns {boolean} se foi atualizado alguma coisa
 */
async function changeDataSheetP2(db, id, dimensions,other_dimensions,tipology,site,object_owner,owner,patron, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P2, [dimensions,other_dimensions,tipology,site,object_owner,owner,patron, userId,id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}




/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da ficha técnica
 * @param {number} object_is_a_set - informação respetiva a se existe ou nao bem integrado em conjunto
 * @param {string} set_type - tipo de conjunto do objecto
 * @param {string} set_elements - elementos do objeto
 * @param {string} set_materials - materiais do objeto
 * @param {string} set_inscriptions - inscrições no objeto
 * @param {string} set_mount - inscrições de Montagem do objeto
 * @param {string} set_build - inscrições de Construção
 * @param {string} classification - classificação do objeto
 * @param {number} period - época do objeto
 * @param {number} quality - qualidade do objeto
 * @param {number} style - estilo do objeto
 * @param {string} materials_structure - materiais da estrutura do objeto
 * @param {string} materials_surface - materiais da superficie do objeto
 * @param {string} materials_elementsAccessories - materiais dos elementos acessórios do objeto
 * @param {string} techniques_structure - técnicas da estrutura do objeto
 * @param {string} techniques_surface - técnicas da superficie do objeto
 * @param {string} techniques_elementsAccessories - técnicas dos elementos acessórios do objeto
 * @param {string} small_description - pequena descrição do objeto
 * @param {string} analogies - analogias 
 * @param {string} conclusions - conclusões
 * @param {string} author - autor 
 * @param {string} dating - datação
 * @param {string} origin - origem
 * @param {number} userId id do utilizador autenticado
 * @returns {boolean} se foi atualizado alguma coisa
 * 
 */

async function changeDataSheetP3(db, id, object_is_a_set, set_type, set_elements, set_materials, set_inscriptions, set_mount, set_build, classification, period, quality, style, materials_structure, materials_surface, materials_elementsAccessories, techniques_structure, techniques_surface, techniques_elementsAccessories,small_description,analogies,conclusions,author,dating,origin,userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P3, [object_is_a_set, set_type, set_elements, set_materials, set_inscriptions, set_mount, set_build, classification, period, quality, style, materials_structure, materials_surface, materials_elementsAccessories, techniques_structure, techniques_surface, techniques_elementsAccessories, small_description, analogies, conclusions, author, dating, origin, userId, id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}


/**
 * 
 * @param {database.Database} db Class de ligação à base de dados 
 * @param {number} id id da ficha técnica
 * @param {String} site_description descrição do local
 * @param {String} cold_temp Frio- temperatura 
 * @param {String} hot_temp Quente- temperatura
 * @param {String} cold_humidity Frio-Humidade
 * @param {String} hot_humidity Frio-Humidade
 * @param {number} cold_start Frio- Início
 * @param {number} cold_end Frio- Fim
 * @param {number} hot_start Quente- Início
 * @param {number} hot_end Quente- Fim
 * @param {String} lightning_type_natural Radiação tipo natural
 * @param {String} lightning_origin_artificial Radiação tipo artificial
 * @param {String} artificial_lux Radiação artificial - valor Iluminância
 * @param {String} natural_lux Radiação natural - valor Iluminância
 * @param {String} artificial_uv Radiação artificial - Valor de U.V.
 * @param {String} natural_uv Radiação natural - Valor de U.V.
 * @param {String} natural_real_uv Radiação natural- Valor Real de U.V.
 * @param {String} artificial_real_uv Radiação artificial- Valor Real de U.V.
 * @param {String} poluting_agents Agentes Poluidores
 * @param {String} poluting_sources Fontes de poluição
 * @param {String} poluting_results Resultados de poluição
 * @param {String} env_conclusions Resultados
 * @param {number} userId id do utilizador autenticado
 */
async function changeDataSheetP4(db, id, site_description, cold_temp, hot_temp, cold_humidity, hot_humidity, cold_start, cold_end, hot_start, hot_end, lightning_type_natural, lightning_origin_artificial, artificial_lux, natural_lux, artificial_uv, natural_uv, artificial_real_uv, natural_real_uv, poluting_agents, poluting_sources, poluting_results, env_conclusions, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P4, [site_description, cold_temp, hot_temp, cold_humidity, hot_humidity, cold_start, cold_end, hot_start, hot_end, lightning_type_natural, lightning_origin_artificial, artificial_lux, natural_lux, artificial_uv, natural_uv, artificial_real_uv, natural_real_uv, poluting_agents, poluting_sources, poluting_results, env_conclusions, userId, id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}

/**
 * 
 *
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da ficha técnica
 * @param {any} tests_Q1 pergunta 1, checkbox
 * @param {any} tests_Q2 pergunta 2, checkbox
 * @param {any} tests_Q3 pergunta 3, checkbox
 * @param {any} tests_Q4 pergunta 4, checkbox
 * @param {any} tests_Q5 pergunta 5, checkbox
 * @param {any} tests_Q6 pergunta 6, checkbox
 * @param {any} tests_results resultado dos testes
 * @param {any} tests_conclusions conlcusão dos testes
 * @param {any} userId id do utilizador autenticado
 */
async function changeDataSheetP5(db, id, tests_Q1, tests_Q2, tests_Q3, tests_Q4, tests_Q5, tests_Q6, tests_results, tests_conclusions, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P5, [tests_Q1, tests_Q2, tests_Q3, tests_Q4, tests_Q5, tests_Q6, tests_results, tests_conclusions, userId, id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da ficha técnica
 * @param {String} support_deterioration Deterioração da Estrutura
 * @param {String} surface_deterioration Deterioração da Superfície
 * @param {String} elements_deterioration Deterioração dos Elementos Acessórios
 * @param {String} support_diagnostic Diagnóstico da Estrutura
 * @param {String} surface_diagnostic Diagnóstico da Superfície
 * @param {String} elements_diagnostic Diagnóstico dos Elementos Acessórios
 * @param {String} conclusions_conservation Conclusões do estado de conservação
 * @param {number} userId id do utilizador autenticado
 */
async function changeDataSheetP6(db, id, support_deterioration, surface_deterioration, elements_deterioration, support_diagnostic, surface_diagnostic, elements_diagnostic, conclusions_conservation, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P6, [support_deterioration, surface_deterioration, elements_deterioration, support_diagnostic, surface_diagnostic, elements_diagnostic, conclusions_conservation, userId, id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}


/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da ficha técnica
 * @param {String} support Estrutura da intervenção anterior
 * @param {String} surface Superfície da intervenção anterior
 * @param {String} elements Elementos Acessórios da intervenção anterior
 * @param {String} conclusions_previous_interventions Conclusões de intervenções anteriores
 * @param {number} userId id do utilizador autenticado
 */
async function changeDataSheetP7(db, id, support, surface, elements, conclusions_previous_interventions, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P7, [support, surface, elements, conclusions_previous_interventions, userId, id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}




/**
 *
 *
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da ficha técnica
 * @param {number} owner_preserve - Preservação Dono da Obra
 * @param {number} owner_conserve - Conservação Dono da Obra
 * @param {number} owner_restaure - Restauro Dono da Obra
 * @param {String} specific_aspects - Aspetos específicos - Dono da Obra
 * @param {number} prop_preserve - Preservação Proposta
 * @param {number} prop_conserve - Conservação Proposta
 * @param {number} prop_restaure - Restauro Proposta
 * @param {String} support_proposal - Estrutura Proposta
 * @param {String} support_resources - Recursos Estrutura
 * @param {String} surface_proposal - Superfície Proposta
 * @param {String} surface_resources - Recursos Superfície
 * @param {String} elements_proposal - Elementos Acessórios Proposta
 * @param {String} elements_resources - Recursos Elementos Acessórios
 * @param {String} observations - observações da proposta
 * @param {Date} proposal_date - Data da Informação da Proposta
 * @param {Date} acceptation_date - Data da Aceitação da Proposta
 * @param {number} ipt_intervinient - interveniente do ipt
 * @param {number} client_intervinient - cliente interveniente
 * @param {number} userId - id do utilizador autenticado
 */
async function changeDataSheetP8(db, id, owner_preserve, owner_conserve, owner_restaure, specific_aspects, prop_preserve, prop_conserve, prop_restaure, support_proposal, support_resources, surface_proposal, surface_resources, elements_proposal, elements_resources, observations, proposal_date, acceptation_date, ipt_intervinient, client_intervinient, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P8, [owner_preserve, owner_conserve, owner_restaure, specific_aspects, prop_preserve, prop_conserve, prop_restaure, support_proposal, support_resources, surface_proposal, surface_resources, elements_proposal, elements_resources, observations, proposal_date, acceptation_date, ipt_intervinient, client_intervinient, userId, id]);
    //se não ocorreu nenhum erro, devolve o id inserido
    if (!resultDb.error) {
        result = resultDb.res.affectedRows > 0;
    }
    return result;
}

/**
 * 
 * @param {database.Database} db Class de ligação à base de dados
 * @param {number} id id da ficha técnica
 * @param {String} support_intervention - Estrutura da intervenção
 * @param {String} support_resources_intervention - Recursos da estrutura
 * @param {String} surface_intervention - Superfície da intervenção
 * @param {String} surface_resources_intervention - Recursos da estrutura
 * @param {String} elements_intervention - Elementos Acessórios da intervenção
 * @param {String} elements_resources_intervention - Recursos dos Elementos Acessórios
 * @param {String} observations_intervention - Observações da intervenção
 * @param {number} userId - id do utilizador autenticado
 */
async function changeDataSheetP9(db, id, support_intervention, support_resources_intervention, surface_intervention, surface_resources_intervention, elements_intervention, elements_resources_intervention, observations_intervention, userId) {
    let result = false;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.UPDATE_OBJECT_P9, [support_intervention, support_resources_intervention, surface_intervention, surface_resources_intervention, elements_intervention, elements_resources_intervention, observations_intervention, userId, id]);
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
 * @param {number} super_category id da super categoria
 * @param {number} category id da categoria
 * @param {number} sub_category id da sub categoria
 * @param {number} userId id do utilizador autenticado
 * @returns {number} id da ficha técnica ou -1 caso ocorra erro
 */
async function createDataSheet(db, designation, cearcproc, cearcprocdata, cearcentrancedata, lcrmproc, lcrmprocdata, lcrmentrancedata, coordinatorid, super_category, category, sub_category, userId) {
    let result = -1;
    //criação do novo objeto
    let resultDb = await db.doQuery(q_DataSheet.CREATE_OBJECT, [designation, cearcproc, cearcprocdata, cearcentrancedata, lcrmproc, lcrmprocdata, lcrmentrancedata, coordinatorid, super_category, category, sub_category, userId]);
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

    app.get(prefix + ROUTE_SOURCES_PREFIX + '/list/:id_object', async function (req, res) {
        let result = { error: 1, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //lista fontes
            let source = await listSources(db, req.params.id_object, !req.query.search ? "" : req.query.search);
            result.error = 0;
            result.message = "Fontes";
            result.res = { sources: source };
        }
        res.json(result);
    }); 

    app.post(prefix + ROUTE_SOURCES_PREFIX + '/change/:id', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.source_type_set && req.body.source && req.body.source_type && req.body.source_site && req.body.source_quota && req.body.source_date) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await changeSource(
                    db,
                    req.params.id,
                    req.body.source_type_set,
                    req.body.source,
                    req.body.source_type,
                    req.body.source_site,
                    req.body.source_quota,
                    req.body.source_date
                );
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Fonte altearada com sucesso";
                }

            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_SOURCES_PREFIX + '/create', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.object_id && req.body.source_type_set && req.body.source && req.body.source_type && req.body.source_site && req.body.source_quota && req.body.source_date) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await createSource(
                    db,
                    req.body.object_id,
                    req.body.source_type_set,
                    req.body.source,
                    req.body.source_type,
                    req.body.source_site,
                    req.body.source_quota,
                    req.body.source_date
                );
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Fonte criada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                }

            }
        }
        res.json(result);
    });
    

    app.post(prefix + ROUTE_SOURCES_PREFIX + '/delete/:id', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //define erro para o caso de algo correr mal
            result.error = 1;
            result.message = "Ocorreu um erro, a fonte pode já não existir";
            //tenta criar um novo objeto
            let resultInsertId = await deleteSource(db, req.params.id);
            //se este foi apagado
            if (resultInsertId >= 0) {
                result.error = 0;
                result.message = "Fonte apagada com sucesso";
            } 
        }
        res.json(result);
    }); 



    app.get(prefix + ROUTE_SOURCES_PREFIX + '/:id', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //define erro para o caso de algo correr mal
            result.error = 1;
            result.message = "Ocorreu um erro, a fonte pode não existir";
            //tenta buscar fonte
            let resultInsertId = await getSource(db, req.params.id);
            //se encontrou
            if (resultInsertId !== null) {
                result.error = 0;
                result.message = "Fonte";
                result.res.source = resultInsertId;
            }
        }
        res.json(result);
    }); 


    app.get(prefix + ROUTE_TESTS_PREFIX + '/list/:id_object', async function (req, res) {
        let result = { error: 1, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //lista exames
            let test = await listTests(db, req.params.id_object, !req.query.search ? "" : req.query.search);
            result.error = 0;
            result.message = "Exames";
            result.res = { tests: test };
        }
        res.json(result);
    });


    app.post(prefix + ROUTE_TESTS_PREFIX + '/change/:id', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.type_reference && req.body.location && req.body.objectives && req.body.technician && req.body.results) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await changeTests(
                    db,
                    req.params.id,
                    req.body.type_reference,
                    req.body.location,
                    req.body.objectives,
                    req.body.technician,
                    req.body.results
                );
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Exame altearado com sucesso";
                }

            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_TESTS_PREFIX + '/create', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.object_id && req.body.type_reference && req.body.location && req.body.objectives && req.body.technician && req.body.results) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await createTests(
                    db,
                    req.body.object_id,
                    req.body.type_reference,
                    req.body.location,
                    req.body.objectives,
                    req.body.technician,
                    req.body.results
                );
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Exame criado com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                }

            }
        }
        res.json(result);
    });


    app.post(prefix + ROUTE_TESTS_PREFIX + '/delete/:id', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //define erro para o caso de algo correr mal
            result.error = 1;
            result.message = "Ocorreu um erro, o exame pode já não existir";
            //tenta criar um novo objeto
            let resultInsertId = await deleteTests(db, req.params.id);
            //se este foi apagado
            if (resultInsertId >= 0) {
                result.error = 0;
                result.message = "Exame apagado com sucesso";
            }
        }
        res.json(result);
    }); 


    app.get(prefix + ROUTE_TESTS_PREFIX + '/:id', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //define erro para o caso de algo correr mal
            result.error = 1;
            result.message = "Ocorreu um erro, o exame pode não existir";
            //tenta buscar exame
            let resultInsertId = await getTest(db, req.params.id);
            //se encontrou
            if (resultInsertId !== null) {
                result.error = 0;
                result.message = "Exame";
                result.res.source = resultInsertId;
            }
        }
        res.json(result);
    });


    app.get(prefix + ROUTE_WORKSHEET_PREFIX + '/list/:id_object', async function (req, res) {
        let result = { error: 1, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //lista folhas
            let worksheet = await listWorksheet(db, req.params.id_object, !req.query.search ? "" : req.query.search);
            result.error = 0;
            result.message = "Folhas de Obra";
            result.res = { worksheets: worksheet };
        }
        res.json(result);
    });


    app.post(prefix + ROUTE_WORKSHEET_PREFIX + '/change/:id', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.worksheet_date && req.body.procedure_type && req.body.observations && req.body.materials && req.body.amount && req.body.duration && req.body.technician) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await changeWorksheet(
                    db,
                    req.params.id,
                    req.body.worksheet_date,
                    req.body.procedure_type,
                    req.body.observations,
                    req.body.materials,
                    req.body.amount,
                    req.body.duration,
                    req.body.technician

                );
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Folha de obra altearada com sucesso";
                }

            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_WORKSHEET_PREFIX + '/create', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.worksheet_date && req.body.procedure_type && req.body.observations && req.body.materials && req.body.amount && req.body.duration && req.body.technician) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await createWorksheet(
                    db,
                    req.body.object_id,
                    req.body.worksheet_date,
                    req.body.procedure_type,
                    req.body.observations,
                    req.body.materials,
                    req.body.amount,
                    req.body.duration,
                    req.body.technician
                );
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Folha de obra criada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                }

            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_WORKSHEET_PREFIX + '/delete/:id', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //define erro para o caso de algo correr mal
            result.error = 1;
            result.message = "Ocorreu um erro, a folha de obra pode já não existir";
            //tenta criar um novo objeto
            let resultInsertId = await deleteWorksheet(db, req.params.id);
            //se este foi apagado
            if (resultInsertId >= 0) {
                result.error = 0;
                result.message = "Folha de obra apagada com sucesso";
            }
        }
        res.json(result);
    }); 


    app.get(prefix + ROUTE_WORKSHEET_PREFIX + '/:id', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //define erro para o caso de algo correr mal
            result.error = 1;
            result.message = "Ocorreu um erro, a folha de obra pode não existir";
            //tenta buscar exame
            let resultInsertId = await getWorksheet(db, req.params.id);
            //se encontrou
            if (resultInsertId !== null) {
                result.error = 0;
                result.message = "Folha de obra";
                result.res.source = resultInsertId;
            }
        }
        res.json(result);
    });


    app.get(prefix + ROUTE_SOLUBILITY_PREFIX + '/list/:id_object', async function (req, res) {
        let result = { error: 1, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //lista testes de solubilidade
            let solubility = await listSolubility(db, req.params.id_object, !req.query.search ? "" : req.query.search);
            result.error = 0;
            result.message = "Testes de solubilidade";
            result.res = { solubilities: solubility };
        }
        res.json(result);
    });


    app.post(prefix + ROUTE_SOLUBILITY_PREFIX + '/create', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.description && req.body.features && req.body.technician && req.body.solub_date) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await createSolubility(
                    db,
                    req.body.object_id,
                    req.body.description,
                    req.body.features,
                    req.body.technician,
                    req.body.solub_date
                );
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Teste de solubilidade foi criado com sucesso";
                    //devolve o id do Teste de solubilidade e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                }

            }
        }
        res.json(result);
    });


    app.get(prefix + ROUTE_SOLUBTESTS_PREFIX + '/list/:id_solubility', async function (req, res) {
        let result = { error: 1, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //lista testes de solvente
            let solvent = await listSolvent(db, req.params.id_solubility, !req.query.search ? "" : req.query.search);
            result.error = 0;
            result.message = "Testes de solvente";
            result.res = { solvents: solvent };
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_SOLUBTESTS_PREFIX + '/create', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.tbl_solubilityid && req.body.solvent && req.body.efficiency && req.body.observations) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await createSolvent(
                    db,
                    req.body.tbl_solubilityid,
                    req.body.solvent,
                    req.body.efficiency,
                    req.body.observations
                );
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Teste de solvente foi criado com sucesso";
                    //devolve o id do Teste de solvente e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                }

            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_DATASHEET_PREFIX + '/delete_image/:id/:image', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se a imagem existe
            result.error = 1;
            result.message = "A imagem não existe";
            let img = global.DATASHEET_IMAGES_FOLDER + path.sep + req.params.id + path.sep + req.params.image;
            if (fs.existsSync(img)) {
                fs.unlinkSync(img);
                result.error = 0;
                result.message = "Imagem apagada";
            }
        }
        res.json(result);
    });
    app.get(prefix + ROUTE_DATASHEET_PREFIX + '/get_image/:id/:image', async function (req, res) {
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            let img = global.DATASHEET_IMAGES_FOLDER + path.sep + req.params.id + path.sep + req.params.image;
            if (!fs.existsSync(img)) {
                img = global.DATASHEET_IMAGES_FOLDER + path.sep + "no_photo.jpg";
            }
            var stat = fs.statSync(img);
            res.writeHead(200, {
                'Content-Type': 'image/*',
                'Content-Length': stat.size
            });
            var readStream = fs.createReadStream(img);
            // We replaced all the event handlers with a simple call to readStream.pipe()
            readStream.pipe(res);
        } else res.status(401).send();
    });

    app.post(prefix + ROUTE_DATASHEET_PREFIX + '/send_image/:id', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 1;
            result.message = "Insira todos os campos obrigatórios";
            await new Promise(function (resolve, reject) {
                new formidable.IncomingForm().parse(req, function (err, fields, files) {
                    if (err) {
                        reject();
                    }
                    if (files.length === 0) reject();
                }).on('file', (name, file) => {
                    //create folder for 
                    var dir = global.DATASHEET_IMAGES_FOLDER + path.sep + req.params.id;
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    let idfile = global.getLastIdImage(req.params.id) + 1;
                    let file_ext = file.name.split('.').pop();
                    fs.renameSync(file.path, dir + path.sep + idfile + "." + file_ext);
                    result.res.file = idfile + "." + file_ext;
                    result.error = 0;
                    result.message = "Imagem enviada com sucesso";
                    resolve();
                    });
            }).catch(() => {});
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_DATASHEET_PREFIX + '/create', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 2;
            result.message = "Insira todos os campos obrigatórios";
            if (/**req.body.idobject && **/ req.body.designation && /**req.body.lcrmproc && req.body.lcrmprocdata && req.body.cearcprocdata && req.body.cearcentrancedata**/ req.body.cearcproc && req.body.coordinatorid && req.body.lcrmentrancedata && req.body.super_category && req.body.category && req.body.sub_category) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //todos os campos não obrigatórios ficam como null caso não estejam definidos
                req.body.cearcprocdata = !req.body.cearcprocdata ? null : req.body.cearcprocdata;
                req.body.cearcentrancedata = !req.body.cearcentrancedata ? null : req.body.cearcentrancedata;
                req.body.lcrmproc = !req.body.lcrmproc ? null : req.body.lcrmproc;
                req.body.lcrmprocdata = !req.body.lcrmprocdata ? null : req.body.lcrmprocdata;
                //verifica se é para editar ou para criar
                //tenta criar um novo objeto
                let resultInsertId = await createDataSheet(
                    db,
                    req.body.designation,
                    req.body.cearcproc,
                    req.body.cearcprocdata,
                    req.body.cearcentrancedata,
                    req.body.lcrmproc,
                    req.body.lcrmprocdata,
                    req.body.lcrmentrancedata,
                    req.body.coordinatorid,
                    req.body.super_category,
                    req.body.category,
                    req.body.sub_category,
                    u.id);
                //se este foi criado
                if (resultInsertId !== -1) {
                    result.error = 0;
                    result.message = "Ficha técnica criada com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                }
                
            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_DATASHEET_PREFIX + '/edit/:id/page/:page', async function (req, res) {
        let result = { error: 4, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        let resultDb = null;
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 3;
            result.message = "Insira todos os campos obrigatórios";
            switch(req.params.page) {
                case "1":
                    	if (req.body.designation && /**req.body.lcrmproc && req.body.lcrmprocdata && req.body.cearcprocdata && req.body.cearcentrancedata**/ req.body.cearcproc && req.body.coordinatorid && req.body.lcrmentrancedata && req.body.category && req.body.super_category && req.body.sub_category) {
                            //define erro para o caso de algo correr mal
                            result.error = 1;
                            result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                            //todos os campos não obrigatórios ficam como null caso não estejam definidos
                            req.body.cearcprocdata = global.notRequiredField(req.body.cearcprocdata);
                            req.body.cearcentrancedata = global.notRequiredField(req.body.cearcentrancedata);
                            req.body.lcrmproc = global.notRequiredField(req.body.lcrmproc);
                            req.body.lcrmprocdata = global.notRequiredField(req.body.lcrmprocdata);
                            //verifica se é para editar ou para criar
                            //tenta altearar um objeto e se este foi alterado
                            resultDb=await changeDataSheetP1(
                                db,
                                req.params.id,
                                req.body.designation,
                                req.body.cearcproc,
                                req.body.cearcprocdata,
                                req.body.cearcentrancedata,
                                req.body.lcrmproc,
                                req.body.lcrmprocdata,
                                req.body.lcrmentrancedata,
                                req.body.coordinatorid,
                                req.body.super_category,
                                req.body.category,
                                req.body.sub_category,
                                u.id
                            );
                        }
                        break;
                    case "2":
						//define erro para o caso de algo correr mal
						result.error = 1;
						result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
						//todos os campos não obrigatórios ficam como null caso não estejam definidos
						req.body.dimensions = global.notRequiredField(req.body.dimensions);
						req.body.other_dimensions = global.notRequiredField(req.body.other_dimensions);
						req.body.tipology = global.notRequiredField(req.body.tipology);
						req.body.site = global.notRequiredField(req.body.site);
						req.body.object_owner = global.notRequiredField(req.body.object_owner);
						req.body.owner = global.notRequiredField(req.body.owner);
						req.body.patron = global.notRequiredField(req.body.patron);
						//verifica se é para editar ou para criar
						//tenta altearar um objeto e se este foi alterado
						resultDb=await changeDataSheetP2(
							db,
							req.params.id,
							req.body.dimensions,
							req.body.other_dimensions,
							req.body.tipology,
							req.body.site,
							req.body.object_owner,
							req.body.owner,
							req.body.patron,
							u.id
						);
                        break;
                    case "3":
                    	if (req.body.object_is_a_set != null) {
                            //define erro para o caso de algo correr mal
                            result.error = 1;
                            result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                            //todos os campos não obrigatórios ficam como null caso não estejam definidos
                            req.body.set_type = global.notRequiredField(req.body.set_type);
                            req.body.set_elements = global.notRequiredField(req.body.set_elements);
                            req.body.set_materials = global.notRequiredField(req.body.set_materials);
                            req.body.set_inscriptions = global.notRequiredField(req.body.set_inscriptions);
                            req.body.set_mount = global.notRequiredField(req.body.set_mount);
                            req.body.set_build = global.notRequiredField(req.body.set_build);
                            req.body.classification = global.notRequiredField(req.body.classification);
                            req.body.period = global.notRequiredField(req.body.period);
                            req.body.quality = global.notRequiredField(req.body.quality);
                            req.body.style = global.notRequiredField(req.body.style);
                            req.body.materials_structure = global.notRequiredField(req.body.materials_structure);
                            req.body.materials_surface = global.notRequiredField(req.body.materials_surface);
                            req.body.materials_elementsAccessories = global.notRequiredField(req.body.materials_elementsAccessories);
                            req.body.techniques_structure = global.notRequiredField(req.body.techniques_structure);
                            req.body.techniques_surface = global.notRequiredField(req.body.techniques_surface);
                            req.body.techniques_elementsAccessories = global.notRequiredField(req.body.techniques_elementsAccessories);
                            req.body.small_description = global.notRequiredField(req.body.small_description);
                            req.body.analogies = global.notRequiredField(req.body.analogies);
                            req.body.conclusions = global.notRequiredField(req.body.conclusions);
                            req.body.author = global.notRequiredField(req.body.author);
                            req.body.dating = global.notRequiredField(req.body.dating);
                            req.body.origin = global.notRequiredField(req.body.origin);
                            //verifica se é para editar ou para criar
                            //tenta altearar um objeto e se este foi alterado
                            resultDb=await changeDataSheetP3(
                                db,
                                req.params.id,
                                req.body.object_is_a_set,
                                req.body.set_type,
                                req.body.set_elements,
                                req.body.set_materials,
                                req.body.set_inscriptions,
                                req.body.set_mount,
                                req.body.set_build,
                                req.body.classification,
                                req.body.period,
                                req.body.quality,
                                req.body.style,
                                req.body.materials_structure,
                                req.body.materials_surface,
                                req.body.materials_elementsAccessories,
                                req.body.techniques_structure,
                                req.body.techniques_surface,
                                req.body.techniques_elementsAccessories,
                                req.body.small_description,
                                req.body.analogies,
                                req.body.conclusions,
                                req.body.author,
                                req.body.dating,
                                req.body.origin,
                                u.id
                            );
                        }
                    break;
                case "4":
                    //define erro para o caso de algo correr mal
                    result.error = 1;
                    result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                    //todos os campos não obrigatórios ficam como null caso não estejam definidos
                    req.body.site_description = global.notRequiredField(req.body.site_description);
                    req.body.cold_temp = global.notRequiredField(req.body.cold_temp);
                    req.body.hot_temp = global.notRequiredField(req.body.hot_temp);
                    req.body.cold_humidity = global.notRequiredField(req.body.cold_humidity);
                    req.body.hot_humidity = global.notRequiredField(req.body.hot_humidity);
                    req.body.cold_start = global.notRequiredField(req.body.cold_start);
                    req.body.cold_end = global.notRequiredField(req.body.cold_end);
                    req.body.hot_start = global.notRequiredField(req.body.hot_start);
                    req.body.hot_end = global.notRequiredField(req.body.hot_end);
                    req.body.lightning_type_natural = global.notRequiredField(req.body.lightning_type_natural);
                    req.body.lightning_origin_artificial = global.notRequiredField(req.body.lightning_origin_artificial);
                    req.body.artificial_lux = global.notRequiredField(req.body.artificial_lux);
                    req.body.natural_lux = global.notRequiredField(req.body.natural_lux);
                    req.body.artificial_uv = global.notRequiredField(req.body.artificial_uv);
                    req.body.natural_uv = global.notRequiredField(req.body.natural_uv);
                    req.body.artificial_real_uv = global.notRequiredField(req.body.artificial_real_uv);
                    req.body.natural_real_uv = global.notRequiredField(req.body.natural_real_uv);
                    req.body.poluting_agents = global.notRequiredField(req.body.poluting_agents);
                    req.body.poluting_sources = global.notRequiredField(req.body.poluting_sources);
                    req.body.poluting_results = global.notRequiredField(req.body.poluting_results);
                    req.body.env_conclusions = global.notRequiredField(req.body.env_conclusions);
                    //verifica se é para editar ou para criar
                    //tenta altearar um objeto e se este foi alterado
                    resultDb = await changeDataSheetP4(
                        db,
                        req.params.id,
                        req.body.site_description,
                        req.body.cold_temp,
                        req.body.hot_temp,
                        req.body.cold_humidity,
                        req.body.hot_humidity,
                        req.body.cold_start,
                        req.body.cold_end,
                        req.body.hot_start,
                        req.body.hot_end,
                        req.body.lightning_type_natural,
                        req.body.lightning_origin_artificial,
                        req.body.artificial_lux,
                        req.body.natural_lux,
                        req.body.artificial_uv,
                        req.body.natural_uv,
                        req.body.artificial_real_uv,
                        req.body.natural_real_uv,
                        req.body.poluting_agents,
                        req.body.poluting_sources,
                        req.body.poluting_results,
                        req.body.env_conclusions,
                        u.id
                    );
                    break;
                case "5":
                    //define erro para o caso de algo correr mal
                    result.error = 1;
                    result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                    //todos os campos não obrigatórios ficam como null caso não estejam definidos
                    req.body.tests_Q1 = global.notRequiredField(req.body.tests_Q1);
                    req.body.tests_Q2 = global.notRequiredField(req.body.tests_Q2);
                    req.body.tests_Q3 = global.notRequiredField(req.body.tests_Q3);
                    req.body.tests_Q4 = global.notRequiredField(req.body.tests_Q4);
                    req.body.tests_Q5 = global.notRequiredField(req.body.tests_Q5);
                    req.body.tests_Q6 = global.notRequiredField(req.body.tests_Q6);
                    req.body.tests_results = global.notRequiredField(req.body.tests_results);
                    req.body.tests_conclusions = global.notRequiredField(req.body.tests_conclusions);
                    //verifica se é para editar ou para criar
                    //tenta altearar um objeto e se este foi alterado
                    resultDb = await changeDataSheetP5(
                        db,
                        req.params.id,
                        req.body.tests_Q1,
                        req.body.tests_Q2,
                        req.body.tests_Q3,
                        req.body.tests_Q4,
                        req.body.tests_Q5,
                        req.body.tests_Q6,
                        req.body.tests_results,
                        req.body.tests_conclusions,
                        u.id

                    );
                    break;
                case "6":
                    //define erro para o caso de algo correr mal
                    result.error = 1;
                    result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                    //todos os campos não obrigatórios ficam como null caso não estejam definidos
                    req.body.support_deterioration = global.notRequiredField(req.body.support_deterioration);
                    req.body.surface_deterioration = global.notRequiredField(req.body.surface_deterioration);
                    req.body.elements_deterioration = global.notRequiredField(req.body.elements_deterioration);
                    req.body.support_diagnostic = global.notRequiredField(req.body.support_diagnostic);
                    req.body.surface_diagnostic = global.notRequiredField(req.body.surface_diagnostic);
                    req.body.elements_diagnostic = global.notRequiredField(req.body.elements_diagnostic);
                    req.body.conclusions_conservation = global.notRequiredField(req.body.conclusions_conservation);
                    //verifica se é para editar ou para criar
                    //tenta altearar um objeto e se este foi alterado
                    resultDb = await changeDataSheetP6(
                        db,
                        req.params.id,
                        req.body.support_deterioration,
                        req.body.surface_deterioration,
                        req.body.elements_deterioration,
                        req.body.support_diagnostic,
                        req.body.surface_diagnostic,
                        req.body.elements_diagnostic,
                        req.body.conclusions_conservation,
                        u.id
                        
                    );
                    break;
                case "7":
                    //define erro para o caso de algo correr mal
                    result.error = 1;
                    result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                    //todos os campos não obrigatórios ficam como null caso não estejam definidos
                    req.body.support = global.notRequiredField(req.body.support);
                    req.body.surface = global.notRequiredField(req.body.surface);
                    req.body.elements = global.notRequiredField(req.body.elements);
                    req.body.conclusions_previous_interventions = global.notRequiredField(req.body.conclusions_previous_interventions);
                    //verifica se é para editar ou para criar
                    //tenta altearar um objeto e se este foi alterado
                    resultDb = await changeDataSheetP7(
                        db,
                        req.params.id,
                        req.body.support,
                        req.body.surface,
                        req.body.elements,
                        req.body.conclusions_previous_interventions,
                        u.id
                        
                    );
                    break;
                case "8":
                    //define erro para o caso de algo correr mal
                    result.error = 1;
                    result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                    //todos os campos não obrigatórios ficam como null caso não estejam definidos
                    req.body.owner_preserve = global.notRequiredField(req.body.owner_preserve);
                    req.body.owner_conserve = global.notRequiredField(req.body.owner_conserve);
                    req.body.owner_restaure = global.notRequiredField(req.body.owner_restaure);
                    req.body.specific_aspects = global.notRequiredField(req.body.specific_aspects);
                    req.body.prop_preserve = global.notRequiredField(req.body.prop_preserve);
                    req.body.prop_conserve = global.notRequiredField(req.body.prop_conserve);
                    req.body.prop_restaure = global.notRequiredField(req.body.prop_restaure);
                    req.body.support_proposal = global.notRequiredField(req.body.support_proposal);
                    req.body.support_resources = global.notRequiredField(req.body.support_resources);
                    req.body.surface_proposal = global.notRequiredField(req.body.surface);
                    req.body.surface_resources = global.notRequiredField(req.body.surface_resources);
                    req.body.elements_proposal = global.notRequiredField(req.body.elements);
                    req.body.elements_resources = global.notRequiredField(req.body.elements_resources);
                    req.body.observations = global.notRequiredField(req.body.observations);
                    req.body.proposal_date = global.notRequiredField(req.body.proposal_date);
                    req.body.acceptation_date = global.notRequiredField(req.body.acceptation_date);
                    req.body.ipt_intervinient = global.notRequiredField(req.body.ipt_intervinient);
                    req.body.client_intervinient = global.notRequiredField(req.body.client_intervinient);
                    //verifica se é para editar ou para criar
                    //tenta altearar um objeto e se este foi alterado
                    resultDb = await changeDataSheetP8(
                        db,
                        req.params.id,
                        req.body.owner_preserve,
                        req.body.owner_conserve,
                        req.body.owner_restaure,
                        req.body.specific_aspects,
                        req.body.prop_preserve,
                        req.body.prop_conserve,
                        req.body.prop_restaure,
                        req.body.support_proposal,
                        req.body.support_resources,
                        req.body.surface_proposal,
                        req.body.surface_resources,
                        req.body.elements_proposal,
                        req.body.elements_resources,
                        req.body.observations,
                        req.body.proposal_date,
                        req.body.acceptation_date,
                        req.body.ipt_intervinient,
                        req.body.client_intervinient,
                        u.id
                        
                    );
                    break;
                case "9":
                    //define erro para o caso de algo correr mal
                    result.error = 1;
                    result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                    //todos os campos não obrigatórios ficam como null caso não estejam definidos
                    req.body.support_intervention = global.notRequiredField(req.body.support_intervention);
                    req.body.support_resources_intervention = global.notRequiredField(req.body.support_resources_intervention);
                    req.body.surface_intervention = global.notRequiredField(req.body.surface_intervention);
                    req.body.surface_resources_intervention = global.notRequiredField(req.body.surface_resources_intervention);
                    req.body.elements_intervention = global.notRequiredField(req.body.elements_intervention);
                    req.body.elements_resources_intervention = global.notRequiredField(req.body.elements_resources_intervention);
                    req.body.observations_intervention = global.notRequiredField(req.body.observations_intervention);
                    //verifica se é para editar ou para criar
                    //tenta altearar um objeto e se este foi alterado
                    resultDb = await changeDataSheetP9(
                        db,
                        req.params.id,
                        req.body.support_intervention,
                        req.body.support_resources_intervention,
                        req.body.surface_intervention,
                        req.body.surface_resources_intervention,
                        req.body.elements_intervention,
                        req.body.elements_resources_intervention,
                        req.body.observations_intervention,
                        u.id
                        
                        
                    );
                    break;
                    default:
                        result.error=2;
                        result.message="Pagina não existente";
            };
            if (resultDb) {
                result.error = 0;
                result.message = "Ficha técnica atualizada com sucesso";
                //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                result.res = { id: parseInt(req.params.id, 10) };
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
                result.res.datasheets.forEach((ds) => {
                    ds.image = global.getFirstImage(ds.id);
                });
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

    app.post(prefix + ROUTE_CONTACTS_PREFIX + '/create', async function (req, res) {
        let result = { error: 6, message: "Por favor efectue autenticação", res: { } };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 5;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.full_name && req.body.address &&  req.body.email && req.body.phone ) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido";
                //tenta criar um novo objeto
                let resultInsertId = await createContact(db, req.body.full_name, req.body.address, req.body.email, req.body.phone);
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Contacto criado com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                } else if (resultInsertId === -2) {
                    result.error = 4;
                    result.message = "Já existe um contacto com esse email";
                } else if (resultInsertId === -3) {
                    result.error = 3;
                    result.message = "Já existe um contacto com esse contacto";
                } else if (resultInsertId === -4) {
                    result.error = 2;
                    result.message = "Já existe um contacto com esse nome";
                }
            }
        }
        res.json(result);
    });

    app.post(prefix + ROUTE_CONTACTS_PREFIX + '/change/:id', async function (req, res) {
        let result = { error: 6, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //verifica se todos os campos obrigatórios estão presentes
            result.error = 5;
            result.message = "Insira todos os campos obrigatórios";
            if (req.body.full_name && req.body.address && req.body.email && req.body.phone) {
                //define erro para o caso de algo correr mal
                result.error = 1;
                result.message = "Ocorreu um erro, algum dos campos pode estar mal definido ou o conacto indicado não existe";
                //tenta criar um novo objeto
                let resultInsertId = await changeContact(db, req.params.id, req.body.full_name, req.body.address, req.body.email, req.body.phone);
                //se este foi criado
                if (resultInsertId >= 0) {
                    result.error = 0;
                    result.message = "Contacto alterado com sucesso";
                    //devolve o id da ficha tecnica e o tipo = 0 se criado ou 1 se editado
                    result.res = { id: resultInsertId };
                } else if (resultInsertId === -2) {
                    result.error = 4;
                    result.message = "Já existe um contacto com esse email";
                } else if (resultInsertId === -3) {
                    result.error = 3;
                    result.message = "Já existe um contacto com esse contacto";
                } else if (resultInsertId === -4) {
                    result.error = 3;
                    result.message = "Já existe um contacto com esse nome";
                }
            }
        }
        res.json(result);
    }); 

    app.post(prefix + ROUTE_CONTACTS_PREFIX + '/delete/:id', async function (req, res) {
        let result = { error: 3, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //define erro para o caso de algo correr mal
            result.error = 1;
            result.message = "Ocorreu um erro, o contacto pode já não existir";
            //tenta criar um novo objeto
            let resultInsertId = await deleteContact(db, req.params.id);
            //se este foi apagado
            if (resultInsertId >= 0) {
                result.error = 0;
                result.message = "Contacto apagado com sucesso";
            } else if (resultInsertId === -2) {
                result.error = 2;
                result.message = "O contacto está a ser utilizado, não pode ser apagado";
            }
        }
        res.json(result);
    });

    app.get(prefix + ROUTE_CONTACTS_PREFIX + '/list', async function (req, res) {
        let result = { error: 1, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //tenta criar um novo objeto
            let contact = await listContact(db, !req.query.search ? "" : req.query.search);
            result.error = 0;
            result.message = "Contactos";
            result.res = { contacts: contact };
        }
        res.json(result);
    }); 

    app.get(prefix + ROUTE_CONTACTS_PREFIX + '/:id', async function (req, res) {
        let result = { error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //tenta criar um novo objeto
            let contact = await getContact(db, req.params.id);
            //se este foi apagado
            if (contact !== null) {
                result.error = 0;
                result.message = "Contacto";
                result.res = { contact: contact };
            } else if (contact === -2) {
                result.error = 1;
                result.message = "O contacto não foi encontrado";
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
                }else if(resultInsertId === -2) {
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


    app.get(prefix + ROUTE_DATASHEET_PREFIX + '/:id', async function (req, res) {
        let result = {
            error: 2, message: "Por favor efectue autenticação", res: {} };
        //verifica se utilizador está autenticado
        let u = auth.getUserFromSession(req);
        if (u) {
            //caso ocorra algum tipo de erro
            result.error = 1;
            result.message = "Ocorreu um erro na aquisição do objeto, por favor tente novamente";
            //lista fichas técnicas
            let resultDb = await getDatasheet(db, req.params.id);
            //verifica se ocorreu algum erro
            if (!resultDb.error) {
                result.error = 0;
                result.message = "Objeto";
                result.res.datasheet = resultDb.datasheet;
                result.res.datasheet.images = global.getAllImagesFromDatasheet(result.res.datasheet.id);
            }
        }
        res.json(result);
    });
};