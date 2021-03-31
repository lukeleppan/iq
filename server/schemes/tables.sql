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
  house BIGINT REFERENCES houses(house_id)
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
  solved BOOLEAN NOT NULL
);

CREATE TABLE "attempts" (
  attempt_id SERIAL PRIMARY KEY,
  problem_id BIGINT REFERENCES problems(problem_id),
  username VARCHAR(20) REFERENCES users(username),
  attempt_date TIMESTAMP NOT NULL,
  success BOOLEAN NOT NULL
);

CREATE TABLE "admins" (
  admin_username TEXT PRIMARY KEY,
  hash TEXT,
  salt TEXT
);