import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import moment from "moment";
import { BsFillCaretLeftFill,BsCalendar2Event } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaUserAlt,FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
import Axios from "axios";


const AttendanceDetail = (props) => {
  const [Employedata,setEmployedata] = useState()
 let idd = localStorage.getItem("staffid");
  

  const [attendmonth, setattendmonth] = useState(moment().format("MMMM-YYYY"));
  let decmonth;
  const PreviousmonthChange = () => {
    decmonth = moment(attendmonth, "MMMM-YYYY")
      .subtract(1, "month")
      .format("MMMM-YYYY");
    setattendmonth(decmonth);
  };
  const NextmonthChange = () => {
    decmonth = moment(attendmonth, "MMMM-YYYY")
      .add(1, "month")
      .format("MMMM-YYYY");
    setattendmonth(decmonth);
  };
  const Empdetail = () => {
    Axios.get(`https://apnaorganicstore.in/empapp/employeeDetail/${idd}`).then((response) => {
      setEmployedata(response)
      });
         }
        
 useEffect(() => {
    Empdetail();
  }, []);

     
  const Position = "web developer";
const Totalworkingday = "100";
const Present = "40";
const Absent = "10";
const LateComing = "1";
const HalfDay = "1";
const EmergencyLeave = "1";
const Leave = "1";
const CausalLeave = "1";

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h2 className="attendancesection_heading">Employee Attendance Detail</h2>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                <Link to="/AttendanceHistory" className="nav-link">
                  <button className="btn btn-sm btn-outline-secondary">
                  Attendance History
                  </button>
                  </Link>

                </div>
                
              </div>
            </div>
            {/* detail */}

            <div className="col-md-11 attendance_main_section_box">
              <div className="text-center lh-1 mb-2 attendance_heading_box">
                <h1 className="fw-bold employee_attend_detail_heading">
                  Employee Attendance Detail
                </h1>{" "}
                <span className="fw-normal attendance_month">
                  Attendance Summary for the month of {attendmonth}
                </span>
              </div>
              {/* main detail */}
              <div className="attendance_main_detail_body">
               

                {/* employeedetail */}
               
              
    <div class="row">
    {/* right */}
        <div class="col-md-4 profileimg_month">
        <img src="https://bootdey.com/img/Content/avatar/avatar5.png"
        alt="Company" className="profileimg"/>
        
         {/* sort */}
         <div className="monthname_sort">
                  <BsFillCaretLeftFill onClick={PreviousmonthChange} />
                  <h4 className="monthname_text">{attendmonth}</h4>
                  <BsFillCaretRightFill onClick={NextmonthChange} />
                </div>
                {/*  */}
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
                               Employee Name                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {'Employedata'}     
                        </td>
                    </tr>
                    <tr>    
                        <td>
                            <strong>
                               {/* <FaUserGraduate/> */}
                                Position                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {Position}     
                        </td>
                    </tr>
                    <tr>    
                        <td>
                            <strong>
                            {/* <BsCalendar2Event/> */}
                                Month                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                        {attendmonth}   
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                Total Working Days                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {Totalworkingday}  
                        </td>
                    </tr>
                    
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-bookmark text-primary"></span> 
                                Present                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {Present}
                        </td>
                    </tr>


                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                                Absent                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                          {Absent}
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-envelope text-primary"></span> 
                                LateComing                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                           {LateComing}  
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-calendar text-primary"></span>
                                HalfDay                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                             {HalfDay}
                        </td>
                    </tr>      
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-calendar text-primary"></span>
                                EmergencyLeave                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {EmergencyLeave}
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-calendar text-primary"></span>
                                CausalLeave                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                             {CausalLeave}
                        </td>
                    </tr>   
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-calendar text-primary"></span>
                                Leave                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                             {Leave}
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
};

export default AttendanceDetail;
