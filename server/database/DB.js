const sqlite = require('sqlite3').verbose();
const path   = require('path');
const ROOT   = path.resolve(__dirname);

module.exports = class DB {
    static db = new sqlite.Database(ROOT + '/matcha.db',
        err => console.log(err ? err : 'Connected to db'));

    /* used to create or alter tables and to insert or update table data, or delete data */
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            DB.db.prepare(sql, params).run(function (err) {
                if (err) {
                    console.log('Error running your sql\n', err);
                    reject(err);
                } else {
                    console.log('result from DB == ' + this.lastID);
                    resolve(this.lastID);
                }
            })
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            DB.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql, err);
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            DB.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error getting data from db\n', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        });
    }

    create(table, columns, values) {
        return this.run(`INSERT INTO ${table} (${columns}) VALUES (${'?, '.repeat(values.length - 1) + '?'})`, values);
    }

    getByUnique(table, column, value) {
        return this.get(`SELECT * FROM ${table} WHERE ${column} = ?`, [value]);
    }

    getAllByUnique(table, column, value) {
        return this.all(`SELECT * FROM ${table} WHERE ${column} = ?`, [value]);
    }

    getAllByFilter(columns, data) {
        let filters = '',
            keys    = Object.keys(data),
            values  = [];
        keys.forEach((key) => {
            if ((key === 'age' || key === 'rating') &&
                Array.isArray(data[key]) && data[key].length) {
                filters += `AND (users.${key} BETWEEN ? AND ?) `;
            } else if (key === 'tags' &&
                Array.isArray(data[key]) && data[key].length) {
                filters += 'AND tags.tag = ? ';
            } else if ((Array.isArray(data[key]) && data[key].length) ||
                !(Array.isArray(data[key]))) {
                filters += `AND users.${key} = ? `;
            }
            values = values.concat(data[key]);
        });
        columns.forEach((value, key, arr) => {
            arr[key] = `users.${value}`;
        });
        return this.all(`SELECT ${columns}, tags.tag FROM users
            LEFT JOIN  users_tags ON users.id = users_tags.user_id
            LEFT JOIN  tags ON users_tags.tag_id = tags.id
         WHERE users.activation = 1 ${filters}
         GROUP BY users.id`, values);
    }

    getAll(table) {
        return this.all(`SELECT * FROM ${table}`);
    }

    update(table, column, value, key, data) {
        return this.run(`UPDATE ${table} SET ${column} = ? WHERE ${key} = ?`, [value, data]);
    }

    updateMultiple(table, data, key, value) {
        let columns = Object.keys(data).join(' = ?, ') + ' = ?',
            values  = Object.values(data);
        return this.run(`UPDATE ${table} SET ${columns} WHERE ${key} = ?`, values.concat(value));
    }

    delete(table, column, value) {
        return this.run(`DELETE FROM ${table} WHERE ${column} = ?`, [value]);
    }
};
