const express = require("express");
const mysql = require("mysql");
let app = express();
let bodyparser = require("body-parser");
const cors = require("cors");
let jwt = require('jsonwebtoken');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors({ origin: "http://localhost:4200" }));

// To establish connection MySql Server
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users_project"
});

// To check weather connection established or not
con.connect(function(error) {
    if(!error) {
        console.log("DB connection succeded.");
    } else {
        console.log("DB connection failed \n Error " + JSON.stringify(error, undefined, 2));
    }
});

app.listen(3000, () => console.log("Express server is running at port number: 3000"));

// Get all users from users table
app.get("/getAllUsers", verifyToken, (req, res) => {
    con.query("SELECT * FROM users", (error, rows) => {
        if (!error) {
            res.send(rows);
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Get an single user from users table
app.get("/getSingleData/:id", verifyToken, (req, res) => {
    con.query("SELECT * FROM users WHERE id = ?", [req.params.id], (error, results, fields) => {
        if (!error) {
            res.setHeader('content-type','application/json');
            return res.send(JSON.stringify(results));
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Delete an single user from users table
app.delete("/deleteSingleData/:id", verifyToken, (req, res) => {
    con.query("DELETE FROM users WHERE id = ?", [req.params.id], (error,results) => {
        if (!error) {
           // res.send({ 'deleted': true ,'response':200});
           res.setHeader('content-type','application/json');
           return res.send(JSON.stringify(results));
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Insert an user into users table
app.post("/addUser", verifyToken, (req, res) => {
    con.query("INSERT INTO users (username, password, email, phone) VALUES(?, ?, ?, ?)", [req.body.username, req.body.password, req.body.email, req.body.phone], (error,results) => {
        if (!error) {
            res.setHeader('content-type','application/json');
            return res.send(JSON.stringify(results));
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});
// New user registration
app.post("/addNewUser", (req, res) => {
    con.query("INSERT INTO users (username, password, email, phone) VALUES(?, ?, ?, ?)", [req.body.username, req.body.password, req.body.email, req.body.phone], (error,results) => {
        if (!error) {
            res.setHeader('content-type','application/json');
            return res.send(JSON.stringify(results));
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Update an User in User table
app.put("/updateUser/:id", verifyToken, (req, res) => {
    con.query("UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?", [req.body.username, req.body.email, req.body.phone, req.params.id], (error,results) => {
        if (!error) {
            res.setHeader('content-type','application/json');
            return res.send(JSON.stringify(results));
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Login function
app.post("/signin", (req, res) => {
    con.query("SELECT * FROM users WHERE username = ?", [req.body.username], (error, rows, fields) => {
        if (!error) {
            if (rows.length > 0) {
                if (rows[0].password === req.body.password) {
                    // res.send({msg: "User logged in Successfully"});
                    let token = jwt.sign({username: rows[0].username}, 'secret');
                    return res.status(200).send({token: token});
                } else {
                    res.send({msg: "Invalid Password."});
                }
            } else {
                res.send({msg: "User does not exists."});
            }
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Function to verify the token
function verifyToken(req, res, next) {
    const header = req.headers['authorization'];

    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];

        jwt.verify(token, "secret", (error) => {
            if (!error) {
                next();
            } else {
                return req.status(400).send({msg: "Unautherized request"});
            }
        });
    } else {
        res.status(403).send("Forbidden");
    }
}