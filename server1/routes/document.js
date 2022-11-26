var express = require('express');
var router = express.Router();
var db=require('../database');


async function setting(req, res) {
    db.query("SELECT * FROM setting",(err, result) =>{
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
}

async function document_tbl(req, res) {
  db.query("SELECT * FROM document_tbl", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

}
async function documentdetail(req, res) {
  const id = req.params.idd;
  db.query("SELECT * FROM document_tbl WHERE staff_id ='"+id+"'",id,(err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result)
    }
  });
};
async function documentcreate(req, res) {
  const  info1=req.body.info1;
  const  info2=req.body.info2;
  const  info3=req.body.info3;
  const  info4=req.body.info4;
  const  info5=req.body.info5;
  const  isverified=req.body.is_verified;
 



  db.query(
      "INSERT INTO document_tbl(info1,info2,info3,info4,info5,info6,is_verified) VALUES ('"+info1+"','"+info2+"','"+info3+"','"+info4+"','"+info5+"','"+isverified+")",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
         
        }
      }
    );
    }
module.exports = {setting,documentcreate,document_tbl,documentdetail};