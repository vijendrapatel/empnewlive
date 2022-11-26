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
import LeaveName from "./LeaveName";
import { Link, useNavigate } from "react-router-dom";

  
const ExpandedComponent = ({ data }) => <div className="dropdown_detail">
<div className="dropdown_personaldet">
<h6 className="datastaffname">{data.staff_name}</h6>
<h6 className="mx-3">{data.gender}</h6>
<h6>{data.city}</h6>
</div>
<div className="dropdown_personaldetail">
<h6 className="datastaffname">{data.address}</h6>
<h6>{moment(data.dob).format('DD-MMMM-YYYY')}</h6>
</div>
</div>;
const AttendanceHistory = () => {
  const [attendancedata, setattendancedata] = useState();
  const [holidaycount, setholidaycount] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
    const [nameval, setnameval] = useState();
 
    const [attendmonth, setattendmonth] = useState(
      moment().format(`YYYY-MM-DDT00:00:00+00:00`)
    );

  // date

  let firstdate = moment(attendmonth, "YYYY-MM")
  .startOf("month")
  .format(`YYYY-MM-DDT00:00:00+00:00`);
let lastdate = moment(attendmonth, "YYYY-MM")
  .endOf("month")
  .format(`YYYY-MM-DDT00:00:00+00:00`);
// 
// search function
// let filteredItems = attendancedata.filter(
//   (item) =>
//     JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
//     -1
// );

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
  Axios.get(
    `https://apnaorganicstore.in/empapp/getholiday/${firstdate}/${lastdate}`
  ).then((response) => {
    setholidaycount(response.data[0]);
  });
};
useEffect(() => {
  getEmployees();
}, [attendmonth]);
   
      let decmonth;
      const PreviousmonthChange = () => {
        decmonth = moment(attendmonth, `YYYY-MM-DDT00:00:00+00:00`)
          .subtract(1, "month")
          .format(`YYYY-MM-DDT00:00:00+00:00`);
        setattendmonth(decmonth);
      };
      const NextmonthChange = () => {
        decmonth = moment(attendmonth, `YYYY-MM-DDT00:00:00+00:00`)
          .add(1, "month")
          .format(`YYYY-MM-DDT00:00:00+00:00`);
        setattendmonth(decmonth);
      };
//       let countday =[];
// {holidaycount.map((datee)=>{
// if(moment(datee.holiday_date,'YYYY-MM-DD').format('dddd') != 'Sunday' && datee.status === 1 && datee.is_holiday === 1){
//   countday.push(moment(datee.holiday_date,'YYYY-MM-DD'))
// }
// })}


      const columns = [
        {
          name: 'Id',
          selector: row => row.id,
         
      },
      {
          name: 'Name',
          selector: row => row.staff_name,
          sortable: true,
          
      },
      
      {
        name: 'WDay',
        selector: row =>wdays ,
        sortable: true,
    },
      {
        name: 'P',
        selector: row =>wdays-(row.HD+row.ML+row.LC+row.EL+row.CL+row.UA+row.IA) ,
        sortable: true,
    },
  {
    name: 'HD',
    selector: row => row.HD,
    sortable: true,
  },
  {
    name: 'ML',
    selector: row => row.ML,
    sortable: true,
  },
  {
    name: 'LC',
    selector: row => row.LC,
    sortable: true,
  },
  {
    name: 'EL',
    selector: row => row.EL,
    sortable: true,
  },
  {
    name: 'CL',
    selector: row => row.CL,
    sortable: true,
  },
  {
    name: 'UA',
    selector: row => row.UA,
    sortable: true,
},
  {
    name: 'IA',
    selector: row => row.IA,
    sortable: true,
  }
      ];
      let count={};
      let mdays = [];
      let momentmonth = moment(attendmonth, "YYYY-MM").daysInMonth();
      let ststmonth = moment(attendmonth, "YYYY-MM").format("MM-YYYY");
  for (let i = 1; i <= momentmonth; i++) {
    let datmon = i + "-" + ststmonth;
    let changeformat = moment(datmon, "D-MM-YYYY").format(`dddd`);
    mdays.push(changeformat);

    // // sunday count
    // if (count[changeformat]) {
    //     count[changeformat] += 1;
    //   } else {
    //     count[changeformat] = 1;
    //   }
    //   // 

  }
let wdays = momentmonth -  holidaycount.count;

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
              <div className="dailyattendance_table">

              <div className="d-flex justify-content-between align-items-center  ">
                <h2 className="h1"><b>Attendance History</b></h2>
                <div className="btn-group mr-2 px-5">
                  <Link to="/AttendanceHistory" className="nav-link">
                    <button className="btn sign_out_btn text-white text-center">
                     <h3>Confirm</h3>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="search_section_top">
                  <LeaveName
                    heading={"HD - "}
                    FullName={"HALFDAY"}
                    className={"LEavedot_red text-primary"}
                  />
                  <LeaveName
                    heading={"CL - "}
                    FullName={"CASUAL LEAVE"}
                    className={"LEavedot_red text-secondary"}
                  />
                  <LeaveName
                    heading={"ML - "}
                    FullName={"MEDICAL LEAVE"}
                    className={"LEavedot_red text-warning"}
                  />
                  <LeaveName
                    heading={"EL - "}
                    FullName={"OTHER EMERGENCY LEAVE"}
                    className={"LEavedot_red text-info"}
                  />
                  <LeaveName
                    heading={"UA - "}
                    FullName={"UNINFORMED ABSENT"}
                    className={"LEavedot_red text-danger"}
                  />
                  <LeaveName
                    heading={"IA - "}
                    FullName={"INFORMED ABSENT"}
                    className={"LEavedot_red text-gradient-warning"}
                  />
                  <LeaveName
                    heading={"LC - "}
                    FullName={"LATE COMING"}
                    className={"LEavedot_red"}
                  />
                </div>
              
                
               
 {/* bottom secrtion */}
 <div className="attendancehistory_list mt-2">
            {/* month sorting */}
            <div className="monthname_sort mb-5">
                  <BsFillCaretLeftFill onClick={PreviousmonthChange} />
                  <h4 className="monthname_text">{moment(attendmonth).format('MMMM-YYYY')}</h4>
                  <BsFillCaretRightFill onClick={NextmonthChange} />
                </div>
 
 
            {/*  */}
{/* history */}
<div className="dailyattendance_table_box mt-3">
{/* <Searchsection
                  onNameChange={(e) => setFilterText(e.target.value)}
                  onClear={handleClear}
                  nameval={filterText}
                /> */}


    <DataTable
            pagination
            columns={columns}
            data={attendancedata}
            highlightOnHover
           pointerOnHover
            expandableRows
            expandableRowsComponent={ExpandedComponent}
        />
                </div>

{/* historyend */}
            </div>
            </div>
            </main>
        </div>
        </div>
          </div>
        </div>
    );
}

export default AttendanceHistory;
