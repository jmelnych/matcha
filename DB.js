const sqlite = require('sqlite3').verbose();

module.exports = class DB {
    constructor() {
        this.db = new sqlite.Database('./matcha.db', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connected to db');
            }
        })
    }

    /* used to create or alter tables and to insert or update table data */
    run(sql, params = []) {
        this.db.run(sql, params, function (err) {
            if (err) {
                console.log('Error running your sql!\n');
                console.log(err);
            } else {
                console.log('success executing ==>>\n' + sql);
            }
        })
    }

    get(sql, params = []) {
        this.db.get(sql, params, (err, result) => {
            if (err) {
                console.log('Error getting data from db\n');
                console.log(err);
            } else {
                console.log('success getting ==>>\n' + sql);
                console.log(result);
            }
        })
    }

    all(sql, params = []) {
        this.db.all(sql, params, (err, rows) => {
            if (err) {
                console.log('Error getting data from db\n');
                console.log(err);
            } else {
                rows.forEach((row) => {
                    console.log(row);
                })
            }
        })
    }
};
