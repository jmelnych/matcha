let DB = require('../database/DB');

module.exports = class Tag extends DB {

    add(tag) {
        return this.run(`INSERT INTO tags (tag) VALUES (?)`, [tag]);
    }

    getByUnique(value) {
        return this.get(`SELECT * FROM tags WHERE tag = ?`, [value]);
    }

    getAll() {
        return this.all(`SELECT * FROM tags`);
    }
};