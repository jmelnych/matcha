const sqlite = require('sqlite3').verbose();
const path   = require('path');
const ROOT = path.resolve(__dirname);

module.exports = class DB {
    constructor() {
        this.db = new sqlite.Database(ROOT + '/matcha.db', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connected to db');
            }
        })
    }

    /* used to create or alter tables and to insert or update table data, or delete data */
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db
          .prepare(sql, params)
          .run(function (err, result) {
              if (err) {
                  console.log('Error running your sql\n');
                  console.log(err);
                  reject(err);
              } else {
                console.log('result from DB == ' + this.lastID);
                resolve(this.lastID);
              }
          })
        })
    }

    get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
    }

    all(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.all(sql, params, (err, rows) => {
            if (err) {
                console.log('Error getting data from db\n');
                console.log(err);
                reject(err);
            } else {
                resolve(rows);
            }
        })

      })
    }
};