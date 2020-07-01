DROP DATABASE if exists employee_trackerdb;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
	id INTEGER PRIMARY KEY NOT NULL auto_increment,
    name VARCHAR(30) 
    );

CREATE TABLE role (
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL, 
	salary DECIMAL(8,2) NOT NULL,
    department_id INTEGER NOT NULL
);

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER 
);

INSERT INTO department (name)
VALUES ("Tech");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO, 450, 2");

insert into employee (first_name, last_name, role_id, manager_id)
Values ("Simeon, Ogunyemi, 3, 2");


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;