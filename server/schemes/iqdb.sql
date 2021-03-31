CREATE TABLE problems (
  problem_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  difficulty INT NOT NULL,
  image_url TEXT,
  answer TEXT NOT NULL,
  active BOOLEAN,
  active_date TIMESTAMP,
  solved BOOLEAN NOT NULL
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  
)

CREATE TABLE attempts (
  attempt_id SERIAL PRIMARY KEY,
  problem_id BIGINT REFERENCES problems(problem_id),
  attempt_by TEXT NOT NULL,
  attempt_date TIMESTAMP NOT NULL,
  attempt_house TEXT NOT NULL,
  success BOOLEAN NOT NULL
);