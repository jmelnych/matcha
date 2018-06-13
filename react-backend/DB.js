const sqlite = require('sqlite3').verbose();

module.exports = class DB {
	constructor() {
		this.db = new sqlite.Database('../matcha.db', (err) => {
			if(err) {
				console.log(err);
			} else {
				console.log('Connected to db');
			}
		})
	}

	run(sql, params = []) {
		this.db.run(sql, params, function(err) {
			if (err) {
	          console.log('Error running sql ' + sql);
	          console.log(err);
	        } else {
	          console.log('success executing' + sql);
	        }
		})
	}
}


// db.serialize(function() {
//   db.run(`CREATE TABLE ${table} (id INT, dt TEXT)`);

//   var stmt = db.prepare(`INSERT INTO ${table} VALUES (?, ?)`);
//   for (var i = 0; i < 5; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT id, dt info FROM users", function(err, row) {
//       console.log(row.id + ": " + row.dt);
//   });
// });

// db.close();