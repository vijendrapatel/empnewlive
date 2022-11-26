import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Link } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const EmployeeDetail = () => {
let navigate = useNavigate();  
const [employeeDetail, setEmployeeDetail] = useState([]);
const [apicall, setapicall] = useState(false);

const [depart, setdepart] = useState([]);

const idd = localStorage.getItem('staffid');

const getEmployees = (id) => {
    Axios.get(`https://apnaorganicstore.in/empapp/employeeDetail/${idd}`).then((response) => {
        setEmployeeDetail(response.data)
        console.log("--------"+JSON.stringify(response.data))
        setapicall(false)
    });
  };
  useEffect( () =>{
    getEmployees();

  },[apicall]);

  const department = () => {
    Axios.get(`https://apnaorganicstore.in/empapp/department`).then((response) => {
        setdepart(response.data);
        setapicall(true)
        
    });
  };
//   console.log("777777777"+depart[0].department_name)
   department();
  


  let EmployeeName;
  let Gender;
  let email;
  let mobile;
  let DoJo;
  let City;
  let State;
  let Country;
  let pic;
  let Dob;
  let Address;
  let BasicSalary;
  let departmmm;


  (employeeDetail || []).map((sdata) =>{
 EmployeeName = sdata.staff_name;
 Gender =sdata.gender;
 Dob = sdata.dob;
 email = sdata.email;
 mobile = sdata.mobile;
 DoJo = sdata.doj;
 City = sdata.city;
 State = sdata.state;
 Country = sdata.country;
 pic=sdata.pic;
 Address=sdata.address;
 BasicSalary=sdata.salary;
 departmmm=sdata.department_id;
})
let departm;

(depart || []).map((depdata) =>{
    if(departmmm===depdata.id){
       
        departm=depdata.department_name
    }
})

    return (
        <div>
            <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                <Link to="/AttendanceHistory" className="nav-link">
                  <button className="btn btn-sm btn-outline-secondary">
                  Attendance History
                  </button>
                  </Link>

                  <button className="btn btn-sm btn-outline-secondary">
                  Salary History
                  </button>
                </div>
                
              </div>
            </div>
            {/* detail */}

            <div className="col-md-11 attendance_main_section_box">
              <div className="text-center lh-1 mb-2 attendance_heading_box">
                <h1 className="fw-bold employee_attend_detail_heading">
                  {EmployeeName}  Detail
                </h1>{" "}
             
              </div>
              {/* main detail */}
              <div className="attendance_main_detail_body">
               

                {/* employeedetail */}
               
              
    <div class="row">
    {/* right */}
        <div class="col-md-4 profileimg_month">
        <img src={pic}
        alt="Company" className="profileimg"/>
        {/* <div className="statusbox">
        <FaDotCircle className={Status==='Present' ?"greendoticon": Status==='Absent' ?"reddoticon" : null}/>
        <h2>{Status}</h2>
        </div> */}
       <Button onClick={()=>{navigate("/UpdateEmployee");}} className='p-3 w-50'>UPDATE DETAIL</Button>
        </div>
        {/*  */}
        <div class="col-md-6">
            <div class="table-responsive">
            <table class="table table-user-information">

                <tbody>
                
                <tr>        
                        <td>
                            <strong>
                            {/* <FaUserAlt/> */}
                            Id                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {idd}     
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                            {/* <FaUserAlt/> */}
                               Employee Name                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {EmployeeName}     
                        </td>
                    </tr>
                    <tr>    
                        <td>
                            <strong>
                               {/* <FaUserGraduate/> */}
                                Gender                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {Gender}     
                        </td>
                    </tr>
                    <tr>    
                        <td>
                            <strong>
                            {/* <BsCalendar2Event/> */}
                            Date of Birth                                               
                            </strong>
                        </td>
                        <td class="text-primary">
                        {moment(Dob).format('YYYY-MMMM-DD')}   

                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                            Email                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {email}  
                        </td>
                    </tr>
                    
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-bookmark text-primary"></span> 
                                mobile                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {mobile}
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                              Address                                               
                            </strong>
                        </td>
                        <td class="text-primary">
                           {Address}   
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                              Basic Salary                                               
                            </strong>
                        </td>
                        <td class="text-primary">
                           {BasicSalary}   
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                                Date of Joining                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                           {moment(DoJo).format('DD-MMMM-YY')}   
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                                Department                                              
                            </strong>
                        </td>
                        <td class="text-primary">
                           { departm }   
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-envelope text-primary"></span> 
                                City                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                           {City}  
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-calendar text-primary"></span>
                                State                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                             {State}
                        </td>
                    </tr>      
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-calendar text-primary"></span>
                                Country                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {Country}
                        </td>
                    </tr>
                   
                </tbody>

            </table>
            </div>
        </div>
    </div>
                                      
                {/* end */}
               
                  {/*  */}
                 
                        
                    </div>
                  </div>
          </main>
        </div>
      </div>
        </div>
    );
}

export default EmployeeDetail;
