CREATE TABLE IF NOT EXISTS tbl_contacts(id INT(11) NOT NULL AUTO_INCREMENT, full_name VARCHAR(70) NOT NULL, address VARCHAR(150), email VARCHAR(70), phone VARCHAR(50), PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS tbl_materials_used(id INT(11) NOT NULL AUTO_INCREMENT, description VARCHAR(40) NOT NULL, PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS tbl_materials_types(id INT(11) NOT NULL AUTO_INCREMENT, description VARCHAR(40) NOT NULL, PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS tbl_style(id INT(11) NOT NULL AUTO_INCREMENT, style VARCHAR(100) NOT NULL, PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS tbl_technics_used(id INT(11) NOT NULL AUTO_INCREMENT, description VARCHAR(40) NOT NULL, PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS tbl_supercategories(id INT(11) NOT NULL AUTO_INCREMENT, supercategory VARCHAR(150) NOT NULL, PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS tbl_categories (id INT(11) NOT NULL AUTO_INCREMENT, category VARCHAR(150) NOT NULL, supercategory INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_super (supercategory) REFERENCES tbl_supercategories (id));

CREATE TABLE IF NOT EXISTS tbl_subcategories(id INT(11) NOT NULL, subcategory INT(11), category INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_cattop(category) REFERENCES  tbl_categories(id));

CREATE TABLE IF NOT EXISTS tbl_object(id INT(11) NOT NULL AUTO_INCREMENT, object_id VARCHAR(50) UNIQUE, object_designation VARCHAR(100), LCRM_process_date DATE, LCRM_process VARCHAR(40), LCRM_entry_date DATE, CEARC_process VARCHAR(40), CEARC_process_date DATE, CEARC_entry_date DATE, coordinator INT(11), super_category INT(11) NOT NULL, category INT(11) NOT NULL, sub_category INT(11) NOT NULL, tipology VARCHAR(50), object_owner INT(11), owner INT(11), patron INT(11), site INT(11), object_is_a_set BIT(1) NOT NULL, set_type VARCHAR(50), set_elements TEXT, set_materials VARCHAR(150), set_inscriptions VARCHAR(150), set_mount VARCHAR(150), set_build VARCHAR(150), classification VARCHAR(150), period INT(1), quality INT(1), style INT(11), small_description TEXT, analogies VARCHAR(150), conclusions VARCHAR(150), author VARCHAR(150), dating VARCHAR(50), origin VARCHAR(50), owner_intervention_type INT(1) NOT NULL, intervention_outlook VARCHAR(150), object_created_date DATETIME NOT NULL, last_modified_date DATETIME, last_modified_user INT(11), PRIMARY KEY (id),FOREIGN KEY fk_object_coordinator(coordinator) REFERENCES tbl_users(id),FOREIGN KEY fk_objectowner(object_owner) REFERENCES tbl_contacts(id),FOREIGN KEY fk_owner(owner) REFERENCES tbl_contacts(id),FOREIGN KEY fk_patron(patron) REFERENCES tbl_contacts(id),FOREIGN KEY fk_site(site) REFERENCES tbl_sites(id),FOREIGN KEY fk_style(style) REFERENCES tbl_style(id),FOREIGN KEY fk_lastuser(last_modified_user) REFERENCES tbl_users(id),FOREIGN KEY fk_supercat(super_category) REFERENCES tbl_supercategories(id),FOREIGN KEY fk_cat(category) REFERENCES tbl_categories(id),FOREIGN KEY fk_subcat(sub_category) REFERENCES tbl_subcategories(id));

CREATE TABLE IF NOT EXISTS tbl_conservation(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, support_deterioration TEXT, surface_deterioration TEXT, elements_deterioration TEXT, support_diagnostic TEXT, surface_diagnostic TEXT, elements_diagnostic TEXT, conclusions TEXT, PRIMARY KEY (id),FOREIGN KEY fk_conservation_object(object_id) REFERENCES tbl_object(id));

CREATE TABLE IF NOT EXISTS tbl_environment(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, description TEXT NOT NULL, cold_temp VARCHAR(50), hot_temp VARCHAR(50), cold_humidity VARCHAR(50), hot_humidity VARCHAR(50), cold_start INT(2), cold_end INT(2), hot_start INT(2), hot_end INT(2), lightning_type_natural VARCHAR(50), lightning_origin_artificial VARCHAR(50), artificial_lux VARCHAR(50), natural_lux VARCHAR(50), artificial_uv VARCHAR(50), natural_uv VARCHAR(50), artificial_real_uv VARCHAR(50), natural_real_uv VARCHAR(50), poluting_agents TEXT, poluting_sources TEXT, poluting_results TEXT, conclusions TEXT, PRIMARY KEY (id),FOREIGN KEY fk_environment_object(object_id) REFERENCES tbl_object(id));

CREATE TABLE IF NOT EXISTS tbl_images(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, image VARCHAR(170) NOT NULL, main_image BIT(1) NOT NULL, record_type VARCHAR(50), format VARCHAR(50), resolution VARCHAR(20), reference VARCHAR(40), PRIMARY KEY (id),FOREIGN KEY fk_image_object(object_id) REFERENCES tbl_object(id));

CREATE TABLE IF NOT EXISTS tbl_intervention(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, proposal_preserve BIT(1) NOT NULL, proposal_conserve BIT(1) NOT NULL, proposal_restaure BIT(1) NOT NULL, support TEXT, support_resources TEXT, surface TEXT, surface_resources TEXT, elements TEXT, elements_resources TEXT, observations TEXT, PRIMARY KEY (id), FOREIGN KEY fk_interventions_object(object_id) REFERENCES tbl_object(id));

CREATE TABLE IF NOT EXISTS tbl_intervention_proposal(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, prop_preserve BIT(1), prop_conserve BIT(1), prop_restaure BIT(1), support TEXT, support_resources TEXT, surface TEXT, surface_resources TEXT, elements TEXT, elements_resources TEXT, observations TEXT, proposal_date DATE, acceptation_date DATE, ipt_intervenient INT(11) NOT NULL, client_intervenient INT(11) NOT NULL, owner_preserve BIT(1), owner_conserve BIT(1), owner_restaure BIT(1), PRIMARY KEY (id), FOREIGN KEY fk_int_proposal_object(object_id) REFERENCES tbl_object(id),FOREIGN KEY fk_ipt_int(ipt_intervenient) REFERENCES tbl_users(id),FOREIGN KEY fk_client_int(client_intervenient) REFERENCES tbl_contacts(id));

CREATE TABLE IF NOT EXISTS tbl_materials(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, material_type_id INT(11) NOT NULL, material_used_id INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_material_object(object_id) REFERENCES tbl_object(id),FOREIGN KEY fk_mat_type(material_type_id) REFERENCES tbl_materials_types(id),FOREIGN KEY fk_mat_used(material_used_id) REFERENCES tbl_materials_used(id));

CREATE TABLE IF NOT EXISTS tbl_previous_interventions(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, support TEXT, surface TEXT, elements TEXT, conclusions TEXT, specific_aspects VARCHAR(150), PRIMARY KEY (id), FOREIGN KEY fk_int_previous_object(object_id) REFERENCES tbl_object(id));

CREATE TABLE IF NOT EXISTS tbl_sources(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, source_type_set INT(1), source TEXT, source_type VARCHAR(50), source_site VARCHAR(50), source_quota VARCHAR(50), PRIMARY KEY (id), FOREIGN KEY fk_sources_object(object_id) REFERENCES tbl_object(id));

CREATE TABLE IF NOT EXISTS tbl_team(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, user_id INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_team_object(object_id) REFERENCES tbl_object(id), FOREIGN KEY fk_team_user(user_id) REFERENCES tbl_users(id));

CREATE TABLE IF NOT EXISTS tbl_technics(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, technics_type_id INT(11) NOT NULL, technics_used_id INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_technics_object(object_id) REFERENCES tbl_object(id), FOREIGN KEY fk_tech_type(technics_type_id) REFERENCES tbl_materials_types(id), FOREIGN KEY fk_tech_used(technics_used_id) REFERENCES  tbl_technics_used(id));

CREATE TABLE IF NOT EXISTS tbl_tests(id INT(11) NOT NULL AUTO_INCREMENT, object_id INT(11) NOT NULL, Q1 BIT(1), Q2 BIT(1), Q3 BIT(1), Q4 BIT(1), Q5 BIT(1), Q6 BIT(1), results TEXT, conclusions TEXT, PRIMARY KEY (id), FOREIGN KEY fk_tests_object(object_id) REFERENCES tbl_object(id));

CREATE TABLE IF NOT EXISTS tbl_analysis(id INT(11) NOT NULL AUTO_INCREMENT, test_id INT(11) NOT NULL, type_reference VARCHAR(150), location VARCHAR(150), objectives VARCHAR(150), technician INT(11) NOT NULL, analysis_DATE DATE, results TEXT, conclusions TEXT, PRIMARY KEY (id), FOREIGN KEY fk_analysis_test(test_id) REFERENCES tbl_tests(id), FOREIGN KEY fk_analysis_tech(technician) REFERENCES tbl_users(id));

CREATE TABLE  IF NOT EXISTS tbl_solubility(id int(11) NOT NULL AUTO_INCREMENT, object_id int(11) NOT NULL, description varchar(100) NOT NULL, features text, technician int(11) NOT NULL, solub_date DATE , PRIMARY KEY (id), FOREIGN KEY fk_solub_object(object_id) REFERENCES tbl_object(id), FOREIGN KEY fk_solub_tech(technician) REFERENCES tbl_users(id));

CREATE TABLE IF NOT EXISTS tbl_solubtests(id int(11) NOT NULL AUTO_INCREMENT, tbl_solubilityid int(11) NOT NULL, solvent varchar(150), efficiency int(1), observations varchar(11), PRIMARY KEY (id), FOREIGN KEY fk_solubid(tbl_solubilityid) REFERENCES tbl_solubility(id));

CREATE TABLE IF NOT EXISTS tbl_worksheet(id int(11) NOT NULL AUTO_INCREMENT, object_id int(11) NOT NULL, worksheet_date DATE NOT NULL, procedure_type VARCHAR(100) NOT NULL, observations VARCHAR(11), materials TEXT, amount INT(11), duration INT(11), technician INT(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY fk_worksheet_object(object_id) REFERENCES tbl_object(id), FOREIGN KEY fk_worksheet_user(technician) REFERENCES tbl_users(id));