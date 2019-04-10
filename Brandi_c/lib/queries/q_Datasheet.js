const infoDB = require('../InfoDB.js');

//Query DE CRIAÇÃO DE UM OBJETO
exports.CREATE_OBJECT = "INSERT INTO " + infoDB.TBL_OBJECT + "(object_designation, CEARC_process, CEARC_process_date, CEARC_entry_date, LCRM_process, LCRM_process_date, LCRM_entry_date, coordinator, owner_intervention_type, object_is_a_set, super_category, category, sub_category, last_modified_user, object_created_date, last_modified_date) VALUES(?,?,?,?,?,?,?,?,1,1,1,1,1,?,NOW(),NOW())";
//Query DE ATUALIZAÇÃO DE UM OBJETO
exports.UPDATE_OBJECT = "UPDATE " + infoDB.TBL_OBJECT + " SET object_designation=?, CEARC_process=?, CEARC_process_date=?, CEARC_entry_date=?, LCRM_process=?, LCRM_process_date=?, LCRM_entry_date=?, coordinator=?, last_modified_user=?, last_modified_date=NOW() WHERE id=?";
//Query DE listagem DE OBJETOS
exports.LIST_OBJECT = "SELECT a.object_designation, a.CEARC_process, a.CEARC_process_date, a.CEARC_entry_date, a.LCRM_process, a.LCRM_process_date, a.LCRM_entry_date, a.coordinator, b.full_name AS coordinator_name, a.last_modified_user, c.full_name AS last_modified_user_name, a.last_modified_date,a.object_created_date FROM " + infoDB.TBL_OBJECT + " a, " + infoDB.TBL_USERS + " b, " + infoDB.TBL_USERS + " c WHERE a.coordinator=b.id AND a.last_modified_user=c.id AND object_designation like ?";
