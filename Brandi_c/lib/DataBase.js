const mariadb = require('mariadb');
const infoDB = require('./InfoDB.js');
class Database {
    /**
     * inicia pool � base de dados
     * @param {string} host host da base de dados
     * @param {number} port porta da base de dados
     * @param {string} user user da base de dados
     * @param {string} password password da base de dados
     * @param {string} database base de dados a selecionar
     */
    constructor(host, port, user, password, database) {
        //so conecta caso n�o exista j� uma pool
        if (this._pool) return;
        this._pool = mariadb.createPool({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database
        });
    }

    /**
     * cria todas as tabelas na base de dados
     * @returns {Object} {error: <se ocurreu um erro>, res: {<o objeto de erro caso tenha ocurrido>}}
     */
    async createAllTables() {
        //tentamos criar todas as tabelas
        for(let i = 0; i < infoDB.CREATE_OREDER.length; i++) {
            //tentamos criar a tabela
            let res = await this.doQuery(infoDB.CREATE_OREDER[i], []);
            //cano haja um erro
            if (res.error !== 0) {
                console.log(res);
                //n�o continuamos a cria��o de tabelas devido a que estas possam estar interligadas
                return Promise.reject(res.res);
            }
        };
        return Promise.resolve();
    }

    /**
     * faz query ao servidor de base de dados
     * @param {string} q query
     * @param {object[]} params parametros da query
     * @returns {JSON} {error: <se ocorreu erro>,res: <resultado da base de dados>}
     */
    async doQuery(q, params) {
        //variavel de conec��o
        let conn;
        //resultado de erro por defeito
        let result = {
            error: 1,
            res: {}
        };
        //tenta conectar-se e correr a query
        try {
            //pede uma conec��o livre a pool
            conn = await this._pool.getConnection();
            //faz a query a base de dados e recebe o resultado
            let rows = await conn.query(q, params);
            //define o resultado para devolver
            result.res = rows;
            //e indica que n�o ocorreu erro nenhum
            result.error = 0;
        } catch (err) {
            //define que o resultado contem o erro
            result.res = err;
        } finally {
            //se ainda houver comunica��o abreta, fecha esta
            if (conn) conn.end();
            //devolve o resultado
            return result;
        }
    }
    /**
     * faz query de delete ao servidor de base dados
     * @param {string} q query
     * @param {object[]} params parametros da query
     * @returns {Object} {error: <se ocorreu erro>,res: <numero de linhas afetadas>}
     */
    async doDelete(q, params) {
        //faz a query a base de dados
        let res = await this.doQuery(q, params);
        //caso nao haja erro, devolve s� o numero de linhas afetadas
        if (res.error === 0) res.res = res.res.affectedRows;
        return res;
    }
}

exports.Database = Database; 