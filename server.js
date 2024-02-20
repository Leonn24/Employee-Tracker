const  { prompt } = require("inquirer");
const db = require('./db/db')
const cTable = require("console.table");



// Function to start the application
function startApp() {
  prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  }).then((answer) => {
    switch (answer.action) {
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployeeRole();
        break;
      case "Exit":
        db.end();
        console.log("Goodbye!");
        break;
    }
  });
}


// Function to view all departments
function viewDepartments() {
  const query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table('Departments:', res);
    startApp(res);
  });
}

// Function to view all roles
function viewRoles() {
  const query = "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table('Roles:', res);
    startApp(res);
  });
}

// Function to view all employees
function viewEmployees() {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS 'department', role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table('Employees:', res);
    startApp(res);
  });
}

// Function to add a department
function addDepartment() {
  prompt({
    name: "name",
    type: "input",
    message: "Enter the name of the department:",
  }).then((answer) => {
    const query = "INSERT INTO department (name) VALUES (?)";
    db.query(query, answer.name, (err, res) => {
      if (err) throw err;
      console.log("Department added successfully!");
      startApp();
    });
  });
}

// Function to add a role
function addRole() {
  prompt([
    {
      name: "title",
      type: "input",
      message: "Enter the title of the role:",
    },
    {
      name: "salary",
      type: "input",
      message: "Enter the salary for this role:",
    },
    {
      name: "department",
      type: "input",
      message: "Enter the department ID for this role:",
    },
  ]).then((answers) => {
    const query =
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    db.query(
      query,
      [answers.title, answers.salary, answers.department],
      (err, res) => {
        if (err) throw err;
        console.log("Role added successfully!");
        startApp();
      }
    );
  });
}

// Function to add an employee
function addEmployee() {
  prompt([
    {
      name: "first_name",
      type: "input",
      message: "Enter the employee's first name:",
    },
    {
      name: "last_name",
      type: "input",
      message: "Enter the employee's last name:",
    },
    {
      name: "role",
      type: "input",
      message: "Enter the employee's role ID:",
    },
    {
      name: "manager",
      type: "input",
      message: "Enter the employee's manager ID (if applicable):",
    },
  ]).then((answers) => {
    const query =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    db.query(query,
      [answers.first_name, answers.last_name, answers.role, answers.manager],
      (err, res) => {
        if (err) throw err;
        console.log("Employee added successfully!");
        startApp();
      }
    );
  });
}

// Function to update an employee role
function updateEmployeeRole() {  
  const query =
    'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee';
  db.query(query, (err, employees) => {
    if (err) throw err;
    const employeeChoices = employees.map((employee) => ({
      name: employee.name,
      value: employee.id,
    }));
    prompt([
      {
        name: "employeeId",
        type: "list",
        message: "Select the employee to update:",
        choices: employeeChoices,
      },
      {
        name: "roleId",
        type: "input",
        message: "Enter the new role ID for this employee:",
      },
    ])
      .then((answers) => {
        const query = "UPDATE employee SET role_id = ? WHERE id = ?";
        db.query(query, [answers.roleId, answers.employeeId], (err, res) => {
          if (err) throw err;
          console.log("Employee role updated successfully!");
          startApp();
        });
      });
  });
}

startApp();
