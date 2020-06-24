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
            switch (answer.startOptions){
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
                    view
                    break;
                case "View roles":
                    view
                    break;
            }
        })
}


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

const departmentRoles = [{
    type: "input",
    name: "name",
    message: "What's the name of your new Department?"
}, 
{
    type: "input",
    name: "id",
    message: "What's the ID of your employee?"
},
{
    type: "input",
    name: "email",
    message: "What's the Email of your employee?"
}] 