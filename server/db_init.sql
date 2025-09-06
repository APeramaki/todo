DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS accounts;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

INSERT INTO tasks (description) VALUES
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features'),
('Fix the reported bugs'),
('Deploy the application to production'),
('Conduct a code review with peers');


create table accounts (
id serial primary key,
email varchar(50) not null unique,
password varchar(255) not null
);