let DB = require('../DB');

module.exports = class User {
    constructor() {
        try {
            this.db = new DB();

        } catch (e) {
            return e;
        }
    }

    createTbl() {
        const sql = `CREATE TABLE IF NOT EXISTS users
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(30) NOT NULL,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        password VARCHAR(255) NOT NULL,
        activation TINYINT(1) NOT NULL DEFAULT '0',
        sex TINYINT(1) NOT NULL,
        avatar VARCHAR(255) DEFAULT 'public/images/avatars/default.png'
        )`;
        return this.db.run(sql);
    }

    /* usage:
    1) import the class to the file, for instance:
    var User = require('../models/User');
    2) create the new instance of User Class, for instance:
    var user = new User();
    3) pass the data, like that:
    user.create('julyettka@gmail.com', 'julyettka', 'julia', 'meln', '123', 'female'); */
    create(email, username, firstname, lastname, password, sex, return_callback) {

        this.db.run(`INSERT INTO users
            (email, username, firstname, lastname, password, sex) VALUES (?, ?, ?, ?, ?, ?)`,
            [email, username, firstname, lastname, password, sex],
            return_callback);
    }

    /* usage:
    user.update('username', 'tifany', 'id', 1); */
    update(column, value, key, data, return_callback) {
        return this.db.run(`UPDATE users SET ${column} = ? WHERE ${key} = ?`,
            [value, data], return_callback);
    }

    delete(id, return_callback) {
        return this.db.run(`DELETE FROM users WHERE id = ?`, [id], return_callback);
    }

    /* usage: can be get by id or email:
    user.getByUnique('id', 2), alternatively ('email', 'julyettka@gmail.com') */
    getByUnique(column, value, return_callback) {
        return this.db.get(`SELECT * FROM users WHERE ${column} = ?`, [value], return_callback);
    }

    getAll(return_callback) {
        return this.db.all(`SELECT * FROM users`, return_callback);
    }

};

