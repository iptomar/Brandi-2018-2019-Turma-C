const infoDB = require('../InfoDB.js');

//Query de obter todos os dados de um utilizador NÃO ELIMINADO e tipo do mesmo através do email 
exports.GET_USER_AND_TYPE_BY_EMAIL = "SELECT a.id,a.email, a.password,a.salt,a.full_name,a.address,DATE_FORMAT(a.birthday, '%Y-%m-%d') as birthday,a.cellphone,a.id_type_user,b.type_user,a.register_date,a.title,a.qualifications,a.last_login FROM " + infoDB.TBL_USERS + " a, " + infoDB.TBL_USER_TYPES + " b WHERE a.id_type_user=b.id AND email=? AND a.deleted = 0 LIMIT 1";
//Query de obter todos os dados de um utilizador e tipo do mesmo através do email 
exports.GET_USER_AND_TYPE_BY_EMAIL_IGNORE_DELETE = "SELECT a.id,a.email, a.password,a.salt,a.full_name,a.address,DATE_FORMAT(a.birthday, '%Y-%m-%d') as birthday,a.cellphone,a.id_type_user,b.type_user,a.register_date,a.title,a.qualifications,a.last_login FROM " + infoDB.TBL_USERS + " a, " + infoDB.TBL_USER_TYPES + " b WHERE a.id_type_user=b.id AND email=? LIMIT 1";
//Query de obter todos os dados de um utilizador e tipo do mesmo através do ID
exports.GET_USER_AND_TYPE_BY_ID = "SELECT a.id,a.email, a.password,a.salt,a.full_name,a.address,DATE_FORMAT(a.birthday, '%Y-%m-%d') as birthday,a.cellphone,a.id_type_user,b.type_user,a.register_date,a.title,a.qualifications,a.last_login FROM " + infoDB.TBL_USERS + " a, " + infoDB.TBL_USER_TYPES + " b WHERE a.id_type_user=b.id AND a.id=? AND a.deleted = 0 LIMIT 1";
//Query de obter os IDS de todos os utilizadores Ppor id de tipo de utilizador ignorando se ester estão apagados
exports.GET_USERS_ID_LIST_BY_USER_TYPE = "SELECT a.id FROM " + infoDB.TBL_USERS + " a, " + infoDB.TBL_USER_TYPES + " b WHERE a.id_type_user=b.id AND b.id = ?";
//Query de obter todos os dados de todos os utilizadores com o seu tipo pesquisando por NOME ou EMAIL ou TIPO DE UTILIZADOR
exports.GET_USER_AND_TYPE_LIST = "SELECT a.id,a.email, a.password,a.salt,a.full_name,a.address,DATE_FORMAT(a.birthday, '%Y-%m-%d') as birthday,a.cellphone,a.id_type_user,a.register_date,a.title,a.qualifications,b.type_user,a.last_login FROM " + infoDB.TBL_USERS + " a, " + infoDB.TBL_USER_TYPES + " b WHERE a.id_type_user=b.id AND a.deleted = 0 AND (a.full_name like ? OR a.email like ? OR b.type_user LIKE ?)";
//Query para eliminar um utilizador (NÃO ELIMINA, DEFINE o campo deleted como 1)
exports.DELETE_USER = "UPDATE " + infoDB.TBL_USERS + " SET deleted = 1 WHERE id = ?";
//Query para listar todos os tipos de utilizador pesquisando por NOME
exports.GET_USER_TYPE_LIST = "SELECT id, type_user FROM " + infoDB.TBL_USER_TYPES + " WHERE type_user LIKE ?";
//Query para criar um utilizador
exports.CREATE_USER = "INSERT INTO " + infoDB.TBL_USERS + "(email, password, salt, full_name, address, birthday, cellphone, id_type_user,title, qualifications,register_date,last_login) VALUES(?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
//Query para alterar um utilizador
exports.UPDATE_USER = "UPDATE " + infoDB.TBL_USERS + " SET full_name=?, address=?, cellphone=?, id_type_user=?,title=?, qualifications=?, birthday=? WHERE id=?";
//Query para alterar a password de um utilizador
exports.UPDATE_USER_PW = "UPDATE " + infoDB.TBL_USERS + " SET password=?, salt=? WHERE id=?";
//Query de obter o tipo de utilizador por ID
exports.GET_USER_TYPE_BY_ID = "SELECT id,type_user FROM " + infoDB.TBL_USER_TYPES + " WHERE id=? LIMIT 1;";
//Query de obter o tipo de utilizador por nome
exports.GET_USER_TYPE_BY_NAME = "SELECT id,type_user FROM " + infoDB.TBL_USER_TYPES + " WHERE type_user=? LIMIT 1;";
//Query para adicionar novo tipo de utilizador
exports.ADD_NEW_USER_TYPE = "INSERT INTO " + infoDB.TBL_USER_TYPES + "(type_user) VALUES(?);";
//Query para alterar um tipo de utilizador
exports.UPDATE_USER_TYPE = "UPDATE " + infoDB.TBL_USER_TYPES + " SET type_user=? WHERE id=?";
//Query para ELIMINAR um tipo de utilizador
exports.DELETE_USER_TYPE = "DELETE FROM " + infoDB.TBL_USER_TYPES + " WHERE id=?";
//Query para atualizar o  ultimo login de um utilizador
exports.SET_LAST_LOGIN_BY_ID = "UPDATE " + infoDB.TBL_USERS + " SET last_login=NOW() WHERE id=?";
