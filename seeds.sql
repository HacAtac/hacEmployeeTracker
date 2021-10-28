USE employee_tracker_db;

INSERT INTO department (name)
VALUES
('Engineer'),
('Legal'),
('Manager'),
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

SELECT e.id, e.first_name, e.last_name, d.name AS department, r.title, r.salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id ASC;
SELECT r.id, r.title, r.salary, d.name AS Department_Name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id;
