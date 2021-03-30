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