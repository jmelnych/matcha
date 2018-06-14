var User = require('../models/User');

var user = new User();

//user.createTbl();
/*test*/
//user.create('enigma@gmail.com', 'abc', 'ab', 'ab', 'qwerty', 'female');
//user.create('123@gmail.com', 'aaaaa', 'aaaa', 'aaaa', 'aa', 'female');
//user.update('username', 'tifany', 'id', 1);
//user.delete(2);
//user.getAll();
user.getByUnique(2);