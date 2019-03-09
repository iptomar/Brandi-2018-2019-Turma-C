const infoDB = require('../InfoDB.js');

//Query de obter todos os dados de um utilizador e tipo do mesmo através do email
exports.GET_USER_AND_TYPE_BY_EMAIL = "SELECT a.id,a.email, a.password,a.salt,a.full_name,a.address,DATE_FORMAT(a.birthday, '%d/%m/%Y') as birthday,a.cellphone,a.id_type_user,b.type_user,a.last_login FROM " + infoDB.TBL_USERS + " a, " + infoDB.TBL_USER_TYPES + " b WHERE a.id_type_user=b.id AND email=? LIMIT 1";

exports.GET_USER_AND_TYPE_LIST = "SELECT a.id,a.email, a.password,a.salt,a.full_name,a.address,DATE_FORMAT(a.birthday, '%d/%m/%Y') as birthday,a.cellphone,a.id_type_user,b.type_user,a.last_login FROM " + infoDB.TBL_USERS + " a, " + infoDB.TBL_USER_TYPES + " b WHERE a.id_type_user=b.id";

exports.CREATE_USER = "INSERT INTO " + infoDB.TBL_USERS + "(email, password, salt, full_name, address, birthday, cellphone, id_type_user) VALUES(?,?,?,?,?,?,?,?)";

exports.GET_USER_TYPE_BY_ID = "SELECT id,type_user FROM " + infoDB.TBL_USER_TYPES + " WHERE id=? LIMIT 1;";

exports.SET_LAST_LOGIN_BY_ID = "UPDATE " + infoDB.TBL_USERS + " SET last_login=NOW() WHERE id=?";
