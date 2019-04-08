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
        this._last_login = json.last_login;
        this._register_date = json.register_date;
        this._title = json.title;
        this._qualifications = json.qualifications;
    }
    //nao podem ser alterados
    get id() {
        return this._id;
    }
    get email() {
        return this._email;
    }
    get birthday() {
        return this._birthday;
    }
    get register_date() {
        return this._register_date;
    }
    //podem ser alterados
    get full_name() {
        return this._full_name;
    }
    get address() {
        return this._address;
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
    get last_login() {
        return this._last_login;
    }
    get title() {
        return this._title;
    }
    get qualifications() {
        return this._qualifications;
    }
    //podem ser alterados
    set last_login(ll) {
        this._last_login = ll;
    }
    set full_name(fn) {
        this._full_name=fn;
    }
    set address(a) {
        this._address=a;
    }
    set cellphone(cp) {
        this._cellphone=cp;
    }
    set type_user(tu) {
        this._type_user=tu;
    }
    set id_type_user(itu) {
        this._id_type_user=itu;
    }
    set title(t) {
        this._title=t;
    }
    set qualifications(q) {
        this._qualifications=q;
    }
    //retorna objeto json de forma a poder ser enviado para o cliente ou ser armazenado nas variaveis de sessão 
    getJSON() {
        return {
            id: this._id,
            full_name: this._full_name,
            email: this._email,
            address: this._address,
            birthday: this._birthday,
            cellphone: this._cellphone,
            type_user: this._type_user,
            id_type_user: this._id_type_user,
            last_login: this._last_login,
            register_date: this._register_date,
            title: this._title,
            qualifications: this._qualifications
        };
    }
}
exports.User = User; 
