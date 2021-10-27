USE employee_tracker_db;

INSERT INTO department (name)
VALUES
('Engineer'),
('Legal'),
('HR'),
('Security'),
('Maintenance'),
('Finance'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer', 100000, 1),
('Sales Rep', 60000, 7),
('Company Lawyer', 100000, 2),
('Manager', 90000, 3),
('Property Security', 45000, 4),
('Property Maintenance', 45000, 5),
('Accountant', 65000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ryan', 'Smith', 1, 100),
('Cameron', 'Robinson', 2, 101),
('Saied', 'Ghalbitron', 3, 102),
('Cj', 'Liv', 4, 103),
('Brandon', 'Cortez', 5, 104),
('Jacob', 'Hernandez', 6, 105),
('Henry', 'Sainz', 7, 106);