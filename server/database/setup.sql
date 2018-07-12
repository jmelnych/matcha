DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users_tags;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS posts;

CREATE TABLE users
(
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      VARCHAR(255) NOT NULL UNIQUE,
  username   VARCHAR(255) NOT NULL,
  firstname  VARCHAR(255) NOT NULL,
  lastname   VARCHAR(255) NOT NULL,
  password   VARCHAR(255) NOT NULL,
  activation TINYINT(1)          DEFAULT 0 NOT NULL,
  token      VARCHAR(255),
  gender     VARCHAR(10)  NOT NULL,
  preference VARCHAR(10)         DEFAULT 'both' NOT NULL,
  occupancy  VARCHAR(255),
  bday       VARCHAR(12)  NOT NULL,
  rating     INTEGER             DEFAULT 0 NOT NULL,
  bio        TEXT,
  location   TEXT,
  avatar     VARCHAR(255)        DEFAULT 'default.png',
  added      DATETIME            DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photos
(
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id  INTEGER,
  filename VARCHAR(255) NOT NULL UNIQUE,
  added    DATETIME            DEFAULT CURRENT_TIMESTAMP,
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

INSERT INTO tags (tag) VALUES ('zombie'), ('pizza'), ('javascript');