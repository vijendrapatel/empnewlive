var express = require('express');
var router = express.Router();
var db = require('../database');







async function employees(req, res) {
  db.query("SELECT * FROM staff_tbl ORDER BY id desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

}
async function country(req, res) {
  db.query("SELECT * FROM country_tbl", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

async function state_list(req, res) {
  db.query("SELECT * FROM state_list", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
async function all_cities(req, res) {
  const stateId = req.params.stateId;
  console.log("stateId" + stateId)
  db.query("SELECT * FROM all_cities WHERE state_code='" + stateId + "'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};



async function employeecreate(req, res) {
  const staff_name = req.body.staff_name;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const doj = req.body.doj;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const department_id = req.body.department_id;
  const last_working_date = req.body.last_working_date;
  const qualification = req.body.qualification;
  const alternate_no = req.body.alternate_no;
  const experience = req.body.experience;
  const skills = req.body.skills;
  const salary = req.body.salary;
  const status = req.body.status;

  // if (!req.file) {
  //   console.log("file--------> "+JSON.stringify(req.file))
  //     console.log("No file upload");
  // } else {
  //   console.log(req.file.filename)
  //   const imgsrc = 'http://localhost:3000/images/'+ req.file.filename


  db.query(
    "INSERT INTO staff_tbl(staff_name,gender,email,mobile,dob,doj,city,state,country,department_id,address,last_working_date,pic,qualification,alternate_no,experience,skills,salary,status) VALUES ('" + staff_name + "','" + gender + "','" + email + "','" + mobile + "','" + dob + "','" + doj + "','" + city + "','" + state + "','" + country + "','" + department_id + "','" + address + "','" + last_working_date + "','','" + qualification + "','" + alternate_no + "','" + experience + "','" + skills + "','" + salary + "','" + status + "')",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);

      }
    }
  )
}
// }
async function employeesdetail(req, res) {
  const id = req.params.id;
  db.query("SELECT * FROM staff_tbl WHERE id ='" + id + "'", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result)
    }
  });
};

async function updEmpDetail(req, res) {
  const id = req.body.id;
  const staff_name = req.body.staff_name;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;
  const mobile = req.body.mobile;
  const doj = req.body.doj;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const department_id = req.body.department_id;
  const last_working_date = req.body.last_working_date;
  const qualification = req.body.qualification;
  const alternate_no = req.body.alternate_no;
  const experience = req.body.experience;
  const skills = req.body.skills;
  const status = req.body.status;
const salary=req.body.salary;
console.log("salll"+salary)

  db.query(
    "UPDATE staff_tbl  SET staff_name='" + staff_name + "',dob='" + dob + "', gender='" + gender + "',email='" + email + "',password='" + password + "', mobile='" + mobile + "',doj='" + doj + "',last_working_date='" + last_working_date + "',address='" + address + "', city='" + city + "', state='" + state + "',country='" + country + "',department_id='" + department_id + "',qualification='" + qualification + "',alternate_no='" + alternate_no + "',experience='" + experience + "',skills='" + skills + "',status='" + status + "',salary='"+salary+"' WHERE id = '" + id + "'",
    [id,
      staff_name,
      gender,
      email,
      password,
      mobile,
      dob,
      doj,
      address,
      city,
      state,
      country,
      department_id,
      last_working_date,
      qualification,
      alternate_no,
      experience,
      skills,
      status,
      salary
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}
async function updsalary(req, res) {
const salary=req.body.salary;
const id=req.body.id;
  db.query(
    "UPDATE staff_tbl  SET salary='"+salary+"' WHERE id = '" + id + "'",
      [salary,id],(err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

async function empdelete(req, res) {
  const id = req.params.id;
  db.query("DELETE FROM staff_tbl WHERE id = '" + id + "'", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
}
module.exports = { employees, employeecreate, country, state_list, all_cities, employeesdetail, updEmpDetail, empdelete,updsalary }