var DB = require('../DB');



//db.run(`CREATE TABLE ${table} (id INT, dt TEXT)`);

class User {
	constructor() {
		this.db = new DB();
	}

	createTbl() {
		const sql = `CREATE TABLE IF NOT EXISTS users
		(id INTEGER PRIMARY KEY AUTOINCREMENT,
		email VARCHAR(255) NOT NULL,
		username VARCHAR(30) NOT NULL,
		firstname VARCHAR(30) NOT NULL,
		lastname VARCHAR(30) NOT NULL,
		password VARCHAR(255) NOT NULL,
		activation TINYINT(1) NOT NULL DEFAULT '0',
		sex TINYINT(1) NOT NULL,
		avatar VARCHAR(255) DEFAULT 'public/images/avatars/default.png'
		)`;
	}

}