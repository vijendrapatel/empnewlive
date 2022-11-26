import React, { useState, useEffect } from "react";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";
import moment from "moment";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Leavedropdown from "./Leavedropdown";
import Searchsection from "./Searchsection";
import LeaveName from "./LeaveName";

function DailyAttendance(props) {
  let navigate = useNavigate();

  const [attendmonth, setattendmonth] = useState(
    moment().format(`YYYY-MM-DDT00:00:00+00:00`)
  );

  const [attendancedata, setattendancedata] = useState();
  const [employeedata, setEmployeedata] = useState([]);
  const [holiday, setholiday] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const PreviousmonthChange = () => {
    let decmonth = moment(attendmonth)
      .subtract(1, "month")
      .format(`YYYY-MM-DDT00:00:00+00:00`);
    getEmployees();
    setattendmonth(decmonth);
    setResetPaginationToggle(false);
    setFilterText("");
  };

  const NextmonthChange = () => {
    let decmonth = moment(attendmonth)
      .add(1, "month")
      .format(`YYYY-MM-DDT00:00:00+00:00`);

    getEmployees();
    setattendmonth(decmonth);
    setResetPaginationToggle(false);
    setFilterText("");
  };

  let firstdate = moment(attendmonth, "YYYY-MM")
    .startOf("month")
    .format(`YYYY-MM-DDT00:00:00+00:00`);
  let lastdate = moment(attendmonth, "YYYY-MM")
    .endOf("month")
    .format(`YYYY-MM-DDT00:00:00+00:00`);
  let mdays = [];

  let momentmonth = moment(attendmonth, "YYYY-MM").daysInMonth();
  let ststmonth = moment(attendmonth, "YYYY-MM").format("MM-YYYY");
  for (let i = 1; i <= momentmonth; i++) {
    let datmon = i + "-" + ststmonth;
    let changeformat = moment(datmon, "D-MM-YYYY").format(`YYYY-MM-DD`);
    mdays.push(changeformat);
  }
  const getEmployees = () => {
    Axios.get(`https://apnaorganicstore.in/empapp/employees`).then((response) => {
      setEmployeedata(response.data);
    });
    Axios.get(`https://apnaorganicstore.in/empapp/getholiday/${firstdate}/${lastdate}`).then((response) => {
      setholiday(response.data);
    });
  };
  useEffect(() => {
    getEmployees();
  }, [attendmonth]);

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
  const navigator = useNavigate();
  const onEmployeeNameClick = (id) => {
    localStorage.setItem("staffid", id);
    navigate("/AttendanceDetail");
  };
// /holiday



// 
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div className="dailyattendance_table">
              <div className=" d-flex justify-content-between align-items-center">
                <h2 className="h1 heading_"><b>Daily Attendance</b></h2>
                <div className="btn-group mr-2 px-5">
                  <Link to="/AttendanceHistory" className="nav-link">
                    <button className="btn att_btn text-white text-center px-0 py-3">
                     <h3>Attendance History</h3> 
                    </button>
                  </Link>
                </div>
              </div>
              <div className="dailyattendance_table_box">
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
                {/*  */}
                <div className="monthname_sort">
                  <BsFillCaretLeftFill onClick={PreviousmonthChange} />
                  <h4 className="monthname_text">
                    {moment(attendmonth).format("MMMM-YYYY")}
                  </h4>
                  <BsFillCaretRightFill onClick={NextmonthChange} />
                </div>
                {/*  */}
                <div className={"tableandsearch"}>
                  <Searchsection
                    onNameChange={(e) => setFilterText(e.target.value)}
                    onClear={handleClear}
                    nameval={filterText}
                  />
                  <div class="table-responsive">
                    <table
                      class="table dailyattendace_table mt-2"
                      id="myTable"
                      pagination
                    >
                      <thead className="dailyattendace_thead bg-dark text-white">
                        <tr>
                          <th>{"Id"}</th>
                          <th className="employeenametrow text-justify-center">{"Name"}</th>

                          {mdays.map((mday, i) => {
                            return (
                              <>
                                <th>
                                  <p className="daydin m-0">
                                    {moment(mday).format(`DD`)}
                                  </p>
                                  <p className="daydin m-0">
                                    {moment(mday).format(`ddd`)}
                                  </p>
                                  
                                </th>
                              </>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="dailyattendace_tbody">
                        {(filteredItems || []).map((dataa, i) => {
                          return (
                            <tr key={i}>
                              <td scope="row">{dataa.id}</td>
                              <td
                                scope="row"
                                className="employeenametrow"
                                onClick={onEmployeeNameClick.bind(
                                  this,
                                  dataa.id
                                )}
                                value={dataa.id}
                              >
                                {dataa.staff_name}
                              </td>
                              {
                                <Leavedropdown
                                i={i}
                                firstdate={firstdate}
                                lastdate={lastdate}
                                holiday={holiday}
                                  employeedataaa={employeedata}
                                  employeeid={dataa.id}
                                  employeename={dataa.staff_name}
                                  attendmonthh={attendmonth}
                                  mdays={mdays}
                                  attendancedata={attendancedata}
                                />
                              }
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default DailyAttendance;
