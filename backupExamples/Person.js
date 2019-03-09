class Person {
  constructor() {
    this.id = 'id_1';
  }
  set name(name) {
    this._name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  get name() {
    return this._name;
  }
  sayHello() {
    return 'Hello, my name is ' + this.name + ', I have ID: ' + this.id;
  }
}
exports.Person = Person; 
