//Host da base de dados
exports.HOST = "localhost";
//porta da base de dados
exports.PORT = 3306;
//user da base de dados
exports.USER = "brandic";
//password da base de dados
exports.PASSWORD = "brandic";
//base de dados
exports.DB = "brandi";
//--------------------------TABELAS--------------------------
exports.TBL_USERS = "tbl_users"; //tabela de utilizadores
exports.TBL_USER_TYPES = "tbl_user_types"; //tabela de tipo de utilizador
exports.TBL_OBJECT = "tbl_object" ; // tabela principal do objeto/peça
exports.TBL_ANALYSIS = "tbl_analysis"; // tabela de análises
exports.TBL_CONSERVATION = "tbl_conservation"; // tabela referente à conservação
exports.TBL_CONTACTS = "tbl_contacts"; // tabela de contactos
exports.tbl_environment = "tbl_environment"; // tabela de análises de ambiente
exports.TBL_IMAGES = "tbl_images"; // tabela de imagens
exports.TBL_INTERVENTION = "tbl_intervention"; // tabela de intervenções
exports.TBL_INTERVENTION_PROPOSAL = "tbl_intervention_proposal"; // tabela de propostas de intervenções
exports.TBL_MATERIALS = "tbl_materials"; // tabela da ficha de materiais
exports.TBL_MATERIALS_USED = "tbl_materials_used"; // tabela de materiais usados
exports.TBL_MATERIAL_TYPES = "tbl_material_types"; // tabela de tipos de materiais
exports.TBL_PREVIOUS_INTERVENTIONS = "tbl_previous_interventions"; // tabela de intervenções anteriores
exports.TBL_SITES = "tbl_sites"; // tabela de localizações
exports.TBL_SOURCES = "tbl_sources"; // tabela de origens
exports.TBL_STYLE = "tbl_style"; // tabela de estilos
exports.TBL_TEAM = "tbl_team"; // tabela de equipa
exports.TBL_TECHNICS = "tbl_technics"; // tabela de técnicas
exports.TBL_TECHNICS_USED = "tbl_technics_used"; // tabela de tipos de técnicas usadas
exports.TBL_TESTS = "tbl_tests"; // tabela de testes
exports.TBL_CATEGORIES = "tbl_categories"; // tabela de categorias
exports.TBL_SUPERCATEGORIES = "tbl_supercategories"; // tabela de supercategorias
exports.TBL_SUBCATEGORIES = "tbl_subcategories"; // tabela de subcategorias
exports.TBL_SOLUBILITY = "tbl_solubility"; // tabela de subcategorias
exports.TBL_SOLUBTESTS = "tbl_solubtests"; // tabela de subcategorias
exports.TBL_WORKSHEET = "tbl_worksheet"; // tabela de subcategorias
//--------------------------CRIAÇÃO DAS TABELAS--------------------------
exports.CREATE_TBL_USER_TYPES = "CREATE TABLE IF NOT EXISTS " + this.TBL_USER_TYPES + "(id INT(11) AUTO_INCREMENT, type_user VARCHAR(25) NOT NULL,PRIMARY KEY(id))";
exports.CREATE_TBL_USERS = "CREATE TABLE IF NOT EXISTS " + this.TBL_USERS + "(id INT(11) AUTO_INCREMENT, email VARCHAR(70) NOT NULL UNIQUE, password VARCHAR(2049) NOT NULL, salt VARCHAR(256) NOT NULL, full_name VARCHAR(70), address VARCHAR(150), birthday DATE, cellphone VARCHAR(12), last_login DATETIME NOT NULL DEFAULT NOW(), register_date DATETIME NOT NULL, title VARCHAR (100), qualifications VARCHAR (100),id_type_user INT(11) NOT NULL, PRIMARY KEY(id), FOREIGN KEY fk_user_type_user(id_type_user) REFERENCES " + this.TBL_USER_TYPES + "(id))";

exports.CREATE_TBL_ANALYSIS = "CREATE TABLE IF NOT EXISTS " + this.TBL_ANALYSIS + "(id INT(11) NOT NULL AUTO_INCREMENT, test_id INT(11) NOT NULL, type_reference VARCHAR(150), location VARCHAR(150), objectives VARCHAR(150), technician INT(11) NOT NULL, analysis_DATE DATE, results TEXT, conclusions TEXT, PRIMARY KEY (id), FOREIGN KEY fk_analysis_test(test_id) REFERENCES " + this.TBL_TESTS + "(id), FOREIGN KEY fk_analysis_tech(technician) REFERENCES " + this.TBL_USERS  + "(id))";

exports.CREATE_TBL_CONSERVATION = "CREATE TABLE IF NOT EXISTS " + this.TBL_CONSERVATION + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, support_deterioration TEXT, surface_deterioration TEXT, elements_deterioration TEXT, support_diagnostic TEXT, surface_diagnostic TEXT, elements_diagnostic TEXT, conclusions TEXT, PRIMARY KEY (id),FOREIGN KEY fk_conservation_object(object_id) REFERENCES " + this.TBL_OBJECT + "(id))";

exports.CREATE_TBL_CONTACTS = "CREATE TABLE IF NOT EXISTS " + this.TBL_CONTACTS + "(id INT(11) NOT NULL AUTO_INCREMENT, full_name VARCHAR(70) NOT NULL, address VARCHAR(150), email VARCHAR(70), phone VARCHAR(50), PRIMARY KEY (id))";

exports.CREATE_TBL_ENVIRONMENT = "CREATE TABLE IF NOT EXISTS " + this.TBL_ENVIRONMENT + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, description TEXT NOT NULL, cold_temp VARCHAR(50), hot_temp VARCHAR(50), cold_humidity VARCHAR(50), hot_humidity VARCHAR(50), cold_start INT(2), cold_end INT(2), hot_start INT(2), hot_end INT(2), lightning_type_natural VARCHAR(50), lightning_origin_artificial VARCHAR(50), artificial_lux VARCHAR(50), natural_lux VARCHAR(50), artificial_uv VARCHAR(50), natural_uv VARCHAR(50), artificial_real_uv VARCHAR(50), natural_real_uv VARCHAR(50), poluting_agents TEXT, poluting_sources TEXT, poluting_results TEXT, conclusions TEXT, PRIMARY KEY (id),FOREIGN KEY fk_environment_object(object_id) REFERENCES " + this.TBL_OBJECT +"(id))";

exports.CREATE_TBL_IMAGES = "CREATE TABLE IF NOT EXISTS " + this.TBL_IMAGES + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, image VARCHAR(170) NOT NULL, main_image BIT(1) NOT NULL, record_type VARCHAR(50), format VARCHAR(50), resolution VARCHAR(20), reference VARCHAR(40), PRIMARY KEY (id),FOREIGN KEY fk_image_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id))";

exports.CREATE_TBL_INTERVENTION = "CREATE TABLE IF NOT EXISTS " + this.TBL_INTERVENTION + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, proposal_preserve BIT(1) NOT NULL, proposal_conserve BIT(1) NOT NULL, proposal_restaure BIT(1) NOT NULL, support TEXT, support_resources TEXT, surface TEXT, surface_resources TEXT, elements TEXT, elements_resources TEXT, observations TEXT, PRIMARY KEY (id), FOREIGN KEY fk_interventions_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id))";

exports.CREATE_TBL_INTERVENTION_PROPOSAL = "CREATE TABLE IF NOT EXISTS " + this.TBL_INTERVENTION_PROPOSAL + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, prop_preserve BIT(1), prop_conserve BIT(1), prop_restaure BIT(1), support TEXT, support_resources TEXT, surface TEXT, surface_resources TEXT, elements TEXT, elements_resources TEXT, observations TEXT, proposal_date DATE, acceptation_date DATE, ipt_intervenient INT(11) NOT NULL, client_intervenient INT(11) NOT NULL, owner_preserve BIT(1), owner_conserve BIT(1), owner_restaure BIT(1), PRIMARY KEY (id), FOREIGN KEY fk_int_proposal_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id),FOREIGN KEY fk_ipt_int(ipt_intervenient) REFERENCES " + this.TBL_USERS + "(id),FOREIGN KEY fk_client_int(client_intervenient) REFERENCES " + this.TBL_CONTACTS + "(id))";

exports.CREATE_TBL_MATERIALS = "CREATE TABLE IF NOT EXISTS " + this.TBL_MATERIALS + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, material_type_id INT(11) NOT NULL, material_used_id INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_material_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id),FOREIGN KEY fk_mat_type(material_type_id) REFERENCES " + this.TBL_MATERIAL_TYPES + "(id),FOREIGN KEY fk_mat_used(material_used_id) REFERENCES " + this. TBL_MATERIALS_USED + "(id))";

exports.CREATE_TBL_MATERIALS_USED = "CREATE TABLE IF NOT EXISTS " + this.TBL_MATERIALS_USED + "(id INT(11) NOT NULL AUTO_INCREMENT, description VARCHAR(40) NOT NULL, PRIMARY KEY (id))";

exports.CREATE_TBL_MATERIAL_TYPES = "CREATE TABLE IF NOT EXISTS " + this.TBL_MATERIAL_TYPES + "(id INT(11) NOT NULL AUTO_INCREMENT, description VARCHAR(40) NOT NULL, PRIMARY KEY (id))";

exports.CREATE_TBL_OBJECT = "CREATE TABLE IF NOT EXISTS " + this.TBL_OBJECT + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id VARCHAR(50) UNIQUE, object_designation VARCHAR(100), LCRM_process_date DATE, LCRM_process VARCHAR(40), LCRM_entry_date DATE, CEARC_process VARCHAR(40), CEARC_process_date DATE, CEARC_entry_date DATE, coordinator INT(11), super_category INT(11) NOT NULL, category INT(11) NOT NULL, sub_category INT(11) NOT NULL, tipology VARCHAR(50), object_owner INT(11), owner INT(11), patron INT(11), site VARCHAR(150), object_is_a_set BIT(1) NOT NULL, set_type VARCHAR(50), set_elements TEXT, set_materials VARCHAR(150), set_inscriptions VARCHAR(150), set_mount VARCHAR(150), set_build VARCHAR(150), classification VARCHAR(150), period INT(1), quality INT(1), style INT(11), small_description TEXT, analogies VARCHAR(150), conclusions VARCHAR(150), author VARCHAR(150), dating VARCHAR(50), origin VARCHAR(50), owner_intervention_type INT(1) NOT NULL, intervention_outlook VARCHAR(150), object_created_date DATETIME NOT NULL, last_modified_date DATETIME, last_modified_user INT(11), PRIMARY KEY (id),FOREIGN KEY fk_object_coordinator(coordinator) REFERENCES " + this.TBL_USERS + "(id),FOREIGN KEY fk_objectowner(object_owner) REFERENCES " + this.TBL_CONTACTS + "(id),FOREIGN KEY fk_owner(owner) REFERENCES " + this.TBL_CONTACTS + "(id),FOREIGN KEY fk_patron(patron) REFERENCES " + this.TBL_CONTACTS + "(id), FOREIGN KEY fk_style(style) REFERENCES " + this.TBL_STYLE + "(id),FOREIGN KEY fk_lastuser(last_modified_user) REFERENCES " + this.TBL_USERS + "(id),FOREIGN KEY fk_supercat(super_category) REFERENCES " + this.TBL_SUPERCATEGORIES + "(id),FOREIGN KEY fk_cat(category) REFERENCES " + this.TBL_CATEGORIES + "(id),FOREIGN KEY fk_subcat(sub_category) REFERENCES " + this.TBL_SUBCATEGORIES + "(id))";

exports.CREATE_TBL_PREVIOUS_INTERVENTIONS = "CREATE TABLE IF NOT EXISTS " + this.TBL_PREVIOUS_INTERVENTIONS + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, support TEXT, surface TEXT, elements TEXT, conclusions TEXT, specific_aspects VARCHAR(150), PRIMARY KEY (id), FOREIGN KEY fk_int_previous_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id))";

exports.CREATE_TBL_SOURCES = "CREATE TABLE IF NOT EXISTS " + this.TBL_SOURCES + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, source_type_set INT(1), source TEXT, source_type VARCHAR(50), source_site VARCHAR(50), source_quota VARCHAR(50), PRIMARY KEY (id), FOREIGN KEY fk_sources_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id))";

exports.CREATE_TBL_STYLE = "CREATE TABLE IF NOT EXISTS " + this.TBL_STYLE + "(id INT(11) NOT NULL AUTO_INCREMENT, style VARCHAR(100) NOT NULL, PRIMARY KEY (id))";

exports.CREATE_TBL_TEAM = "CREATE TABLE IF NOT EXISTS " + this.TBL_TEAM + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, user_id INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_team_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id), FOREIGN KEY fk_team_user(user_id) REFERENCES "+ this.TBL_USERS + "(id))";

exports.CREATE_TBL_TECHNICS = "CREATE TABLE IF NOT EXISTS " + this.TBL_TECHNICS + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, technics_type_id INT(11) NOT NULL, technics_used_id INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_technics_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id), FOREIGN KEY fk_tech_type(technics_type_id) REFERENCES " + this.TBL_MATERIAL_TYPES + "(id), FOREIGN KEY fk_tech_used(technics_used_id) REFERENCES  " + this.TBL_TECHNICS_USED + "(id))";

exports.CREATE_TBL_TECHNICS_USED = "CREATE TABLE IF NOT EXISTS " + this.TBL_TECHNICS_USED + "(id INT(11) NOT NULL AUTO_INCREMENT, description VARCHAR(40) NOT NULL, PRIMARY KEY (id))";

exports.CREATE_TBL_TESTS = "CREATE TABLE IF NOT EXISTS " + this.TBL_TESTS + "(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, Q1 BIT(1), Q2 BIT(1), Q3 BIT(1), Q4 BIT(1), Q5 BIT(1), Q6 BIT(1), results TEXT, conclusions TEXT, PRIMARY KEY (id), FOREIGN KEY fk_tests_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id))";

exports.CREATE_TBL_CATEGORIES = "CREATE TABLE IF NOT EXISTS " + this.TBL_CATEGORIES + "(id INT(11) NOT NULL AUTO_INCREMENT, category VARCHAR(150) NOT NULL, supercategory INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_super(supercategory) REFERENCES " + this.TBL_SUPERCATEGORIES + "(id)");

exports.CREATE_TBL_SUPERCATEGORIES = "CREATE TABLE IF NOT EXISTS " + this.TBL_SUPERCATEGORIES + "(id INT(11) NOT NULL AUTO_INCREMENT, supercategory VARCHAR(150) NOT NULL, PRIMARY KEY (id))";

exports.CREATE_TBL_SUBCATEGORIES = "CREATE TABLE IF NOT EXISTS " + this.TBL_SUBCATEGORIES + "(id INT(11) NOT NULL, subcategory INT(11), category INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_cattop(category) REFERENCES  " + this.TBL_CATEGORIES + "(id))";

exports.CREATE_TBL_SOLUBILITY = "CREATE TABLE  IF NOT EXISTS " + this.TBL_SOLUBILITY + "(id int(11) NOT NULL AUTO_INCREMENT, object_id int(11) NOT NULL, description varchar(100) NOT NULL, features text, technician int(11) NOT NULL, solub_date DATE , PRIMARY KEY (id), FOREIGN KEY fk_solub_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id), FOREIGN KEY fk_solub_tech(technician) REFERENCES " + this.TBL_USERS + "(id))";

exports.CREATE_TBL_SOLUBTESTS = "CREATE TABLE IF NOT EXISTS " + this.TBL_SOLUBTESTS + "(id int(11) NOT NULL AUTO_INCREMENT, tbl_solubilityid int(11) NOT NULL, solvent varchar(150), efficiency int(1), observations varchar(11), PRIMARY KEY (id), FOREIGN KEY fk_solubid(tbl_solubilityid) REFERENCES " + this.TBL_SOLUBILITY + "(id))";

exports.CREATE_TBL_WORKSHEET = "CREATE TABLE IF NOT EXISTS " + this.TBL_WORKSHEET + "(id int(11) NOT NULL AUTO_INCREMENT, object_id int(11) NOT NULL, worksheet_date DATE NOT NULL, procedure_type varchar(100) NOT NULL, observations varchar(11), materials TEXT, amount int(11), duration int(11), technician int(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_worksheet_object(object_id) REFERENCES "+ this.TBL_OBJECT + "(id), FOREIGN KEY fk_worksheet_user(technician) REFERENCES " + this.TBL_USERS + "(id))";

//--------------------------ORDEM DE CRIAÇÃO DAS TABELAS--------------------------
exports.CREATE_OREDER = [this.CREATE_TBL_USER_TYPES, this.CREATE_TBL_USERS, this.CREATE_TBL_CONTACTS, this.CREATE_TBL_MATERIALS_USED, this.CREATE_TBL_MATERIAL_TYPES, this.CREATE_TBL_STYLE, this.CREATE_TBL_TECHNICS_USED , this.CREATE_TBL_SUPERCATEGORIES , this.CREATE_TBL_CATEGORIES , this.CREATE_TBL_SUBCATEGORIES, this.CREATE_TBL_OBJECT,this.CREATE_TBL_CONSERVATION, this.CREATE_TBL_ENVIRONMENT,this.CREATE_TBL_IMAGES,this.CREATE_TBL_INTERVENTION, this.CREATE_TBL_INTERVENTION_PROPOSAL, this.CREATE_TBL_MATERIALS,this.CREATE_TBL_PREVIOUS_INTERVENTIONS,this.CREATE_TBL_SOURCES,this.CREATE_TBL_TEAM,this.CREATE_TBL_TECHNICS,this.CREATE_TBL_TESTS,this.CREATE_TBL_ANALYSIS, this.CREATE_TBL_SOLUBILITY, this.CREATE_TBL_SOLUBTESTS,this.CREATE_TBL_WORKSHEET];