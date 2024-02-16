INSERT INTO department (name)
VALUES
('IT'),
('Administration'),
('Security'),
('Payroll');

INSERT INTO role(title, salary, department_id)
VALUES
('Lead IT', 100000, 1),
('Software Engineer', 95000, 1),
('Admin', 150000, 2),
('Manager', 130000, 2),
('Officer', 85000, 3),
('Secretary', 65000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Dave', 'Smith', 1, NULL),
('Jane', 'Doe', 2, 1),
('Luke', 'Johnson', 3, NULL),
('Kevin', 'Lee', 4, 3),
('James', 'Blake', 5, NULL), 
('Tim', 'Scott', 6, 5);        
