const infoDB = require('../InfoDB.js');

//Query DE CRIAÇÃO DE UM OBJETO
exports.CREATE_OBJECT = "INSERT INTO " + infoDB.TBL_OBJECT + "(object_designation, CEARC_process, CEARC_process_date, CEARC_entry_date, LCRM_process, LCRM_process_date, LCRM_entry_date, coordinator, owner_intervention_type, object_is_a_set, super_category, category, sub_category, last_modified_user, object_created_date, last_modified_date) VALUES(?,?,?,?,?,?,?,?,0,0,?,?,?,?,NOW(),NOW())";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 1- Objecto
exports.UPDATE_OBJECT_P1 = "UPDATE " + infoDB.TBL_OBJECT + " SET object_designation=?, CEARC_process=?, CEARC_process_date=?, CEARC_entry_date=?, LCRM_process=?, LCRM_process_date=?, LCRM_entry_date=?, coordinator=?, last_modified_user=?,super_category=?, category=?, sub_category=?, last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 2- Parte 2
exports.UPDATE_OBJECT_P2 = "UPDATE " + infoDB.TBL_OBJECT + " SET  dimensions=?,other_dimensions=?,tipology=?,site=?,object_owner=?,owner=?,patron=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 3- Características
exports.UPDATE_OBJECT_P3 = "UPDATE " + infoDB.TBL_OBJECT + " SET object_is_a_set=?,set_type=?,set_elements=?,set_materials=?,set_inscriptions=?,set_mount=?,set_build=?,classification=?,period=?,quality=?,style=?,materials_structure=?, materials_surface=?, materials_elementsAccessories=?, techniques_structure=?, techniques_surface=?, techniques_elementsAccessories=?,small_description=?,analogies=?,conclusions=?,author=?,dating=?,origin=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 4- Local
exports.UPDATE_OBJECT_P4 = "UPDATE " + infoDB.TBL_OBJECT + " SET site_description=?,cold_temp=?,hot_temp=?,cold_humidity=?,hot_humidity=?,cold_start=?,cold_end=?,hot_start=?,hot_end=?,lightning_type_natural=?,lightning_origin_artificial=?,artificial_lux=?, natural_lux=?, artificial_uv=?, natural_uv=?, artificial_real_uv=?, natural_real_uv=?,poluting_agents=?,poluting_sources=?,poluting_results=?,env_conclusions=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 6- Estado de Conservação
exports.UPDATE_OBJECT_P6 = "UPDATE " + infoDB.TBL_OBJECT + " SET support_deterioration=?, surface_deterioration=?, elements_deterioration=?, support_diagnostic=?, surface_diagnostic=?, elements_diagnostic=?, conclusions_conservation=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 7- Intervenções Anteriores
exports.UPDATE_OBJECT_P7 = "UPDATE " + infoDB.TBL_OBJECT + " SET support=?, surface=?, elements=?, conclusions_previous_interventions=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 8- Proposta de Intervenção
exports.UPDATE_OBJECT_P8 = "UPDATE " + infoDB.TBL_OBJECT + " SET owner_preserve=?, owner_conserve=?, owner_restaure=?, specific_aspects=?, prop_preserve=?, prop_conserve=?, prop_restaure=?, support_proposal=?, support_resources=?, surface_proposal=?, surface_resources=?, elements_proposal=?, elements_resources=?, observations=?, proposal_date=?, acceptation_date=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";


//Query DE listagem DE OBJETOS
exports.GET_OBJECT = "SELECT id,object_designation, CEARC_process, CEARC_process_date, CEARC_entry_date, LCRM_process, LCRM_process_date, LCRM_entry_date, coordinator, last_modified_user, last_modified_date,object_created_date, super_category, category, sub_category,dimensions,other_dimensions,tipology,site,object_owner,owner,patron,object_is_a_set,set_type,set_elements,set_materials,set_inscriptions,set_mount,set_build,classification,period,quality,style,small_description,analogies,conclusions,author,dating,origin,materials_structure, materials_surface, materials_elementsAccessories, techniques_structure, techniques_surface, techniques_elementsAccessories,site_description, cold_temp, hot_temp, cold_humidity, hot_humidity, cold_start, cold_end, hot_start, hot_end, lightning_type_natural, lightning_origin_artificial, artificial_lux, natural_lux, artificial_uv, natural_uv, artificial_real_uv, natural_real_uv, poluting_agents, poluting_sources, poluting_results, env_conclusions, support_deterioration, surface_deterioration, elements_deterioration, support_diagnostic, surface_diagnostic, elements_diagnostic, conclusions_conservation,support, surface, elements, conclusions_previous_interventions,owner_preserve, owner_conserve, owner_restaure, specific_aspects, prop_preserve, prop_conserve, prop_restaure, support_proposal, support_resources, surface_proposal, surface_resources, elements_proposal, elements_resources, observations, proposal_date, acceptation_date FROM " + infoDB.TBL_OBJECT + " WHERE id = ? limit 1";

//Query DE listagem DE OBJETOS
exports.LIST_OBJECT = "SELECT id,object_designation FROM " + infoDB.TBL_OBJECT + " WHERE object_designation like ?";

//Query DE listagem DE SUPER CATEGORIAS
exports.LIST_SUPER_CATEGORY = "SELECT id,supercategory FROM " + infoDB.TBL_SUPERCATEGORIES + " WHERE supercategory like ?";
//Query DE listagem DE CATEGORIAS
exports.LIST_CATEGORY = "SELECT a.id,a.category,b.id as id_super_category FROM " + infoDB.TBL_CATEGORIES + " a, " + infoDB.TBL_SUPERCATEGORIES + " b WHERE a.supercategory=b.id and b.id=? and category like ?";
//Query DE listagem DE SUB CATEGORIAS
exports.LIST_SUB_CATEGORY = "SELECT a.id,a.subcategory,b.id as id_category FROM " + infoDB.TBL_SUBCATEGORIES + " a, " + infoDB.TBL_CATEGORIES + " b WHERE a.category=b.id and b.id=? and subcategory like ?";


//Query DE listagem DE SUPER CATEGORIAS
exports.GET_SUPER_CATEGORY = "SELECT id,supercategory FROM " + infoDB.TBL_SUPERCATEGORIES + " WHERE supercategory like ? LIMIT 1";
//Query DE listagem DE CATEGORIAS
exports.GET_CATEGORY = "SELECT a.id,a.category,b.id as id_super_category FROM " + infoDB.TBL_CATEGORIES + " a, " + infoDB.TBL_SUPERCATEGORIES + " b WHERE a.supercategory=b.id and b.id=? and category like ?  LIMIT 1";
//Query DE listagem DE SUB CATEGORIAS
exports.GET_SUB_CATEGORY = "SELECT a.id,a.subcategory,b.id as id_category FROM " + infoDB.TBL_SUBCATEGORIES + " a, " + infoDB.TBL_CATEGORIES + " b WHERE a.category=b.id and b.id=? and subcategory like ?  LIMIT 1";

//Query de verificação se o nome de uma categoria dentro de uma super categoria existe
exports.CHECK_CATEGORY_NAME_TO_CHANGE = "SELECT id, category, supercategory AS id_super_category FROM " + infoDB.TBL_CATEGORIES + " WHERE supercategory=(SELECT supercategory FROM " + infoDB.TBL_CATEGORIES + " WHERE id=? LIMIT 1) and category like ? LIMIT 1";
//Query de verificação se o nome de uma sub categoria dentro de uma categoria existe
exports.CHECK_SUB_CATEGORY_NAME_TO_CHANGE = "SELECT id, subcategory, category AS id_super_category FROM " + infoDB.TBL_SUBCATEGORIES + " WHERE category=(SELECT category FROM " + infoDB.TBL_SUBCATEGORIES + " WHERE id=? LIMIT 1) and subcategory like ? LIMIT 1";

//Query DE listagem DE SUPER CATEGORIAS
exports.CHECK_IF_USED_SUPER_CATEGORY = "SELECT id FROM " + infoDB.TBL_OBJECT + " WHERE super_category like ? LIMIT 1";
//Query DE listagem DE CATEGORIAS
exports.CHECK_IF_USED_CATEGORY = "SELECT id FROM " + infoDB.TBL_OBJECT + " WHERE category like ?  LIMIT 1";
//Query DE listagem DE SUB CATEGORIAS
exports.CHECK_IF_USED_SUB_CATEGORY = "SELECT id FROM " + infoDB.TBL_OBJECT + " WHERE sub_category like ?  LIMIT 1";


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
exports.DELETE_CATEGORY = "DELETE FROM " + infoDB.TBL_CATEGORIES + " WHERE id=?";
//Query DE listagem DE SUB CATEGORIAS
exports.DELETE_SUB_CATEGORY = "DELETE FROM " + infoDB.TBL_SUBCATEGORIES + " WHERE id=?";
