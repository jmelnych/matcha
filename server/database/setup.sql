DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users_tags;

CREATE TABLE users
(
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       VARCHAR(255) NOT NULL UNIQUE,
  username    VARCHAR(255) NOT NULL,
  firstname   VARCHAR(255) NOT NULL,
  lastname    VARCHAR(255) NOT NULL,
  password    VARCHAR(255) NOT NULL,
  activation  TINYINT(1)          DEFAULT '0' NOT NULL,
  token       VARCHAR(255) NOT NULL,
  gender      VARCHAR(10)  NOT NULL,
  preference  VARCHAR(10)         DEFAULT 'both' NOT NULL,
  occupancy   VARCHAR(255),
  bio         TEXT,
  location_id INTEGER,
  avatar      VARCHAR(255)        DEFAULT '../img/avatars/default.png',
  added       DATETIME            DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE locations
(
  id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE pictures
(
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  path    VARCHAR(255) NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE tags
(
  id  INTEGER PRIMARY KEY AUTOINCREMENT,
  tag VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE users_tags
(
  user_id INTEGER,
  tag_id  INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (tag_id) REFERENCES tags (id)
);
