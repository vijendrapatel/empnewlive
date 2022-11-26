var express = require('express');
var router = express.Router();
var db=require('../database');

async function getLeavesData(req, res) {
  db.query("SELECT * FROM leave_tbl", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
 }
 async function getPendingLeaves(req, res) {
  db.query("SELECT * FROM leave_tbl Where status =3", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
 }

// async function leaveApproveOrNot(req, res) {
//     const  staff_name=req.body.staff_name;
//     const  gender=req.body.gender;
//     const  email =req.body.email;
//     const  mobile=req.body.mobile;
//     const  doj=req.body.doj;
//     const  address=req.body.address;
//     const  city=req.body.city;
//     const  state=req.body.state;
//     const  country=req.body.country;
   
//   db.query(
//     "INSERT INTO leave_tbl(staff_name, gender,email, mobile, dob,doj,last_working_date,address, city, state,country,department_id,pic,added_by,updated_on,added_on,salary) VALUES ('"+staff_name+"', '"+gender+"','"+email+"', '"+mobile+"','','"+doj+"','','','"+city+"', '"+state+"','"+country+"','','','','','','')",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// }

async function updleaveApproveOrNot(req, res) {
  const id = req.body.id;
  const status=req.body.status;
  db.query(
    "UPDATE leave_tbl SET status='"+status+"' WHERE id = '"+id+"'",
    [ id,status],
    (err, result) => {
      if (err) {
        console.log(err);
      }else {
        res.send(result);
      }
    }
  );
}

module.exports = {getLeavesData,updleaveApproveOrNot,getPendingLeaves};