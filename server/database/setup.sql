DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users_tags;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS messages;

CREATE TABLE users
(
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       VARCHAR(255) NOT NULL UNIQUE,
  username    VARCHAR(255) NOT NULL,
  firstname   VARCHAR(255) NOT NULL,
  lastname    VARCHAR(255) NOT NULL,
  password    VARCHAR(255) NOT NULL,
  activation  TINYINT(1)          DEFAULT 0 NOT NULL,
  token       VARCHAR(255),
  gender      VARCHAR(6)   NOT NULL
    CHECK (gender IN ('male', 'female')),
  preference  VARCHAR(6)          DEFAULT 'both' NOT NULL
    CHECK (preference IN ('both', 'male', 'female')),
  personality VARCHAR(4)
    CHECK (personality IN ('ISTJ', 'ISFJ', 'INFJ', 'INTJ',
                           'ISTP', 'ISFP', 'INFP', 'INTP',
                           'ESTP', 'ESFP', 'ENFP', 'ENTP',
                           'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
                           '')),
  occupancy   VARCHAR(255),
  bday        DATETIME     NOT NULL,
  rating      INTEGER             DEFAULT 0 NOT NULL,
  bio         TEXT,
  location    TEXT         NOT NULL,
  avatar      VARCHAR(255)        DEFAULT 'default.png',
  added       DATETIME            DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photos
(
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id  INTEGER,
  filename VARCHAR(255) NOT NULL UNIQUE,
  added    DATETIME            DEFAULT CURRENT_TIMESTAMP
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
  CONSTRAINT primary_id PRIMARY KEY (user_id, tag_id)
);

CREATE TABLE posts
(
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  title   TEXT NOT NULL,
  post    TEXT NOT NULL,
  added   DATETIME            DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages
(
   id   INTEGER PRIMARY KEY AUTOINCREMENT,
   author_id    INTEGER,
   recipient_id INTEGER,
   message      TEXT NOT NULL,
   added        DATETIME      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE history
(
  first_id  INTEGER,
  second_id INTEGER,
  `action`  VARCHAR(8) NOT NULL
    CHECK (`action` IN ('see', 'like', 'match', 'ban', 'break up', 'fake')),
  added     DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO history (first_id, second_id, action)
VALUES (1, 2, 'match'),
       (1, 3, 'match');

INSERT INTO tags (tag)
VALUES ('zombie'),
       ('pizza'),
       ('javascript');

INSERT INTO users (email, username, firstname, lastname, password, activation, gender, preference, bday, location)
VALUES
('test@mail.com', 'user', 'Test', 'User', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'male', 'both', '1996-01-30T00:00:00+02:00', '{"city":"Kiev","country":"Ukraine","lat":50.4547,"lng":30.5238}'),
('zaria@mail.com', 'user', 'Zaria', 'Maxwell', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'female', 'male', '1991-10-20T00:00:00+02:00', '{"city":"Kyiv","country":"Ukraine","lat":50.498869,"lng":30.424941}'),
('claire@mail.com', 'user', 'Claire', 'Flores', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'female', 'male', '1972-09-10T00:00:00+02:00', '{"city":"Vyshneve","country":"Ukraine","lat":50.387453,"lng":30.366745}'),
('gina@mail.com', 'user', 'Gina', 'Matthews', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'female', 'male', '1993-08-05T00:00:00+02:00', '{"city":"Brovary","country":"Ukraine","lat":50.512042,"lng":30.804698}'),
('henry@mail.com', 'user', 'Henry', 'Medina', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'male', 'female', '1994-07-25T00:00:00+02:00', '{"city":"Zhytomyr","country":"Ukraine","lat":50.262159,"lng":28.672000}'),
('owen@mail.com', 'user', 'Owen', 'Chambers', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'male', 'female', '1985-06-13T00:00:00+02:00', '{"city":"Kyiv","country":"Ukraine","lat":50.393074,"lng":30.498484}'),
('niko@mail.com', 'user', 'Niko', 'Hester', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'male', 'male', '1996-05-03T00:00:00+02:00', '{"city":"Kyiv","country":"Ukraine","lat":50.521861,"lng":30.615231}'),
('van@mail.com', 'user', 'Van', 'Mcneil', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'male', 'female', '1997-04-08T00:00:00+02:00', '{"city":"Kiev","country":"Ukraine","lat":50.4547,"lng":30.5238}'),
('jean@mail.com', 'user', 'Jean', 'Brooks', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'female', 'female', '1968-12-30T00:00:00+02:00', '{"city":"Chernihiv","country":"Ukraine","lat":51.506445,"lng":31.274401}'),
('helen@mail.com', 'user', 'Helen', 'Odom', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'female', 'both', '1999-02-05T00:00:00+02:00', '{"city":"Kyiv","country":"Ukraine","lat":50.460939,"lng":30.642840}'),
('mila@mail.com', 'user', 'Mila', 'Bonilla', 'sha1$6ccf8120$1$6565287932415fe3adca37dbaada1c3d64409f94', 1, 'female', 'both', '2000-01-24T00:00:00+02:00', '{"city":"Kiev","country":"Ukraine","lat":50.4547,"lng":30.5238}');
-- all users password = '1'
