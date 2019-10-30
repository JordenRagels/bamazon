var mysql = require("mysql");
var inquirer = require("inquirer");

const questions = (sql) => inquirer
    .prompt([{
        type: 'list',
        name: 'menu',
        message: 'Select Menu Item',
        choices: [
            { name: 'View Products for Sale', value: 0 },
            { name: 'View Low Inventory', value: 1 },
            { name: 'Add to Inventory', value: 2 },
            { name: 'Add New Product', value: 3 }
        ]
    }])
    .then(answers => {
        let menuChoice = answers.menu;
        console.log(menuChoice);
        switch (menuChoice) {
            case 1:
                sql.query('SELECT * FROM products WHERE stock_quantity < 5', (err, results) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                    console.log(results);
                })
                break
            case 2:
                sql.query('SELECT * FROM products', (err, result) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                    inquirer.prompt([{
                        type: 'list',
                        name: 'product',
                        message: 'Select Menu Item',
                        choices: result.map(res => ({
                            name: res.product_name,
                            value: res.item_id
                        }))
                    }, {
                        type: 'number',
                        name: 'quantity',
                        message: 'How many???',
                    }]).then(({ product, quantity }) => {
                        sql.query("UPDATE products" +
                            "SET stock_quantity = ?" +
                            "WHERE item_id = ?", [quantity, product], (err, results) => {
                                if (err) {
                                    throw new Error(err.message);
                                }
                                console.log(results);
                            })
                    })
                });
                break
            case 3:
                inquirer.prompt([{
                        type: 'input',
                        name: 'product_name',
                        message: 'Whats it called???',
                    }, {
                        type: 'input',
                        name: 'dept',
                        message: 'What department???',
                    }, {
                        type: 'number',
                        name: 'price',
                        message: 'Cost???',
                    },
                    {
                        type: 'number',
                        name: 'stock_quantity',
                        message: 'How many???',
                    }
                ]).then((product) => {
                    sql.query("INSERT INTO products" +
                        "(product_name,dept,price,stock_quantity) VALUES (?)", [product], (err, results) => {
                            if (err) {
                                throw new Error(err.message);
                            }
                            console.log(results);
                        })
                })
                break
            default:
                sql.query('SELECT * FROM products', (err, results) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                    console.log(results);
                })
        }

    });

// create the connection information for the sql database
const connection = mysql.createPool({
    host: "localhost",
    connectionLimit: 10,
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

questions(connection);