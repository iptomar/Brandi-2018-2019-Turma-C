﻿const infoDB = require('../InfoDB.js');

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
exports.UPDATE_OBJECT_P5 = "UPDATE " + infoDB.TBL_OBJECT + " SET tests_Q1 =?, tests_Q2 =?, tests_Q3 =?, tests_Q4 =?, tests_Q5 =?, tests_Q6 =?, tests_results =?, tests_conclusions =?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 6- Estado de Conservação
exports.UPDATE_OBJECT_P6 = "UPDATE " + infoDB.TBL_OBJECT + " SET support_deterioration=?, surface_deterioration=?, elements_deterioration=?, support_diagnostic=?, surface_diagnostic=?, elements_diagnostic=?, conclusions_conservation=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 7- Intervenções Anteriores
exports.UPDATE_OBJECT_P7 = "UPDATE " + infoDB.TBL_OBJECT + " SET support=?, surface=?, elements=?, conclusions_previous_interventions=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 8- Proposta de Intervenção
exports.UPDATE_OBJECT_P8 = "UPDATE " + infoDB.TBL_OBJECT + " SET owner_preserve=?, owner_conserve=?, owner_restaure=?, specific_aspects=?, prop_preserve=?, prop_conserve=?, prop_restaure=?, support_proposal=?, support_resources=?, surface_proposal=?, surface_resources=?, elements_proposal=?, elements_resources=?, observations=?, proposal_date=?, acceptation_date=?,ipt_intervinient=?, client_intervinient=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";
//Query DE ATUALIZAÇÃO DE UM OBJETO Pagina 9- Intervenção Realizada
exports.UPDATE_OBJECT_P9 = "UPDATE " + infoDB.TBL_OBJECT + " SET support_intervention=?, support_resources_intervention=?, surface_intervention=?, surface_resources_intervention=?, elements_intervention=?, elements_resources_intervention=?, observations_intervention=?,last_modified_user=?,last_modified_date=NOW() WHERE id=?";


//Query DE listagem DE OBJETOS
exports.GET_OBJECT = "SELECT id,object_designation, CEARC_process, CEARC_process_date, CEARC_entry_date, LCRM_process, LCRM_process_date, LCRM_entry_date, coordinator, last_modified_user, last_modified_date,object_created_date, super_category, category, sub_category,dimensions,other_dimensions,tipology,site,object_owner,owner,patron,object_is_a_set,set_type,set_elements,set_materials,set_inscriptions,set_mount,set_build,classification,period,quality,style,small_description,analogies,conclusions,author,dating,origin,materials_structure, materials_surface, materials_elementsAccessories, techniques_structure, techniques_surface, techniques_elementsAccessories,site_description, cold_temp, hot_temp, cold_humidity, hot_humidity, cold_start, cold_end, hot_start, hot_end, lightning_type_natural, lightning_origin_artificial, artificial_lux, natural_lux, artificial_uv, natural_uv, artificial_real_uv, natural_real_uv, poluting_agents, poluting_sources, poluting_results, env_conclusions, support_deterioration, surface_deterioration, elements_deterioration, support_diagnostic, surface_diagnostic, elements_diagnostic, conclusions_conservation,support, surface, elements, conclusions_previous_interventions,owner_preserve, owner_conserve, owner_restaure, specific_aspects, prop_preserve, prop_conserve, prop_restaure, support_proposal, support_resources, surface_proposal, surface_resources, elements_proposal, elements_resources, observations, proposal_date,acceptation_date,support_intervention, support_resources_intervention, surface_intervention, surface_resources_intervention, elements_intervention, elements_resources_intervention, observations_intervention, acceptation_date,ipt_intervinient, client_intervinient, tests_Q1, tests_Q2, tests_Q3, tests_Q4, tests_Q5, tests_Q6, tests_results, tests_conclusions FROM " + infoDB.TBL_OBJECT + " WHERE id = ? limit 1";
//Query DE listagem DE OBJETOS
exports.CHECK_OBJECT = "SELECT id FROM " + infoDB.TBL_OBJECT + " WHERE id = ? limit 1";

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


exports.CREATE_CONTACT = "INSERT INTO " + infoDB.TBL_CONTACTS + "(full_name, address, email, phone) VALUES(?,?,?,?)";
exports.DELETE_CONTACT = "DELETE FROM " + infoDB.TBL_CONTACTS + " WHERE id=?";
exports.GET_CONTACT = "SELECT id, full_name, address, email, phone FROM " + infoDB.TBL_CONTACTS + " WHERE id=? LIMIT 1";
exports.LIST_CONTACTS = "SELECT id, full_name, address, email, phone FROM " + infoDB.TBL_CONTACTS + " WHERE full_name like ? OR address like ? OR email like ? OR phone like ?";
exports.SEARCH_CONTACT_1 = "SELECT id, full_name, address, email, phone FROM " + infoDB.TBL_CONTACTS + " WHERE full_name = ? OR email = ? OR phone = ? LIMIT 1";
exports.SEARCH_CONTACT_CHANGE_1 = "SELECT id, full_name, address, email, phone FROM " + infoDB.TBL_CONTACTS + " WHERE (full_name = ? OR email = ? OR phone = ?) && id != ? LIMIT 1";
exports.CHNAGE_CONTACT = "UPDATE " + infoDB.TBL_CONTACTS + " SET full_name=?, address=?, email=?, phone=? WHERE id = ?";
exports.CHECK_CONTACT_USUAGE = "SELECT id FROM " + infoDB.TBL_OBJECT + " WHERE owner = ? OR patron = ? OR object_owner = ? LIMIT 1";



//Query de listagem de fontes
exports.LIST_SOURCES = "SELECT id, object_id, source_type_set, source, source_type, source_site, source_quota, source_date FROM " + infoDB.TBL_SOURCES + " WHERE object_id = ? && source like ?";
//Query de criação de uma fonte
exports.CREATE_SOURCE = "INSERT INTO " + infoDB.TBL_SOURCES + "(object_id, source_type_set, source, source_type, source_site, source_quota, source_date) VALUES(?,?,?,?,?,?,?)";
//Query de alteração de uma fonte
exports.CHANGE_SOURCE = "UPDATE " + infoDB.TBL_SOURCES + " SET source_type_set=?, source=?, source_type=?, source_site=?, source_quota=?, source_date=? WHERE id=?";
//Query para apagar uma fonte
exports.DELETE_SOURCE = "DELETE FROM " + infoDB.TBL_SOURCES + " WHERE id=?";
//Query para ir buscar detalhes de uma fonte
exports.GET_SOURCE = "SELECT id, object_id, source_type_set, source, source_type, source_site, source_quota, source_date FROM " + infoDB.TBL_SOURCES + " WHERE id=? LIMIT 1";


//Query de listagem de Exames e análises
exports.LIST_TESTS = "SELECT a.id, a.id_object, a.type_reference, a.location, a.objectives, a.technician, b.full_name as technician_name, a.analysis_DATE, a.results FROM " + infoDB.TBL_ANALYSIS + " a, " + infoDB.TBL_USERS + " b WHERE a.technician=b.id and a.id_object = ? and (a.type_reference like ? OR a.location like ? OR a.objectives like ? OR a.results like ? OR b.full_name like ?)";
//Query de criação de Exames e análises
exports.CREATE_TESTS = "INSERT INTO " + infoDB.TBL_ANALYSIS + "(id_object, type_reference, location, objectives, technician, analysis_DATE, results) VALUES(?,?,?,?,?,NOW(),?)";
//Query de alteração de Exames e análises
exports.CHANGE_TESTS = "UPDATE " + infoDB.TBL_ANALYSIS + " SET type_reference=?, location=?, objectives=?, technician=?, analysis_DATE=NOW(), results=? WHERE id=?";
//Query para apagar um exame
exports.DELETE_TESTS = "DELETE FROM " + infoDB.TBL_ANALYSIS + " WHERE id=?";
//Query para ir buscar detalhes de um exame
exports.GET_TESTS = "SELECT id, id_object, type_reference, location, objectives, technician, analysis_DATE, results FROM " + infoDB.TBL_ANALYSIS + " WHERE id=? LIMIT 1";

//Query de listagem de uma folha de obra
exports.LIST_WORKSHEET = "SELECT a.id, a.object_id, a.worksheet_date, a.procedure_type, a.observations, a.materials, a.amount, a.duration, a.technician, b.full_name as technician_name FROM " + infoDB.TBL_WORKSHEET + " a, " + infoDB.TBL_USERS + " b  WHERE a.object_id = ? and b.id=a.technician and (a.procedure_type like ? or a.observations like ?)";
//Query de criação de uma folha de obra
exports.CREATE_WORKSHEET = "INSERT INTO " + infoDB.TBL_WORKSHEET + "(object_id, worksheet_date, procedure_type, observations, materials, amount, duration, technician) VALUES(?,?,?,?,?,?,?,?)";
//Query de alteração de uma folha de obra
exports.CHANGE_WORKSHEET = "UPDATE " + infoDB.TBL_WORKSHEET + " SET worksheet_date=?, procedure_type=?, observations=?, materials=?, amount=?, duration=?, technician=? WHERE id=?";
//Query para apagar uma folha de obra 
exports.DELETE_WORKSHEET = "DELETE FROM " + infoDB.TBL_WORKSHEET + " WHERE id=?";
//Query para ir buscar detalhes de apenas uma folha de obra 
exports.GET_WORKSHEET = "SELECT id, object_id, worksheet_date, procedure_type, observations, materials, amount, duration, technician FROM " + infoDB.TBL_WORKSHEET + " WHERE id=? LIMIT 1";



//Query de listagem de um teste de solubilidade
exports.LIST_SOLUBILITY = "SELECT a.id, a.object_id, a.description, a.features, a.technician, a.solub_date, b.full_name as technician_name FROM " + infoDB.TBL_SOLUBILITY+ " a, " + infoDB.TBL_USERS + " b  WHERE a.object_id = ? and b.id=a.technician and (a.description like ? or a.features like ?)";
//Query de criação de um teste de solubilidade
exports.CREATE_SOLUBILITY = "INSERT INTO " + infoDB.TBL_SOLUBILITY + "(object_id, description, features, technician, solub_date) VALUES(?,?,?,?,?)";
//Query DE listagem DE OBJETOS
exports.CHECK_SOLUBILITY = "SELECT id FROM " + infoDB.TBL_SOLUBILITY + " WHERE id = ? limit 1";

//Query de listagem de um teste de solvente
exports.LIST_SOLUBTESTS = "SELECT id, tbl_solubilityid, solvent, efficiency, observations FROM " + infoDB.TBL_SOLUBTESTS + " WHERE tbl_solubilityid = ? and (solvent like ? or observations like ?)";
//Query de criação de um teste de solvente
exports.CREATE_SOLUBTESTS = "INSERT INTO " + infoDB.TBL_SOLUBTESTS + "(tbl_solubilityid, solvent, efficiency, observations) VALUES(?,?,?,?)";
