var express = require("express");
var router = express.Router();
var db = require("../database");
var moment = require("moment");

async function getholiday(req, res) {
  const  firstdate=req.params.firstdate;
  const  lastdate=req.params.lastdate;
  db.query("SELECT * ,(SELECT COUNT(DISTINCT(holiday_date)) FROM events_tbl as ev1 WHERE holiday_date BETWEEN '"+firstdate+"' AND '"+lastdate+"') as count FROM events_tbl ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
async function getholidayData(req, res) {
  db.query("SELECT id,event,discription,is_holiday,status,group_id,(SELECT min(holiday_date) FROM events_tbl as ev1 WHERE ev1.group_id=ev.group_id) as from_holiday_date,(SELECT max(holiday_date)  FROM events_tbl as ev1 WHERE ev1.group_id=ev.group_id) as to_holiday_date FROM events_tbl as ev GROUP BY group_id ORDER BY id ASC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

// async function holidaycount(req, res) {
//   const  firstdate=req.params.firstdate;
//   const  lastdate=req.params.lastdate;
//   db.query("SELECT COUNT(*) AS count FROM events_tbl WHERE holiday_date BETWEEN  '"+firstdate+"' AND '"+lastdate+"' ",(err, result) => {

//   if (err) {
//     console.log(err);
//   } else {
//     res.send(result);
//   }
// });
// }


async function holidayCreate(req, res) {
  const diffmnth = req.body.diffmnth;
  let fromDays = req.body.fromDays;
  const toDays = req.body.toDays;
  const event = req.body.event;
  const desc = req.body.discription;
  const is_holiday = req.body.is_holiday;
  const status = req.body.status;

  db.query("SELECT MAX(group_id) AS groupid FROM events_tbl", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      
      let groupid = parseInt(result[0].groupid);
      groupid = groupid + 1;
      let i = 0;
      while (i <= diffmnth) {
        db.query(
          "INSERT INTO events_tbl(event, discription,holiday_date,group_id,is_holiday,status) VALUES ('" +
            event +
            "','" +
            desc +
            "','" +
            fromDays +
            "','" +
            groupid +
            "','" +
            is_holiday +
            "','" +
            status +
            "')",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              // res.send("Values Inserted -->" + result);
            }
          }
        );
        fromDays = moment(fromDays).add(1, "days").format("YYYY-MM-DD");
        i++;
      }
      res.send(result);
    }
  });
}





async function holidayDelete(req, res) {
  const group_id = req.params.group_id;
  db.query(
    "DELETE FROM events_tbl WHERE group_id = '" + group_id + "'",
    group_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}
module.exports = {
  getholidayData,
  holidayCreate,
  holidayDelete,
  getholiday
};
