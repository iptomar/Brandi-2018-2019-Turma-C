class User {
    constructor(json) {
        this._id = json.id;
        this._full_name = json.full_name;
        this._email = json.email;
        this._address = json.address;
        this._birthday = json.birthday;
        this._cellphone = json.cellphone;
        this._type_user = json.type_user;
        this._id_type_user = json.id_type_user;
    }
    get full_name() {
        return this._full_name;
    }
    get email() {
        return this._email;
    }
    get address() {
        return this._address;
    }
    get birthday() {
        return this._birthday;
    }
    get cellphone() {
        return this._cellphone;
    }
    get type_user() {
        return this._type_user;
    }
    get id_type_user() {
        return this._id_type_user;
    }

    //retorna objeto json de forma a poder ser enviado para o cliente ou ser armazenado nas variaveis de sessão 
    getJSON() {
        return {
            full_name: this._full_name,
            email: this._email,
            address: this._address,
            birthday: this._birthday,
            cellphone: this._cellphone,
            type_user: this._type_user,
            id_type_user: this._id_type_user
        };
    }
}
exports.User = User; 
