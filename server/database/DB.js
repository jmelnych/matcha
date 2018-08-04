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

    createMultiple(table, columns, values) {
        return this.run(`INSERT INTO ${table} (${columns}) VALUES ${'(?), '.repeat(values.length - 1) + '(?)'}`, values);
    }

    getByUnique(table, column, value) {
        return this.get(`SELECT * FROM ${table} WHERE ${column} = ?`, [value]);
    }

    getHistory(first_id, second_id = null, relationship = false) {
        return this.all(`SELECT * FROM history WHERE
            ${second_id ? '((first_id = ? AND second_id = ?) OR (second_id = ? AND first_id = ?))' : '(first_id = ?)'}
            ${relationship ? "AND (`action` != 'see' AND `action` != 'fake')" : ""}`,
            second_id ? [first_id, second_id, first_id, second_id] : [first_id]);
    }

    getAllByUnique(table, column, value) {
        return this.all(`SELECT * FROM ${table} WHERE ${column} = ?`, [value]);
    }

    getAllByFilter(columns, filters, values, having, order) {
        return this.all(`SELECT ${columns.map(value => `users.${value}`).join(', ')} FROM users
            LEFT JOIN  users_tags ON users.id = users_tags.user_id
            LEFT JOIN  tags ON users_tags.tag_id = tags.id
         WHERE users.activation = 1 ${filters}
         GROUP BY users.id ${having} ${order}`, values);
    }

    getAll(table) {
        return this.all(`SELECT * FROM ${table}`);
    }

    getAllTagsForUser(id) {
        return this.all(`SELECT tags.id, tags.tag FROM tags
            JOIN users_tags ON tags.id = users_tags.tag_id
            WHERE users_tags.user_id = ?`, [id]);
    }

    getUser(id) {
        return this.all(`SELECT
  users.id          AS users_id,
  users.username    AS users_username,
  users.firstname   AS users_firstname,
  users.lastname    AS users_lastname,
  users.gender      AS users_gender,
  users.bday        AS users_bday,
  users.added       AS users_added,
  users.location    AS users_location,
  users.avatar      AS users_avatar,
  users.personality AS users_personality,
  users.preference  AS users_preference,
  users.occupancy   AS users_occupancy,
  users.rating      AS users_rating,
  users.bio         AS users_bio,
  photos.filename   AS photos_filename,
  posts.id          AS posts_id,
  posts.title       AS posts_title,
  posts.post        AS posts_post,
  posts.added       AS posts_added,
  tags.id           AS tags_id,
  tags.tag          AS tags_tag
FROM users
  LEFT JOIN photos     ON users.id = photos.user_id
  LEFT JOIN posts      ON users.id = posts.user_id
  LEFT JOIN users_tags ON users.id = users_tags.user_id
  LEFT JOIN tags       ON users_tags.tag_id = tags.id
WHERE users.id = ?`, [id]);
    }

    update(table, column, value, key, data) {
        return this.run(`UPDATE ${table} SET ${column} = ? WHERE ${key} = ?`, [value, data]);
    }

    updateMultiple(table, data, key, value) {
        let columns = Object.keys(data).join(' = ?, ') + ' = ?',
            values  = Object.values(data);
        return this.run(`UPDATE ${table} SET ${columns} WHERE ${key} = ?`, values.concat(value));
    }

    delete(table, columns, values) {
        return this.run(`DELETE FROM ${table} WHERE ${columns.map(column => `${column} = ?`).join(' and ')}`, values);
    }

    deleteFromHistory(actions, values) {
        return this.run(`DELETE FROM history WHERE
            ((first_id = ? AND second_id = ?) OR (second_id = ? AND first_id = ?)) AND
        (${actions.map(() => '`action` = ?').join(' OR ')})`, values.concat(actions));
    }
};
