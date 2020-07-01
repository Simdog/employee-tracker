USE employeeTracker_db;


INSERT INTO department (name) VALUES ("Sales"), ("Development"), ("Sales Manager");
INSERT INTO role (title, salary, department_id) VALUES ("Sales Recruit", 30000, 1), ("Sales Lead", 90000, 1), ("Junior Engineer", 50000, 2), ("Lead", 80000, 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kanye", "West", 2), ("Lil", "Wayne", 4), ("Karen", "Ken", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Leo", "DaVinci", 1, 2), ("Tony", "Hawk", 3, 4), ("Bryan", "Griffin", 5, 6);