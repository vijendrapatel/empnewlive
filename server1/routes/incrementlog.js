var express = require('express');
var router = express.Router();
var db=require('../database');



async function incrementlog(req, res) {
    db.query("SELECT * FROM increment_log", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  };
  async function incrementdetail(req, res) {
    const id = req.params.idd;
    db.query("SELECT * FROM increment_log WHERE staff_id ='"+id+"'",id,(err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result)
      }
    });
  };
  async function incrementlogcreate(req, res) {
    const  staff_id=req.body.staff_id;
      const  staff_name=req.body.staff_name;
      const  old_salary=req.body.old_salary;
      const  new_salary=req.body.new_salary;
      const  applied_on=req.body.applied_on;
    
  db.query(
    "INSERT INTO increment_log(staff_id,staff_name,old_salary,new_salary,applied_on) VALUES ('"+staff_id+"','"+staff_name+"','"+old_salary+"','"+new_salary+"','"+applied_on+"') ON DUPLICATE KEY UPDATE staff_name = '"+staff_name+"',old_salary='"+old_salary+"',new_salary='"+new_salary+"',applied_on='"+applied_on+"'",[staff_name,old_salary,new_salary,applied_on],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  }
  // async function incrementlogcreate(req, res) {
  //   const  staff_id=req.body.staff_id;
  //   const  staff_name=req.body.staff_name;
  //   const  old_salary=req.body.old_salary;
  //   const  new_salary=req.body.new_salary;
  //   const  applied_on=req.body.applied_on;
  //   db.query(
  //       "INSERT INTO increment_log(staff_id,staff_name,old_salary,new_salary,applied_on) VALUES ('"+staff_id+"','"+staff_name+"','"+old_salary+"','"+new_salary+"','"+applied_on+"')",
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           res.send(result);
           
  //         }
  //       }
  //     );
  //     }
  //     async function incrementlogupdate(req, res) {
  //       const  id=req.body.staff_id;
  //       const  staff_name=req.body.staff_name;
  //       const  old_salary=req.body.old_salary;
  //       const  new_salary=req.body.new_salary;
  //       const  applied_on=req.body.applied_on;
  //       db.query(
  //         "UPDATE increment_log SET staff_name='"+staff_name+"',old_salary='"+old_salary+"', new_salary='"+new_salary+"',applied_on='"+applied_on+"' WHERE staff_id = '"+id+"'",
  //         [ id,
  //           staff_name,
  //           old_salary,
  //           new_salary,
  //           applied_on,
  //         ],
  //         (err, result) => {
  //           if (err) {
  //             console.log(err);
  //           }else {
  //             res.send(result);
  //           }
  //         }
  //       );
  //         }

  module.exports = {incrementlog,incrementdetail, incrementlogcreate};