var express = require("express");
var router = express.Router();
var db = require("../database");
async function salary(req, res) {
  const firstdate = req.params.firstdate;
  const lastdate = req.params.lastdate;
  db.query("SELECT staff_tbl.id,staff_tbl.staff_name,staff_tbl.salary,salary_tbl.total,salary_tbl.added_on,salary_tbl.updated_on FROM staff_tbl LEFT JOIN salary_tbl ON salary_tbl.staff_id=staff_tbl.id AND salary_tbl.added_on BETWEEN '" + firstdate + "' AND '" + lastdate + "' ORDER BY staff_tbl.id  DESC ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

async function salarydetail(req, res) {
  const id = req.params.idd;
  db.query(
    "SELECT * FROM salary_tbl WHERE staff_id='" + id + "'",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

async function salarycreate(req, res) {

  const staff_id = req.body.staff_id;
  const staff_name = req.body.staff_name;
  const basic_salary = req.body.basic_salary;
  const allowance = req.body.allowance;
  const total = req.body.total;
  const added_by = req.body.added_by;
  const updated_on = req.body.updated_on;
  const tax = req.body.tax;

  db.query(
    "INSERT INTO salary_tbl(staff_id,staff_name,basic_salary,allowance,total,added_by,updated_on,tax) VALUES ( '" +
    staff_id +
    "','" + staff_name + "','" +
    basic_salary +
    "', '" +
    allowance +
    "','" +
    total +
    "','" +
    added_by +
    "', '" +
    updated_on +
    "','" +
    tax +
    "') ON DUPLICATE KEY UPDATE total = '" + total + "'", total,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted" + JSON.stringify(result));
      }
    }
  );
}

module.exports = { salary, salarydetail, salarycreate };
