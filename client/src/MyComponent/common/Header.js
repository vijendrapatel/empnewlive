import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Attendance/dashboard.css';
// import company_logo from "../../../src/img/Pvtltd.png";
const Header = () => {
  let navigate = useNavigate();
  const signOut = () =>{
    localStorage.setItem("authenticated",null);
    navigate("/EmployeeManagement/");
  }
  return (
    <div>
      {/* <div className="header_box">

       
         
      
         <img src={company_logo} class="profile-photo"/>
        
         <button className="btn sign_out_btn" onClick={signOut} >
          <p className="sign_out_text">Sign out</p>
           </button>
       
     
      </div> */}
    </div>
  );
};

export default Header;
