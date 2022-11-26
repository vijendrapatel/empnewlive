import React, { useState,useEffect } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";
import moment from "moment";
import DataTable from 'react-data-table-component';
import SearchSection from "../common/SearchSection";
import Searchsection from "./Searchsection";
import Axios from "axios";

  
// const ExpandedComponent = ({ dataa }) => <div className="dropdown_detail">
// <div className="dropdown_personaldet">
// <h6>{EmployeeName}</h6>
// <h6>{City}</h6>
// <h6>{gender}</h6>
// </div>
// <div className="dropdown_personaldetail">
// <h6>{mobile}</h6>
// <h6>{doj}</h6>
// </div>
// </div>;
const AttendanceHistory = () => {
  const [attendancedata, setattendancedata] = useState();
  const [employeedata, setEmployeedata] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
 
    const [attendmonth, setattendmonth] = useState(
      moment().format(`YYYY-MM-DDT00:00:00+00:00`)
    );
  const [nameval,setnameval] = useState();

  // date

  let firstdate = moment(attendmonth, "YYYY-MM")
  .startOf("month")
  .format(`YYYY-MM-DDT00:00:00+00:00`);
  console.log("firstdate"+firstdate)
let lastdate = moment(attendmonth, "YYYY-MM")
  .endOf("month")
  .format(`YYYY-MM-DDT00:00:00+00:00`);
// 
// search function
let filteredItems = employeedata.filter(
  (item) =>
    JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
    -1
);

const handleClear = () => {
  if (filterText) {
    setResetPaginationToggle(!resetPaginationToggle);
    setFilterText("");
  }
};

//
const getEmployees = () => {
  Axios.get(
    `https://apnaorganicstore.in/empapp/attendancehistory/${firstdate}/${lastdate}`
  ).then((response) => {
    setattendancedata(response.data);
  });
};
useEffect(() => {
  getEmployees();
}, []);

console.log(JSON.stringify(attendancedata))

  const onMonthChange=(e)=>{
    let formonth =e.target.value;
    setattendmonth(moment(formonth).format("MMMM-YYYY"))
  } 
  const onNAmeChange=(e)=>{
    setnameval(e.target.value)
  } 
   


    
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
    return (
        <div>
             <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          {/* right side */}
          <div className="dashboard_rightside col-md-10">
            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-12 pt-3 px-4"
            >
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-2 mt-3 border-bottom">
                <h2 className="attendancesection_heading">Attendance History</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                  
                </div>
              </div>

              
                
               
 {/* bottom secrtion */}
 <div className="attendancehistory_list">
            {/* month sorting */}
            <div className="monthname_sort">
                  <BsFillCaretLeftFill onClick={PreviousmonthChange} />
                  <h4 className="monthname_text">{attendmonth}</h4>
                  <BsFillCaretRightFill onClick={NextmonthChange} />
                </div>
 
 
            {/*  */}
{/* history */}
<div className="dailyattendance_table_box">
<Searchsection
                  onNameChange={(e) => setFilterText(e.target.value)}
                  onClear={handleClear}
                  nameval={filterText}
                />

<div class="table-responsive">
                  <table
                    class="table table-striped dailyattendace_table"
                    id="myTable"
                    pagination
                  >
                    <thead className="dailyattendace_thead">
                      <tr>
                        <th>{"Id"}</th>
                        <th className="employeenametrow">{"Name"}</th>
                        <th >
                            {"Working Days"}
                            </th>
                            <th >
                            {"Present"}
                            </th>
                            <th >
                            {"HalfDay"}
                            </th> <th >
                            {"LateComing"}
                            </th> <th >
                            {"Emergency Leave"}
                            </th>
                            <th >
                            {"Medical Leave"}
                            </th><th >
                            {"Informed Absent"}
                            </th><th >
                            {"Uninformed Absent"}
                            </th>
                            <th >
                            {"Casual Leave"}
                            </th>
                        
                      </tr>
                    </thead>
                    <tbody className="dailyattendace_tbody">
                     
                    {(attendancedata || []).map((edata)=>{

                   return(
               
                          <tr>
                            <td scope="row">{edata.id}</td>
                            <td scope="row">{edata.staff_name}</td>
                            <td scope="row">{'WORKING'}</td>
                            <td scope="row">{'PRESENT'}</td>
                            <td scope="row">{edata.HD}</td>
                            <td scope="row">{edata.LC}</td>
                            <td scope="row">{edata.EL}</td>
                            <td scope="row">{edata.ML}</td>
                            <td scope="row">{edata.UA}</td>
                            <td scope="row">{edata.IA}</td>
                            <td scope="row">{edata.CL}</td>


                          </tr>
                          )
                        })}
                    
                    </tbody>
                  </table>
                </div>
                </div>

{/* historyend */}
            </div>
            </main>
        </div>
        </div>
          </div>
        </div>
    );
}

export default AttendanceHistory;
