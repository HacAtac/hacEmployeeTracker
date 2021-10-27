var inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');



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
            name: 'action',
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
    
}
