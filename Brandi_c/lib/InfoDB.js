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
//--------------------------DEFAULT USER TYPES--------------------------
exports.ADMIN_TYPE_NAME = "Admin";
//--------------------------DEFAULT USER--------------------------
exports.ADMIN_EMAIL = "admin@admin.admin";
exports.ADMIN_PW = "admin";
//--------------------------TABELAS--------------------------
exports.TBL_USERS = "tbl_users"; //tabela de utilizadores
exports.TBL_USER_TYPES = "tbl_user_types"; //tabela de tipo de utilizador

//--------------------------CRIAÇÃO DAS TABELAS--------------------------
exports.CREATE_TBL_USER_TYPES = "CREATE TABLE IF NOT EXISTS " + this.TBL_USER_TYPES + "(id INT(11) AUTO_INCREMENT, type_user VARCHAR(25) NOT NULL,PRIMARY KEY(id))";
exports.CREATE_TBL_USERS = "CREATE TABLE IF NOT EXISTS " + this.TBL_USERS + "(id INT(11) AUTO_INCREMENT, email VARCHAR(70) NOT NULL UNIQUE, password VARCHAR(2049) NOT NULL, salt VARCHAR(256) NOT NULL, full_name VARCHAR(70), address VARCHAR(150), birthday DATE, cellphone VARCHAR(12), last_login DATETIME NOT NULL DEFAULT NOW() ,id_type_user INT(11) NOT NULL, PRIMARY KEY(id), FOREIGN KEY fk_user_type_user(id_type_user) REFERENCES " + this.TBL_USER_TYPES + "(id))";

//--------------------------ORDEM DE CRIAÇÃO DAS TABELAS--------------------------
exports.CREATE_OREDER = [this.CREATE_TBL_USER_TYPES, this.CREATE_TBL_USERS];