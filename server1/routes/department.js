var express = require('express');
var router = express.Router();
var db=require('../database');


async function Department(req, res) {
    db.query("SELECT * FROM department_tbl ORDER BY id DESC", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
}
async function Departmentcreate(req, res) {
  const  department_name=req.body.department_name;
 
db.query(
  "INSERT INTO department_tbl(department_name) VALUES ('"+department_name+"')",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  }
);
}

async function Departmentupdate(req, res) {
  const id = req.body.id;
  const department_name = req.body.department_name;

    db.query("UPDATE department_tbl SET department_name = '"+department_name+"'  WHERE id = '"+id+"'", [department_name, id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
}
async function Departmentdelete(req, res) {
  const id = req.params.id;
    db.query("DELETE FROM department_tbl WHERE id ='"+id+"'",id,(err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
}
module.exports = {Department,Departmentcreate,Departmentdelete,Departmentupdate};
