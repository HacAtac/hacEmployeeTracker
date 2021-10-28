var inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { urlToHttpOptions } = require('url');



// connection to sql db
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Chiefy21!',
    database: 'employee_tracker_db'
})

// connects to sql server + db and calls options function for inquire prompts
connection.connect(function(err){
    if(err) throw err;
    prompts();

})

function prompts() {
    inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'Employee database, what shall we do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a role',
                'Add a department',
                'Update employee role',
                'Delete an employee',
                'exit'
            ]
        })
        .then(function (selected) {
            switch (selected.choice) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRole();
                    break;
            }
        })
};
// function for all employees utilizing mysql 2 SELECT * FROM employeeand res.length 
function viewEmployees() {
    const query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'workers found');
        console.table('All employees:', res);
        prompts();
    })
};

function viewDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Departments:', res);
        prompts();
    })
};

function viewRole() {
    const query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        prompts();
    })
};
