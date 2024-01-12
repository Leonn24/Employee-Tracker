const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'port',
        database: 'office_db'
    },
    console.log('Connected to Database.')
);

function viewAllDepartments() {
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        startApp();
    })
}

function viewAllRoles() {
    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        startApp();
    })
}
function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        startApp();
    })
}


function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "Department",
            message: "What data would you like to access?",
            choices: ["View All Departments","View All Roles", "View All Employees"],
        }
    ])
    .then((answer) => {
        switch (answer.option) {
            case 'View all departments':
                viewAllDepartments();
                break;
                case 'View all Employees':
                viewAllEmployees();
                break;
                case 'View all Roles':
                viewAllRoles();
                break;
        }
    })
}

// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

startApp();