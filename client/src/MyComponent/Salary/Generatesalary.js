import React, { useState, useEffect } from "react";
import "../../styles/salary/Generatesalary.css";
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import {FaRupeeSign} from 'react-icons/fa';

function Generatesalary(props) {
  let navigate = useNavigate();

  const idd = localStorage.getItem("staffid");
  const [employeeList, setEmployeeList] = useState([]);
  const [name, setName] = useState("");
  const [stid, setstid] = useState("");
  const [accno, setaccno] = useState("");
  const [banknam, setbanknam] = useState("");
  const [lc, setlc] = useState();
  const [hd, sethd] = useState();
  const [cl, setcl] = useState();
  const [el, setel] = useState();
  const [ia, setia] = useState();
  const [ua, setua] = useState();
  const [ml, setml] = useState();
  const [workday, setworkday] = useState();
  const [salary, setsalary] = useState();
  const [deduction, setdeduction] = useState();
  const [netsal, setnetsal] = useState();
  const [bankdetail, setbankdetail] = useState([]);
  const [attendancedata, setattendancedata] = useState();
  const [holidaycount, setholidaycount] = useState([]);
  const [allowval, setallowval] = useState();


  const [attendmonth, setattendmonth] = useState(
    moment().format(`YYYY-MM-DDT00:00:00+00:00`)
  );

  // date
  let momentmonth = moment(attendmonth, "YYYY-MM").daysInMonth();

  let firstdate = moment(attendmonth, "YYYY-MM")
    .startOf("month")
    .format(`YYYY-MM-DDT00:00:00+00:00`);
  let lastdate = moment(attendmonth, "YYYY-MM")
    .endOf("month")
    .format(`YYYY-MM-DDT00:00:00+00:00`);
  //
  const getEmployees = () => {
    Axios.get(`https://apnaorganicstore.in/empapp/bankdetails/${idd}`).then((response) => {
      setbankdetail(response.data[0]);
      setaccno(response.data[0].account_no);
      setbanknam(response.data[0].bank_name);
    });

    Axios.get(`https://apnaorganicstore.in/empapp/attendancehistoryy/${firstdate}/${lastdate}/${idd}`
    ).then((response) => {
      setattendancedata(response.data[0]);
      sethd(response.data[0].HD);
      setcl(response.data[0].CL);
      setml(response.data[0].ML);
      setlc(response.data[0].LC);
      setel(response.data[0].EL);
      setia(response.data[0].IA);
      setua(response.data[0].UA)

    });
    Axios.get(`https://apnaorganicstore.in/empapp/getholiday/${firstdate}/${lastdate}`
    ).then((response) => {
      setholidaycount(response.data[0]);
      let wdays = momentmonth - response.data[0].count;
      setworkday(wdays);
    });
    Axios.get(`https://apnaorganicstore.in/empapp/employeeDetail/${idd}`).then((response) => {
      setEmployeeList(response.data);
      setsalary(response.data[0].salary)
      setName(response.data[0].staff_name);
      setstid(response.data[0].id);


    });
  };
  useEffect(() => {
    getEmployees();
  }, [firstdate, idd, lastdate]);
 
// console.log("_______iddd_________"+idd)
// console.log("_______netsal_________"+netsal)
  const ongeneratesalary = () => {
    Axios.post("https://apnaorganicstore.in/empapp/salarycreate", {
      staff_id: idd,
      staff_name: name,
      basic_salary: salary,
      total: netsal,
      updated_on: attendmonth

    }).then(async (response) => {
    });
    navigate('/Salary_slip')

  }

 
  const workdayOnchange = (e) => {
    setworkday(e.target.value);
  };
  const lateOnchange = (e) => {
    setlc(e.target.value);
  };
  const emergencyOnchange = (e) => {
    setel(e.target.value);
  };
  const casualOnchange = (e) => {
    setcl(e.target.value);
  };
  const medicalOnchange = (e) => {
    setml(e.target.value);
  };
  const informedOnchange = (e) => {
    setia(e.target.value);
  };
  const uninformedOnchange = (e) => {
    setua(e.target.value);
  };
  const halfdayOnchange = (e) => {
    sethd(e.target.value);
  };
  const salarynoOnchange = (e) => {
    setsalary(e.target.value);
  };
  const deductionOnchange = (e) => {
    setdeduction(e.target.value);
  };
  const netsalaryOnchange = (e) => {
    setnetsal(e.target.value);
  };
  // const onallowancechange = (e) => {
  //   setallowval(e.target.value);
  //  let salaryy =parseInt(e.target.value)
  //  setsalary(salaryy)
  // };

  // create salary


  const deductiononclick = () => {
    let onedaysal = (salary / workday)

    let absent = (onedaysal * 3 * (ua))
    let leave = (onedaysal * 1 * (ia))
    let medicalleave = (onedaysal * 1 * (ml))
    let emergencyleave = (onedaysal * 1 * (el))
    let halfday = ((onedaysal / 2) * 1 * (hd))
    // console.log("lc" + lc)

    let latecom;
    if (lc > 2) {
      let diff = (lc) - 2
      if (diff === 1) {
        latecom = 0
      }
      if ((diff % 3 === 0 && diff % 2 === 0) || diff % 3 === 0) {
        latecom = (diff / 3) * (onedaysal)
        // console.log("latecom3333   " + latecom)

      }
      // eslint-disable-next-line no-lone-blocks
      {
        if (diff % 2 === 0 && diff % 3 !== 0) {
          latecom = (diff / 4) * (onedaysal)
          // console.log("latecom222      " + latecom)

        }
      }
    } if (lc < 2) {
      latecom = 0;
    }

    // console.log("latecomdfina;      " + latecom)

    let deductionn = (absent) + (leave) + (medicalleave) + (emergencyleave) + (halfday) + (latecom);
    setdeduction(deductionn)
    // console.log("(absent) + (leave)+ (medicalleave)+ (emergencyleave)+(halfday)+(latecom)" + (absent) + (leave) + (medicalleave) + (emergencyleave) + (halfday) + (latecom))
    // console.log("latecom" + latecom)

    // console.log("deductionn" + deductionn)

    let deduct = localStorage.setItem('deduction', deductionn)
    let netsalary = salary-deductionn ;
    // console.log("netsal++++++++"+netsalary)
    setnetsal(netsalary)
    
  }

  // 
  return (
    <>

      <Header />
      <div className="container-fluid">

        <div className="row">
          <Sidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="salarydata_table">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-5 ">
                <h1 className="h1 heading_"><b>Generate Salary</b></h1>

              </div>
              <div class="container">
                <div class=" text-center mt-2">

                  <h1>{moment(attendmonth).format('MMMM')} Month Salary</h1>
                </div>

                <div class="row ">
                  <div class="col-lg-8 mx-auto">
                    <div class="card mt-2 mx-auto p-4 bg-light">
                      <div class="card-body bg-light">
                        <div class="container">
                          <div>
                            {/* <form id="contact-form" role="form"> */}
                            <div class="controls">
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group sal_input_text">
                                    <label for="form_name" className='labletextnew'>
                                      Name of Employee *
                                    </label>
                                   <small class="label_text detail_text  p-2">{name}</small>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group sal_input_text">
                                    <label for="form_lastname" className='labletextnew'>
                                      Employee Id *
                                    </label>
                                   <small class="label_text detail_text p-2">{stid}</small>

                                    {/* <input
                                      id="form_lastname"
                                      type="text"
                                      class="form-control label_text"
                                      placeholder=""
                                      required="required"
                                      data-error="Lastname is required."
                                      name={stid}
                                      value={stid}
                                      onChange={stidOnchange}
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <h4 class="mt-2">
                              <b>Bank Details-</b>
                            </h4>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="form-group sal_input_text">
                                  <label for="form_name" className='labletextnew'>Account no. *</label>
                                  <small class="label_text detail_text p-2">{accno}</small>

                                  {/* <input
                                    id="form_name"
                                    type="text"
                                    name={accno}
                                    value={accno}
                                    onChange={accountOnchange}
                                    class="form-control label_text "
                                    placeholder=""
                                    required="required"
                                  /> */}
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group sal_input_text">
                                  <label for="form_lastname " className='labletextnew'>
                                    Name of Bank *
                                  </label>
                                  <small class="label_text detail_text p-2">{banknam}</small>

                                  {/* <input
                                    id="form_lastname"
                                    type="text"
                                    name={banknam}
                                    value={banknam}
                                    onChange={banknameOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                  /> */}
                                </div>
                              </div>
                            </div>
                            <h4 class="mt-2">
                              <b>Working Details-</b>
                            </h4>

                            <div class="row">
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label for="form_name" className='labletextnew'>
                                    Total working days *
                                  </label>
                                  <input
                                    id="form_name"
                                    type="text"
                                    name={workday}
                                    value={workday}
                                    onChange={workdayOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                    data-error="Firstname is required."
                                  />
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label for="form_lastname" className='labletextnew'>
                                    Late comings *
                                  </label>
                                  <input
                                    id="form_lastname"
                                    type="text"
                                    name={lc}
                                    value={lc}
                                    onChange={lateOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                  />
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label for="form_lastname" className='labletextnew'>Leave *</label>
                                  <input
                                    id="form_lastname"
                                    type="text"
                                    name={ia}
                                    value={ia}
                                    onChange={informedOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                  />
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label for="form_lastname" className='labletextnew'>Half days *</label>
                                  <input
                                    id="form_lastname"
                                    type="text"
                                    name={hd}
                                    value={hd}
                                    onChange={halfdayOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                  />
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label for="form_lastname" className='labletextnew'>Absent *</label>
                                  <input
                                    id="form_lastname"
                                    type="text"
                                    name={ua}
                                    value={ua}
                                    onChange={uninformedOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                  />
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label for="form_lastname" className='labletextnew'>CL *</label>
                                  <input
                                    id="form_lastname"
                                    type="text"
                                    name={cl}
                                    value={cl}
                                    onChange={casualOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                  />
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label for="form_lastname" className='labletextnew'>ML *</label>
                                  <input
                                    id="form_lastname"
                                    type="text"
                                    name={ml}
                                    value={ml}
                                    onChange={medicalOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                  />
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <label for="form_lastname" className='labletextnew'>EL *</label>
                                  <input
                                    id="form_lastname"
                                    type="text"
                                    name={el}
                                    value={el}
                                    onChange={emergencyOnchange}
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                  />
                                </div>
                              </div>
                              <h4 class="mt-2">
                                <b>Salary Details-</b>
                              </h4>
                              {/* salary */}
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="form_name" className='labletextnew'>Basic *</label>
                                   <FaRupeeSign/>
                                    <input
                                      id="form_name"
                                      type="text"
                                      class="form-control label_text"
                                      placeholder=""
                                      required="required"
                                      data-error="Firstname is required."
                                      name={salary}
                                      value={salary}
                                      onChange={salarynoOnchange}
                                    />
                                  </div>
                                </div>
                                {/* <div class="col-md-6">
                                <div class="form-group">
                                  <label for="form_lastname">
                                    Current Salary *
                                  </label>
                                  <input
                                    id="form_lastname"
                                    type="text"
                                    name="surname"
                                    class="form-control label_text"
                                    placeholder=""
                                    required="required"
                                    data-error="Lastname is required."
                                  />
                                </div>
                              </div> */}
                              </div>
                              {/* allowance */}
                              <h4 class="mt-2">
                                <b>Allowance-</b>
                              </h4>

                              <div class="row">
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label for="form_email" className='labletextnew'>
                                      House Rent Allowance *
                                    </label>
                                    <input
                                      id="form_email"
                                      type="number"
                                      name="email"
                                      class="form-control label_text"
                                      placeholder=""
                                      // required="required"
                                      data-error="Valid email is required."
                                      onChange={'onallowancechange'}
                                      value={allowval}
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label for="form_email" className='labletextnew'>
                                      Dearness Allowance *
                                    </label>
                                    <input
                                      id="form_email"
                                      type="number"
                                      name="email"
                                      class="form-control label_text"
                                      placeholder=""
                                      // required="required"
                                      data-error="Valid email is required."
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label for="form_need" className='labletextnew'>
                                      Other Allowance *
                                    </label>
                                    <input
                                      id="form_email"
                                      type="number"
                                      name="email"
                                      class="form-control label_text"
                                      placeholder=""
                                      // required="required"
                                      data-error="Valid email is required."
                                    />
                                  </div>
                                </div>
                              </div>
                              <h4 class="mt-2">
                                <b>Deduction-</b>
                              </h4>

                              <div class="row">
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label for="form_message" className='labletextnew'>
                                      Professional Tax *
                                    </label>
                                    <input
                                      id="form_email"
                                      type="email"
                                      name="email"
                                      class="form-control label_text"
                                      placeholder=""
                                      // required="required"
                                      data-error="Valid email is required."
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label for="form_message" className='labletextnew'>Income Tax *</label>
                                    <input
                                      id="form_email"
                                      type="email"
                                      name="email"
                                      class="form-control label_text"
                                      placeholder=""
                                      // required="required"
                                      data-error="Valid email is required."
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label for="form_message" className='labletextnew'>ESI *</label>
                                    <input
                                      id="form_email"
                                      type="email"
                                      name="email"
                                      class="form-control label_text"
                                      placeholder=""
                                      // required="required"
                                      data-error="Valid email is required."
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group" >
                                    <label for="form_message" className='labletextnew'>PF *</label>
                                    <input
                                      id="form_email"
                                      type="email"
                                      name="email"
                                      class="form-control label_text"
                                      placeholder=""
                                      // required="required"
                                      data-error="Valid email is required."
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label for="form_message" className='labletextnew'>
                                      Other Deduction
                                    </label>
                                    <input
                                      id="form_email"
                                      type="email"
                                      name="email"
                                      class="form-control label_text"
                                      placeholder=""
                                      // required="required"
                                      data-error="Valid email is required."
                                    />
                                  </div>
                                </div>
                                <div class="row p-2">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label for="form_name" className='labletextnew'>
                                        <b>TOTAL EARNING *</b>
                                      </label>
                                      <input
                                        id="form_name"
                                        type="text"
                                        name={salary}
                                        value={salary}
                                        onChange={salarynoOnchange}
                                        class="form-control label_text"
                                        placeholder=""
                                        required="required"
                                        data-error="Firstname is required."
                                      />
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label for="form_lastname" className='labletextnew'>
                                        <b>TOTAL DEDUCTION *</b>
                                      </label>
                                      <button onClick={deductiononclick} >click</button>
                                      <input
                                        id="form_lastname"
                                        type="text"
                                        class="form-control label_text"
                                        placeholder=""
                                        required="required"
                                        data-error="Lastname is required."
                                        onChange={deductionOnchange}
                                        name={deduction}
                                        value={deduction || 0}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="row p-2">
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label for="form_name" className='labletextnew'>
                                        <b>Net Salary *</b>
                                      </label>
                                      <input
                                        id="form_name"
                                        type="text"
                                        onChange={netsalaryOnchange}
                                        name={netsal}
                                        value={netsal || 0}
                                        class="form-control label_text"
                                        placeholder=""
                                        required="required"
                                        data-error="Firstname is required."
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div class="mt-3">
                                  <button type="submit" onClick={ongeneratesalary} class="btn sign_out_btn text-white text-center px-3 py-2  pt-2"><h3>Generate Salary</h3></button>
                              </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
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

export default Generatesalary;
