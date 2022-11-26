var express = require('express');
var router = express.Router();
var db=require('../database');

async function attendance(req, res) {
  const  atd_date=req.params.date;
    db.query("SELECT * FROM attendance_tbl WHERE atd_date ='"+atd_date+"' ", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
}
async function dailyattendance(req, res) {
  const  firstdate=req.params.firstdate;
  const  lastdate=req.params.lastdate;
  const staffid = req.params.employeeid;
  db.query("SELECT * FROM attendance_tbl WHERE atd_date BETWEEN '"+firstdate+"' AND '"+lastdate+"' AND staff_id = '"+staffid+"'",(err, result) => {

  if (err) {
    console.log(err);
  } else {
    res.send(result);
  }

});
}
async function attendancecreate(req, res) {
    const  staff_id=req.body.staff_id;
    const  staff_name=req.body.staff_name;
    const  status=req.body.Status;
    
  db.query(
    "INSERT INTO attendance_tbl(staff_id,staff_name, Status) VALUES ('"+staff_id+"','"+staff_name+"','"+status+"')",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  }
 
  async function attendancecreate(req, res) {
    const  staff_id=req.body.staff_id;
    const  staff_name=req.body.staff_name;
    const  status=req.body.Status;
    const  atd_date=req.body.atd_date;
    
  db.query(
    "INSERT INTO attendance_tbl(staff_id,staff_name, Status,atd_date) VALUES ('"+staff_id+"','"+staff_name+"','"+status+"','"+atd_date+"') ON DUPLICATE KEY UPDATE Status = '"+status+"'",status,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  }
// history

async function attendancehistory(req, res) {
  const  firstdate=req.params.firstdate;
  const  lastdate=req.params.lastdate;
  db.query("SELECT staff_tbl.id, staff_tbl.staff_name, staff_tbl.gender, staff_tbl.city, staff_tbl.dob,staff_tbl.address,attendance_tbl.atd_date, SUM(attendance_tbl.Status = 1) HD, SUM(attendance_tbl.Status=2) CL, SUM(attendance_tbl.Status = 3) ML, SUM(attendance_tbl.Status=4) EL, SUM(attendance_tbl.Status = 5) UA, SUM(attendance_tbl.Status=6) IA, SUM(attendance_tbl.Status=7) LC FROM staff_tbl LEFT join attendance_tbl on staff_tbl.id=attendance_tbl.staff_id AND atd_date BETWEEN '"+firstdate+"' AND '"+lastdate+"' GROUP BY staff_tbl.id , staff_name ORDER BY `staff_tbl`.`id` ASC",(err, result) => {

  if (err) {
    console.log(err);
  } else {
    res.send(result);
  }

});
}

async function attendancehistoryy(req, res) {
  const  idd=req.params.idd;
  const  firstdate=req.params.firstdate;
  const  lastdate=req.params.lastdate;
  db.query("SELECT staff_tbl.id, staff_tbl.staff_name, staff_tbl.gender, staff_tbl.city, staff_tbl.dob,staff_tbl.address,attendance_tbl.atd_date, SUM(attendance_tbl.Status = 1) HD, SUM(attendance_tbl.Status=2) CL, SUM(attendance_tbl.Status = 3) ML, SUM(attendance_tbl.Status=4) EL, SUM(attendance_tbl.Status = 5) UA, SUM(attendance_tbl.Status=6) IA, SUM(attendance_tbl.Status=7) LC FROM staff_tbl LEFT join attendance_tbl on staff_tbl.id=attendance_tbl.staff_id AND atd_date BETWEEN '"+firstdate+"' AND '"+lastdate+"'  WHERE staff_tbl.id = '"+idd+"'  GROUP BY staff_tbl.id , staff_name ORDER BY `staff_tbl`.`id` ASC",(err, result) => {

  if (err) {
    console.log(err);
  } else {
    res.send(result);
  }

});
}

module.exports = {attendance,attendancecreate,dailyattendance,attendancehistory,attendancehistoryy};
