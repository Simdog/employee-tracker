const mysql = require('mysql');
const inquirer = require("inquirer");
const util = require("util");
const consoleTable = require("console.table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "opeyemi",
    database: "employeeTracker_db"
});

const query = util.promisify(connection.query).bind(connection);

connection.connect(function (err) {
    if (err) throw err;
    console.log(`\nWelcome to the employee tracker / updater.\n`);

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
                    display("employee", "EMPLOYEES");
                    break;
                case "View departments":
                    display("Department");
                    break;
                case "View roles":
                    display("Role");
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

function display(tableName, displayName) {
    connection.query(`SELECT * FROM ${tableName}`, function (err, data) {
      if (err) throw err;
      console.table(`\n ${displayName}`.brightWhite, data);
      startOptions();
    });
  }
  
function addDepartment () {
    inquirer 
        .prompt ([
            {
                name: "departmentID",
                type: "input",
                message: "Enter Department ID Number:"
            },
            {
            name: "departmentName",
            type: "input",
            message: "What is the name of the department you are adding?"
        }
    ])
        .then (answer => {
            connection.query("INSERT INTO department SET ?",
             {
                 id: answer.departmentID,
                 name: answer.departmentName
             },
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
                name: "roleID",
                type: "input",
                message: "Enter Role ID Number:"
            },
            {
                name: "roleName",
                type: "input",
                message: "What is the role title you would like to add?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "roleDeptID",
                type: "input",
                message: "Enter Department ID for this Role:"
            }
        ])
        .then (answer => {
            connection.query("INSERT INTO role SET ?", 
            {
                id: answer.roleID,            
                title: answer.roleName,
                salary: answer.roleSalary,
                department_id: answer.roleDeptID
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
                name: "employeeID",
                type: "input",
                message: "Enter Employee's ID Number:"
            },
            {
                name: "employeeFirst",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "employeeLast",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "employeeRoleID",
                type: "input",
                message: "Enter Employee's Role ID:"
            },
            {
                name: "employeeManagerID",
                type: "input",
                message: "Enter Employee's Manager's ID:"
            },
        ])
        .then (answer => {
            connection.query("INSERT INTO employee SET ?", 
            {
                id: answer.employeeID,
                first_name: answer.employeeFirst,
                last_name: answer.employeeLast,
                role_id: answer.employeeRoleID,
                manager_id: answer.employeeManagerID
            },
            function (err) {
                if (err) throw err;
                console.log("The first name and last name of " + answer.employeeFirst + " " + answer.employeeLast + " has successfully been added.");
                startOptions();
            }
        );
     });

};

function exitApp () {
    connection.end();
};



