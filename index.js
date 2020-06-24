const mysql = require('mysql');
const inquirer = require("inquirer");
const util = require("util");

let connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "opeyemi",
    database: "employees_db"
});

const query = util.promisify(connection.query).bind(connection);

connection.connect(function (err) {
    if (err) throw err;

    startOptions();
});



function startOptions () {
    inquirer
        .prompt({
            type: "list",
            message: "What would you like to do today?", 
            name: "options",
            choices: ["Add department", "Add role", "Add employee", "View employees", "View departments", "View roles", "Update employee role", "Exit" ]

        })
        .then (answer => {
            switch (answer.options){
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "View departments":
                    viewDepartment();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "Update employee role":
                    updateEmployee ();
                    break;
                case "Exit":
                    exitApp();
                    break;
            }
        })
};

function addDepartment () {
    inquirer 
        .prompt ({
            name: "departmentName",
            type: "input",
            message: "What is the name of the department you are adding?"
        })
        .then (answer => {
            connection.query("INSERT INTO department SET name = ?", [answer.departmentName],
            function (err) {
                if (err) throw err;
                console.log("You have successfully added " + answer.departmentName + " to your department.");
                startOptions();
            }
            
            )
        })

};

function addRole () {
    inquirer
        .prompt([
            {
                name: "roleName",
                type: "input",
                message: "What is the role title you would like to add?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the salary for this role?"
            }
        ])
        .then (answer => {
            connection.query("INSERT INTO role SET ?", 
            {
                title: answer.roleName,
                salary: answer.roleSalary
            },
            function (err) {
                if (err) throw err;
                console.log("The salary of " + answer.roleSalary + " was successfully added to the role " + answer.roleName + ".");
                startOptions();
            }
        );
     });
};

function addEmployee () {
    inquirer
        .prompt([
            {
                name: "employeeFirst",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "employeeLast",
                type: "input",
                message: "What is the employee's last name?"
            }
        ])
        .then (answer => {
            connection.query("INSERT INTO employee SET ?", 
            {
                first_name: answer.employeeFirst,
                last_name: answer.employeeLast
            },
            function (err) {
                if (err) throw err;
                console.log("The first name and last name of " + answer.employeeFirst + " " + answer.employeeLast + " has successfully been added.");
                startOptions();
            }
        );
     });

};



// = [
//     {
//     type: "list",
//     message: "What would you like to do today?",
//     name: "options",
//     choices: [
//         {
//             name: "View Department / Employees",
//             value: "VIEW",

//         },
//         {
//             name: "Update Employees", 
//             value: "UPDATE"
//         },
//         {
//             name: "Add Departments",
//             value: "DEPARTMENT",

//         },
//         {
//             name: "Exit the app",
//             value: "EXIT"
//         }
//         // "Add department roles",
//         // "View department roles",
//         // "Update employee roles",
//     ]
// }]

