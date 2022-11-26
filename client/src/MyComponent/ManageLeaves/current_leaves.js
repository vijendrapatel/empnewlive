import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { useNavigate } from "react-router-dom";

const CurrentLeaves = () => {
  let navigate = useNavigate();
  let auth = localStorage.getItem("authenticated");
    if(auth == null || auth == undefined || auth != 'success'){
     navigate("/");
  }
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);


  const [leavesList, setleavesList] = useState([]);

  const getEmployees = () => {
    Axios.get(`https://apnaorganicstore.in/empapp/pendingleave`).then((response) => {
      setleavesList(response.data);
      console.log("----------"+leavesList)
    });
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const HandleClickApprove = (id,e) => {
    let leaveId = e.target.value;
    console.log(`${id} --- ${leaveId}`)
  
  //   Axios.post("https://apnaorganicstore.in/empapp/updateleave", {
  //     id : id,
  //     status: leaveId,  
  // }).then((response) => {
    // console.log("____response data__________"+response.data)
    // navigate("/leaves"); 
  // });

  Axios.post(`https://apnaorganicstore.in/empapp/updateleave`, {
          id : id,
        status: leaveId
        }).then((response) => {
        console.log("____response data__________"+response.data)
        window.location.reload(); 
        });
   }


  
  const columns = [
    {
      name: "staff_id",
      selector: (row) => row.staff_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.staff_name,
      sortable: true,
    },
    {
      name: "leave_reason",
      selector: (row) => row.leave_reason,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "leave_from",
      selector: (row) => moment(row.leave_from).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "leave_to",
      selector: (row) => moment(row.leave_to).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "applied_on",
      selector: (row) => moment(row.applied_on).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "status",
      cell: (row) => (
       <>
          <div className="status_response">
            <div className={"approve_btn"}>
              <button
                type="button"
                class="btn approve_btn "
                onClick={HandleClickApprove.bind(this,row.id)}
                value={1}>
                APPR
              </button>
            </div>
            <div className={"approve_btn"}>
              <button
                type="button"
                class="btn btn-danger approve_btn"
                onClick={HandleClickApprove.bind(this,row.id)}
                value={2}>
               NOT
              </button>
            </div>
          </div>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  // search function
  // const filteredItems = employeeList.filter(
  //   (item) =>
  //     JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
  //     -1
  // );

  // const handleClear = () => {
  //   if (filterText) {
  //     setResetPaginationToggle(!resetPaginationToggle);
  //     setFilterText("");
  //   }
  // };
  //

  return (
    <div className="manageLeaves_page">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="dailyattendance_table">
            <div className=" d-flex justify-content-between align-items-center border-bottom pb-5  ">

              <h1  className="h1 heading_"><b>Leaves</b></h1>
              </div>
 
              <div className="dailyattendance_table_box">
                <DataTable
                  pagination
                  highlightOnHover
                  pointerOnHover
                  defaultSortField="name"
                  columns={columns}
                  data={leavesList}
                  subHeader
                 
                />
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CurrentLeaves;
