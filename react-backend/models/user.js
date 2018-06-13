var DB = require('../DB');

var db = new DB();
var table = 'users';

db.run(`CREATE TABLE ${table} (id INT, dt TEXT)`);