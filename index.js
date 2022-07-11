const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db1'
})

//connect to mysql
db.connect(err => {
    if(err){
        throw err
    }
    console.log("MySQL connected")
})

const app = express()

//create db
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE db1'
    db.query(sql,err => {
        if(err){
            throw err
        }
        res.send('Database created')
    })
})

//create table
app.get('/createemp', (req,res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT,name VARCHAR(255),designation VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql,err => {
        if(err){
            throw err
        }
        res.send('Employee table created');
    });
})

//Insert employee
app.get('/emp1', (req,res) =>{
    let post = {name: 'Dan Brown',designation: 'CEO'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql,post,err => {
        if(err)
        {
            throw err
        }
        res.send('Employee added')
    })
})

//select employees
app.get('/getemp', (req,res) => {
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql,(err,results) =>{
        if(err)
        {
            throw err
        }
        console.log(results)
        res.send('Employee details fetched')
    })
})

//update employee
app.get('/updateemp/:id',(req,res) => {
    let newName = 'Xavier Harris'
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`
    let query = db.query(sql,err =>{
        if(err)
        {
            throw err
        }
        res.send('Employee updated')
    })
})

//delete employee
app.get('/deleteemp/:id',(req,res) => {
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
    let query = db.query(sql,err => {
        if(err)
        {
            throw err
        }
        res.send("Employee deleted")
    })
})

app.listen(3000, () =>{
    console.log('Service started on port 3000')
})


