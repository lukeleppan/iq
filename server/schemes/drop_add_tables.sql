-- @conn iqdb
DROP TABLE attempts;
DROP TABLE problems;
DROP TABLE users;
DROP TABLE houses;


CREATE TABLE "houses" (
  house_id SERIAL PRIMARY KEY,
  house_name TEXT NOT NULL,
  colour TEXT
);

CREATE TABLE "users" (
  username VARCHAR(20) PRIMARY KEY NOT NULL,
  hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  displayname TEXT NOT NULL,
  house BIGINT REFERENCES houses(house_id),
  verified BOOLEAN NOT NULL,
  admin BOOLEAN NOT NULL
);

CREATE TABLE "problems" (
  problem_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  difficulty INT NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT NOT NULL,
  answer TEXT NOT NULL,
  active BOOLEAN,
  active_date TIMESTAMP,
  closed BOOLEAN NOT NULL
);

CREATE TABLE "attempts" (
  attempt_id SERIAL PRIMARY KEY,
  problem_id BIGINT REFERENCES problems(problem_id),
  username VARCHAR(20) REFERENCES users(username),
  points BIGINT NOT NULL,
  house BIGINT REFERENCES houses(house_id),
  attempt_date TIMESTAMP NOT NULL,
  success BOOLEAN NOT NULL
);

INSERT INTO houses (house_name, colour) VALUES('Dalberg', 'RED');
INSERT INTO houses (house_name, colour) VALUES('Savory', 'BLUE');
INSERT INTO houses (house_name, colour) VALUES('Hurley', 'BLACK');