const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');
const path = require('path');
var db=require('./database');
const {updsalary,employees,employeecreate,country,state_list,all_cities,employeesdetail,updEmpDetail,empdelete} = require("./routes/employees")
const {attendance,attendancecreate} = require("./routes/attendance")
const {Department,Departmentcreate,Departmentdelete,Departmentupdate} = require("./routes/department")
const session = require('express-session');
const {login,checklogin} = require('./routes/login/login')
const {salary,salarydetail,salarycreate} = require("./routes/salary")
const {dailyattendance,attendancehistory,attendancehistoryy} = require("./routes/attendance")
const {BankDetail,Bankdetailcreate,Bankdetailupdate,bankdetails,bankkcreate} = require("./routes/bankdetail")
const {incrementlog,incrementlogcreate,incrementdetail,incrementlogupdate} = require("./routes/incrementlog")
const {getLeavesData,updleaveApproveOrNot,getPendingLeaves} = require("./routes/leaves")
const {getholidayData,holidayCreate,holidayDelete,getholiday} = require("./routes/holiday");
const {setting} = require("./routes/document")
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true,
}
));
// app.use(cors());
app.use(express.json());
app.use(express.static("./public"))
app.use(session({
  name: 'session',
  secret: 'crud',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 60 * 30,
      sameSite: 'strict',
  }
}))
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      
  }
})

var upload = multer({
  storage: storage
})

app.get('/employees',employees);
app.post('/update',updEmpDetail);
app.post('/updatee',updsalary);
app.post('/create',employeecreate);
app.post('/delete/:id',empdelete);
app.get('/employeedetail/:id',employeesdetail);
app.get('/country_name',country);
app.get('/attendance/:date',attendance);
app.post('/attendance/create',attendancecreate);
app.get('/department',Department);
app.post('/departmentcreate',Departmentcreate);
app.get('/departmentdelete/:id',Departmentdelete);
app.post('/departmentupdate',Departmentupdate);
app.get('/login',checklogin);
app.post('/login',login);
app.get('/salary/:firstdate/:lastdate',salary);
app.get('/salarydetail/:id',salarydetail);
app.post('/salarycreate',salarycreate);
app.get('/dailyattendance/:firstdate/:lastdate/:employeeid',dailyattendance);
app.get('/attendancehistory/:firstdate/:lastdate',attendancehistory);
app.get('/attendancehistoryy/:firstdate/:lastdate/:idd',attendancehistoryy);
app.get('/BankDetail',BankDetail);
app.get('/bankdetails/:idd',bankdetails);
app.post('/bankkcreate',bankkcreate);
app.post('/incrementlog',incrementlog);
app.get('/incrementdetail/:idd',incrementdetail);
app.post('/incrementlogcreate',incrementlogcreate);
app.get('/leaves',getLeavesData);
app.post('/updateleave',updleaveApproveOrNot);
app.get('/pendingleave',getPendingLeaves);
app.get('/state',state_list);
app.get('/city/:stateId',all_cities);
app.get('/holiday',getholidayData);
app.get('/getholiday/:firstdate/:lastdate',getholiday);
app.post('/holidayCreate',holidayCreate);
app.get('/holidayDelete/:group_id',holidayDelete);
// app.get('/holidaycount/:firstdate/:lastdate',holidaycount);
app.get('/document',setting);
app.post('/upload/:id', upload.single('image'),  (req, res) => {

  console.log("hello darling ")
  if (!req.file) {
    console.log("file--------> "+JSON.stringify(req.file))
      console.log("No file upload");
  } else {
      // console.log(req.file.filename)
      let id = req.params.id;
      // console.log("id----------=>"+id)
      var imgsrc = 'http://localhost:3000/images/'+ req.file.filename
      // console.log("imgsrc----------=>"+imgsrc)

      var insertData ="UPDATE staff_tbl SET pic='"+imgsrc+"' WHERE id = '"+id+"'"
      db.query(insertData, [imgsrc], (err, result) => {
          if (err) throw err
          console.log("file uploaded")
          console.log("result== > "+JSON.stringify(result))
      })
  }
});


// document upload---------------------------------------------------------------------------- //
// route for post data
app.post("/documentupload/",upload.single('file'), (req, res) => {
  if (!req.file) {
      console.log("No file upload");
  } else {
      console.log(req.file.filename)
      var imgsrc = 'http://localhost:3000/images/' + req.file.filename
      var insertData = "INSERT INTO document_tbl (info1)VALUES(?)"
      db.query(insertData, [imgsrc], (err, result) => {
          if (err) throw err
          console.log("file uploaded")
      })
  }
});


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});


