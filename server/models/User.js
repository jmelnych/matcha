let DB = require('../database/DB');

module.exports = class User {
    constructor() {
        this.db = new DB();
    }

    createTbl() {
        const sql = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        activation TINYINT(1) NOT NULL DEFAULT '0',
        token VARCHAR(255) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        preference VARCHAR(10) NOT NULL DEFAULT 'both',
        bio TEXT,
        location INTEGER,
        avatar VARCHAR(255) DEFAULT '../img/avatars/default.png'
        )`;
        return this.db.run(sql);
    }

    create(email, username, firstname, lastname, password, token, gender) {
        return this.db.run(`INSERT INTO users
            (email, username, firstname, lastname, password, token, gender) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [email, username, firstname, lastname, password, token, gender]);
    }

    //TODO: one request to DB
    update(column, value, key, data) {
        return this.db.run(`UPDATE users SET ${column} = ? WHERE ${key} = ?`,
            [value, data]);
    }

    delete(id) {
        return this.db.run(`DELETE FROM users WHERE id = ?`, [id]);
    }

    getByUnique(column, value) {
        return this.db.get(`SELECT * FROM users WHERE ${column} = ?`, [value]);
    }

    getAllByUnique(column, value) {
        return this.db.all(`SELECT * FROM users WHERE ${column} = ?`, [value]);
    }

    getAll() {
        return this.db.all(`SELECT * FROM users`);
    }

};