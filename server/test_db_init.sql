DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

INSERT INTO tasks (description) VALUES
  ('My test task'),
  ('My other test task'),
