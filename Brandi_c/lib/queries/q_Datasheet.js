const infoDB = require('../InfoDB.js');

//Query DE CRIAÇÃO DE UM OBJETO
exports.CREATE_OBJECT = "INSERT INTO " + infoDB.TBL_OBJECT + "(object_designation, CEARC_process, CEARC_process_date, CEARC_entry_date, LCRM_process, LCRM_process_date, LCRM_entry_date, coordinator, owner_intervention_type, object_is_a_set, super_category, category, sub_category, last_modified_user, object_created_date, last_modified_date) VALUES(?,?,?,?,?,?,?,?,1,1,1,1,1,?,NOW(),NOW())";
//Query DE ATUALIZAÇÃO DE UM OBJETO
exports.UPDATE_OBJECT = "UPDATE " + infoDB.TBL_OBJECT + " SET object_designation=?, CEARC_process=?, CEARC_process_date=?, CEARC_entry_date=?, LCRM_process=?, LCRM_process_date=?, LCRM_entry_date=?, coordinator=?, last_modified_user=?, last_modified_date=NOW() WHERE id=?";
//Query DE listagem DE OBJETOS
exports.LIST_OBJECT = "SELECT a.id,a.object_designation, a.CEARC_process, a.CEARC_process_date, a.CEARC_entry_date, a.LCRM_process, a.LCRM_process_date, a.LCRM_entry_date, a.coordinator, b.full_name AS coordinator_name, a.last_modified_user, c.full_name AS last_modified_user_name, a.last_modified_date,a.object_created_date FROM " + infoDB.TBL_OBJECT + " a, " + infoDB.TBL_USERS + " b, " + infoDB.TBL_USERS + " c WHERE a.coordinator=b.id AND a.last_modified_user=c.id AND object_designation like ?";

//Query DE listagem DE SUPER CATEGORIAS
exports.LIST_SUPER_CATEGORY = "SELECT id,supercategory FROM " + infoDB.TBL_SUPERCATEGORIES + " WHERE supercategory like ?";
//Query DE listagem DE CATEGORIAS
exports.LIST_CATEGORY = "SELECT a.id,a.category,b.id as id_super_category FROM " + infoDB.TBL_CATEGORIES + " a, " + infoDB.TBL_SUPERCATEGORIES + " b WHERE a.supercategory=b.id and b.id=? and category like ?";
//Query DE listagem DE SUB CATEGORIAS
exports.LIST_SUB_CATEGORY = "SELECT a.id,a.subcategory,b.id as id_category FROM " + infoDB.TBL_SUBCATEGORIES + " a, " + infoDB.TBL_CATEGORIES + " b WHERE a.category=b.id and b.id=? and subcategory like ?";


//Query DE listagem DE SUPER CATEGORIAS
exports.GET_SUPER_CATEGORY = "SELECT id,supercategory FROM " + infoDB.TBL_SUPERCATEGORIES + " WHERE supercategory = ? LIMIT 1";
//Query DE listagem DE CATEGORIAS
exports.GET_CATEGORY = "SELECT a.id,a.category,b.id as id_super_category FROM " + infoDB.TBL_CATEGORIES + " a, " + infoDB.TBL_SUPERCATEGORIES + " b WHERE a.supercategory=b.id and b.id=? and category = ?  LIMIT 1";
//Query DE listagem DE SUB CATEGORIAS
exports.GET_SUB_CATEGORY = "SELECT a.id,a.subcategory,b.id as id_category FROM " + infoDB.TBL_SUBCATEGORIES + " a, " + infoDB.TBL_CATEGORIES + " b WHERE a.category=b.id and b.id=? and subcategory = ?  LIMIT 1";

//Query DE listagem DE SUPER CATEGORIAS
exports.CHECK_IF_USED_SUPER_CATEGORY = "SELECT id FROM " + infoDB.TBL_OBJECT + " WHERE super_category = ? LIMIT 1";
//Query DE listagem DE CATEGORIAS
exports.CHECK_IF_USED_CATEGORY = "SELECT id FROM " + infoDB.TBL_OBJECT + " WHERE category = ?  LIMIT 1";
//Query DE listagem DE SUB CATEGORIAS
exports.CHECK_IF_USED_SUB_CATEGORY = "SELECT id FROM " + infoDB.TBL_OBJECT + " WHERE sub_category = ?  LIMIT 1";


//Query DE listagem DE SUPER CATEGORIAS
exports.CREATE_SUPER_CATEGORY = "INSERT INTO " + infoDB.TBL_SUPERCATEGORIES + "(supercategory) VALUES(?)";
//Query DE listagem DE CATEGORIAS
exports.CREATE_CATEGORY = "INSERT INTO " + infoDB.TBL_CATEGORIES + "(category,supercategory) VALUES(?,?)";
//Query DE listagem DE SUB CATEGORIAS
exports.CREATE_SUB_CATEGORY = "INSERT INTO " + infoDB.TBL_SUBCATEGORIES + "(subcategory,category) VALUES(?,?)";


//Query DE listagem DE SUPER CATEGORIAS
exports.UPDATE_SUPER_CATEGORY = "UPDATE " + infoDB.TBL_SUPERCATEGORIES + " SET supercategory=? WHERE id=?";
//Query DE listagem DE CATEGORIAS
exports.UPDATE_CATEGORY = "UPDATE " + infoDB.TBL_CATEGORIES + " SET category=? WHERE id=?";
//Query DE listagem DE SUB CATEGORIAS
exports.UPDATE_SUB_CATEGORY = "UPDATE " + infoDB.TBL_SUBCATEGORIES + " SET subcategory=? WHERE id=?";

//Query DE listagem DE SUPER CATEGORIAS
exports.DELETE_SUPER_CATEGORY = "DELETE FROM " + infoDB.TBL_SUPERCATEGORIES + " WHERE id=?";
//Query DE listagem DE CATEGORIAS
exports.DELETE_UPDATE_CATEGORY = "DELETE FROM " + infoDB.TBL_CATEGORIES + " WHERE id=?";
//Query DE listagem DE SUB CATEGORIAS
exports.DELETE_UPDATE_SUB_CATEGORY = "DELETE FROM " + infoDB.TBL_SUBCATEGORIES + " WHERE id=?";
