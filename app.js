const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { urlToHttpOptions } = require('url');




// connection to sql db
const connection = mysql.createConnection({
    host: 'localhost',
    //port: 3305,
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
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
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

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'What department do you want to add?'
            }
        ])
        .then(function (selected) {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: selected.newDepartment
                });

        const query = 'SELECT * FROM department';
        connection.query(query, function(err, res) {
            if(err)throw err;
            console.log('New department added!');
            console.table('All Departments:', res);
            prompts();
        })
        })
};

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: 'new_role',
                    type: 'input',
                    message: "What role to add?"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What salary does this role make?'
                },
                {
                    name: 'Department',
                    type: 'list',
                    choices: function() {
                        let departmentStorage = [];
                        for (let i = 0; i < res.length; i++) {
                            departmentStorage.push(res[i].name);
                        }
                        return departmentStorage;

                    },
                }
            ])
            .then(function (selected) {
                let department_id;
                for (let x = 0; x < res.length; x++) {
                    if (res[x].name == selected.Department) {
                        department_id = res[x].id;
                    }
                }
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: selected.new_role,
                        salary: selected.salary,
                        department_id: department_id
                    },
                    function (err, res) {
                        if(err)throw err;
                        console.log('New role added!');
                        console.table('All Roles:', res);
                        prompts();
                    }
                )
            })
    })
};

function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: 'What is employee first name?'
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is employyee last name?'
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                        let roleData = [];
                        for (let i = 0; i < res.length; i++) {
                            roleData.push(res[i].title);
                        }
                        return roleData;
                    },
                    message: 'What is employee role?'
                }
            ])
            .then(function (selected) {
                let role_id;
                for (let x = 0; x < res.length; x++) {
                    if (res[x].title == selected.role) {
                        role_id = res[x].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: selected.first_name,
                        last_name: selected.last_name,
                        manager_id: selected.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Employee Added!');
                        prompts();
                    }
                )
            })
    })
};
