var express = require('express');
var router = express.Router();
var db=require('../database');


async function employees(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM staff_tbl WHERE id ='"+id+"'",id,(err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result)
      }
    });
  };

  

module.exports = router;
