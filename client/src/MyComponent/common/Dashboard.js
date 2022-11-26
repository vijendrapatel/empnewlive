import React from "react";
import { Route, Routes } from "react-router-dom";
import AttendanceDetail from "../Attendance/AttendanceDetail";
import AttendanceHistory from "../Attendance/AttendanceHistory";
import Emplist from "../EmpList/Emplist"
import AddEmployee from "../EmpList/add_emp"
import EmployeeDetail from "../EmpList/EmployeeDetail"
import Salary_list from "../Salary/Salary_list";
import Salary_slip from "../Salary/Salary_slip";
import Generatesalary from "../Salary/Generatesalary";
import Department from "../Department/Department";
import Login from "../login/login";
import Bankdetails from "../EmpList/bankdetails";
import { useNavigate } from "react-router-dom";
import CurrentLeaves from "../ManageLeaves/current_leaves";
import ManageLeaves from "../ManageLeaves/leaves_history";
import Dashboardd from "../Dashboard/dashboard";
import DailyAttendance from "../Attendance/DailyAttendance";
import Holidays from "../Holidays/holiday";
import IncrementLog from "../EmpList/increment_log";
import UpdateEmp from "../EmpList/updateEmployee";
import SalaryHistory from "../Salary/Salary_history";


function Dashboard(props) {
  let navigate = useNavigate();
  let Auth =  localStorage.getItem("authenticated");
  console.log("local chala -- > "+Auth)
  const active = ({isActive}) => {
     return{
      fontWeight: isActive ? 'bold' : 'normal',
     }

     
  }
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login/>} />
{/* {Auth != 'success' ? navigate("/") : */}



<>


<Route style={active} path="/dashboard" element={<Dashboardd/>} />
      <Route style={active} path="/Emplist" element={<Emplist/>} />
      <Route path="/login" element={<Login/>} />
      <Route style={active} path="/AddEmployee" element={<AddEmployee/>} />
      <Route path="/UpdateEmployee" element={<UpdateEmp/>} />
      <Route path="/EmployeeDetail" element={<EmployeeDetail/>} />
      <Route path="/department" element={<Department/>} />
      <Route path="/Bankdetails" element={<Bankdetails/>} />
      <Route path="/IncrementLog" element={<IncrementLog/>} />
      <Route path="/Attendance" element={<DailyAttendance />} />
      <Route path="/AttendanceDetail" element={<AttendanceDetail />} />
      <Route path="/AttendanceHistory" element={<AttendanceHistory />} />
      <Route path="/Salary_list" element={<Salary_list />} />
<Route path="/Salary_slip" element={<Salary_slip />} />
<Route path="/Generatesalary" element={<Generatesalary/>} />
<Route path="/Salary_history" element={<SalaryHistory/>} />
<Route path="/leaves" element={<CurrentLeaves/>} />
<Route path="/all_leaves" element={<ManageLeaves/>} />
<Route path="/holiday" element={<Holidays/>} />



</>
{/* } */}
      </Routes>
    </div>
  );
}

export default Dashboard;