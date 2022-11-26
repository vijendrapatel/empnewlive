var express = require('express');
var router = express.Router();
var db = require('../database');


async function BankDetail(req, res) {
  db.query("SELECT * FROM bankdetail_tbll", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
async function bankdetails(req, res) {
  const id = req.params.idd;
  db.query("SELECT * FROM bankdetail_tbll WHERE staff_id ='" + id + "'", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result)
    }
  });
};


async function bankkcreate(req, res) {
  const id = req.body.staff_id;
  const staff_name = req.body.staff_name;
  const acc_holder = req.body.acc_holder;
  const ifsc_code = req.body.ifsc_code;
  const account_no = req.body.account_no;
  const bank_name = req.body.bank_name;
  const branch_name = req.body.branch_name;
  
db.query(
  "INSERT INTO bankdetail_tbll(staff_id,staff_name,acc_holder,account_no,bank_name,branch_name,ifsc_code) VALUES ('"+id+"','"+staff_name+"','"+acc_holder+"','"+account_no+"','"+bank_name+"','"+branch_name+"','"+ifsc_code+"') ON DUPLICATE KEY UPDATE acc_holder = '"+acc_holder+"',account_no='"+account_no+"',bank_name='"+bank_name+"',branch_name='"+branch_name+"',ifsc_code='"+ifsc_code+"'",[acc_holder,account_no,bank_name,branch_name, ifsc_code],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  }
);
}
module.exports = { BankDetail,  bankdetails,bankkcreate };