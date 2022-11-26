import React from 'react';
import { Link } from "react-router-dom";
import{FcConferenceCall, FcLeave, FcOvertime, FcSurvey, FcHome, FcRating, FcDepartment} from "react-icons/fc";
import company_logo from "../../../src/img/Pvtltd.png";
import { useNavigate } from "react-router-dom";
import '../../styles/Attendance/dashboard.css';

const Sidebar = () => {
  let navigate = useNavigate();
  const signOut = () =>{
    localStorage.setItem("authenticated",null);
    navigate("/");
  }
    return (
        <>


             <nav className="col-md-2 d-none d-md-block bg-light sidebar">

            {/* <div class="profile-card">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" class="profile-photo"/>
            	<h5><a href="#" class="text-white">Sarah Cruiz</a></h5>
            	<a href="#" class="text-white"><i class="fa fa-user"></i> 1,299 followers</a>
            </div> */}
         <img src={company_logo} class="profile-photo"/>

            <ul class="nav-news-feed sidebar_">
              <li className='icon_text'>
                <FcHome/>
                <div className='m-0'>
  
              <Link to="/dashboard" className="nav-link active">
                    <span data-feather="shopping-cart"></span>
                    Dashboard
                  </Link>
                  </div></li>
                  <li><FcConferenceCall className='h1'/><div className='m-0'>
                    <Link to="/Emplist" className="nav-link">
                    <span data-feather="shopping-cart"></span>
                    
                    Employee
                  </Link></div></li>
              <li><FcDepartment className='m-0'/><div className='m-0'>
                 <Link to="/Department" className="nav-link">
                    <span data-feather="users"></span>
                    Department
                  </Link></div></li>
                  <li><FcSurvey className='m-0'/><div className='m-1'>
                     <Link to="/Attendance" className="nav-link">
                    <span data-feather="users"></span>
                    Attendance
                  </Link></div></li>
              <li><i class="fas fa-hand-holding-usd  m-0" ></i><div className='m-0'>
                <Link to="/Salary_list" className="nav-link">
                    <span data-feather="users"></span>
                    Salary
                  </Link></div></li>
                  <li><FcLeave className='m-0'/><div className='m-0'>
                    <Link to="/leaves" className="nav-link">
                    <span data-feather="users"></span>
                    Leaves
                  </Link></div></li>
                  <li><FcOvertime className='m-0'/><div className='m-0'>
                    <Link to="/all_leaves" className="nav-link">
                    <span data-feather="users"></span>
                   History Leaves
                  </Link></div></li>
                  <li><FcRating className='m-0'/><div className='m-0'>
                    <Link to="/holiday" className="nav-link">
                    <span data-feather="users"></span>
                   Holiday
                  </Link></div></li>
              
                  <button className="btn sign_out_btn" onClick={signOut} >
          <p className="sign_out_text">Sign out</p>
           </button>
       
            </ul>
        
  </nav>
             
        </>
    );
}

export default Sidebar;
