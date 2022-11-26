import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Axios from 'axios';
import moment from 'moment';
import Sidebar from '../common/Sidebar';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const UpdateEmp = (props) => {
  let navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [staffidd, setstaffidd] = useState('');
  const [name, setName] = useState('');
  const [dob, setdob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [citydata, setCitydata] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setaddress] = useState("");
  const [doj, setDoj] = useState("");
  const [state, setState] = useState("");
  const [lastworkdate, setlastworkdate] = useState("");
  const [depart, setdepart] = useState([]);
  const [departmentdata, setdepartmentdata] = useState([]);
  const [qualification, setqualification] = useState("");
  const [experience, setexperience] = useState("");
  const [altno, setaltno] = useState("");
  const [pic, setpic] = useState("");
  const [skill, setskill] = useState("");
  const [status, setstatus] = useState("");
  const [accname, setaccname] = useState("");
  const [bankname, setbankname] = useState("");
  const [branchname, setbranchname] = useState("");
  const [accno, setaccno] = useState("");
  const [ifsccode, setifsccode] = useState("");
  const [oldsalary, setoldsalary] = useState("");
  const [newsalary, setnewsalary] = useState("");
  const [appliedon, setappliedon] = useState("");
  const [statedata, setstatedata] = useState("");
  const [stateId, setStateId] = useState("");
  const [salaryval, setsalaryval] = useState();


  const idd = localStorage.getItem('staffid');
  // const sname = localStorage.getItem('staff_name');
  const stname = localStorage.getItem('newstaff_name');


  const Empdetail = () => {
    Axios.get(`https://apnaorganicstore.in/empapp/employeeDetail/${idd}`).then((response) => {
      // console.log(response.data[0].dob)
      setstaffidd(response.data[0].id)
      setEmployeeList(response.data[0]);
      setName(response.data[0].staff_name)
      setdob(moment(response.data[0].dob).format('YYYY-MM-DD'))
      setGender(response.data[0].gender)
      setCitydata(response.data[0].city)
      setstatedata(response.data[0].state)
      setCountry(response.data[0].country)
      setEmail(response.data[0].email)
      setMobile(response.data[0].mobile)
      setaddress(response.data[0].address)
      setdepartmentdata(response.data[0].department_id)
      setqualification(response.data[0].qualification)
      setexperience(response.data[0].experience)
      setaltno(response.data[0].alternate_no)
      setskill(response.data[0].skills)
      setstatus(response.data[0].status)
      setpic(response.data[0].pic)
      setDoj(moment(response.data[0].doj).format("YYYY-MM-DD"))
      setlastworkdate(moment(response.data[0].last_working_date).format("YYYY-MM-DD"))
      setsalaryval(response.data[0].salary)
      setoldsalary(response.data[0].salary)

      });
        department();
         }

 useEffect(() => {
    Empdetail();
  }, [UpdateEmp]);

const onbankdetailclick=()=>{
  // alert("----------bank")
  Axios.get(`https://apnaorganicstore.in/empapp/bankdetails/${idd}`).then((response) => {
      setstaffidd(idd);
      setaccname(response.data[0].acc_holder);
      setaccno(response.data[0].account_no);
      setbankname(response.data[0].bank_name);
      setbranchname(response.data[0].branch_name);
      setifsccode(response.data[0].ifsc_code);
  })

 
}
const onincdetailclick=()=>{
  Axios.get(`https://apnaorganicstore.in/empapp/incrementdetail/${idd}`).then((response) => {
    setstaffidd(response.data[0].staff_id);
    setoldsalary(salaryval);
    // setnewsalary(response.data[0].new_salary);
    setappliedon(response.data[0].applied_on)

  })
}
  const department = () => {
    Axios.get("https://apnaorganicstore.in/empapp/department").then((response) => {
      setdepart(response.data);
    });
  };

  const getStates = () => {
    Axios.get("https://apnaorganicstore.in/empapp/state").then((response) => {
      setState(response.data);

    });
  };

  const getCity = () => {
    Axios.get(`https://apnaorganicstore.in/empapp/city/${stateId}`).then((response) => {
      setCity(response.data);
    });
  };
  useEffect(() => {
    getStates();
    getCity();
  }, [stateId]);



  const updEmployee = () => {
    if (!name) {
      toast("Please Enter the name", {
        position: "top-center",
        autoClose: 5000,
      })
      return false;
    }
    if (dob.length === 0) {
      toast("Please Enter the Date of Birth", {
        position: "top-center",
        autoClose: 5000,
      })
      return false;
    }
    if (gender.length === 0) {
      toast("Please Enter the Gender", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (email.length === 0) {
      toast("Please Enter the email", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (mobile.length === 0) {
      toast("Please Enter the mobile Number", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (address.length === 0) {
      toast("Please Enter the address", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (doj.length === 0) {
      toast("Please Enter the Date of Joining", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    //  if(city.length === 0){
    //   toast("Please Enter the city",{
    //     position: "top-center",
    //     autoClose: 5000,
    //     });
    //   return false;
    //  }
    //  if(state.length === 0){
    //   toast("Please Enter the state",{
    //     position: "top-center",
    //     autoClose: 5000,
    //     });
    //   return false;
    //  }
    if (country.length === 0) {
      toast("Please Enter the country", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }


    Axios.post(`https://apnaorganicstore.in/empapp/update`, {
      id: staffidd,
      staff_name:name,
      dob: moment(dob).format('YYYY-MM-DDTHH:mm:ss.000Z'),
      gender: gender,
      email: email,
      mobile: mobile,
      address: address,
      pic:pic,
      doj: moment(doj).format('YYYY-MM-DDTHH:mm:ss.000Z'),
      city: citydata,
      state: statedata,
      country: country,
      department_id: departmentdata,
      last_working_date: moment(lastworkdate).format('YYYY-MM-DD'),
      password: password,
      skills: skill,
      experience: experience,
      qualification: qualification,
      alternate_no: altno,
      status:status,
      salary:salaryval
    }).then((response) => {
      

    });
    alert("Data is updated successfully")
   
  }

  const add_inc_detail= ()=>{
  Axios.post(`https://apnaorganicstore.in/empapp/incrementlogcreate`, {
      staff_id: staffidd,
      staff_name: name,
      applied_on: appliedon,
      old_salary: salaryval,
      new_salary: newsalary,
    }).then((response) => {
      setsalaryval(newsalary)
      Axios.post(`https://apnaorganicstore.in/empapp/index/update`, {
        id: staffidd,
        staff_name:name,
        dob: moment(dob).format('YYYY-MM-DDTHH:mm:ss.000Z'),
        gender: gender,
        email: email,
        mobile: mobile,
        address: address,
        pic:pic,
        doj: moment(doj).format('YYYY-MM-DDTHH:mm:ss.000Z'),
        city: citydata,
        state: statedata,
        country: country,
        department_id: departmentdata,
        last_working_date: moment(lastworkdate).format('YYYY-MM-DD'),
        password: password,
        skills: skill,
        experience: experience,
        qualification: qualification,
        alternate_no: altno,
        status:status,
        salary:newsalary
      }).then((response) => {
        
  
      });
      alert("Data is updated successfully")
     
    
    });
  }
  const add_bank_detail= ()=>{
      Axios.post(`https://apnaorganicstore.in/empapp/bankkcreate`,{
        staff_id:idd,
        staff_name:name,
        acc_holder:accname,
        account_no:accno,
        bank_name:bankname,
        branch_name:branchname,
        ifsc_code:ifsccode,
      }).then(async(response) => {
        
    })
  alert("Data is updated successfully")
}

const salaryyOnchange = (e) => {
    setsalaryval(e.target.value)
}
  const nameOnchange = (e) => {
    setName(e.target.value)
  }
  const dobOnchange = (e) => {
    setdob(e.target.value)
  }
  const genderOnchange = (e) => {
    setGender(e.target.value)
  }
  const cityOnchange = (e) => {
    setCitydata(e.target.value)
  }
  const countryOnchange = (e) => {
    setCountry(e.target.value)
  }
  const emailOnchange = (e) => {
    setEmail(e.target.value)
  }
  const mobileOnchange = (e) => {
    setMobile(e.target.value)
  }
  const addressOnchange = (e) => {
    setaddress(e.target.value)
  }
  const departOnchange = (e) => {
    setdepartmentdata(e.target.value)
  }
  const dojOnchange = (e) => {
    setDoj(e.target.value)
  }
  const stateOnchange = (e) => {
    let arr = e.target.value.split(',')
    setstatedata(arr[0])
    setStateId(arr[1])
  }
  const qualificationOnchange = (e) => {
    setqualification(e.target.value)
  }
  const alternatenoOnchange = (e) => {
    setaltno(e.target.value)
  }
  const expOnchange = (e) => {
    setexperience(e.target.value)
  }
  const skillOnchange = (e) => {
    setskill(e.target.value)
  }
  const statusOnchange = (e) => {
     if (e.target.checked) {
     
      setstatus(1)
    } else {
      setstatus(0)

    }
  };

  const accnameOnchange = (e) => {
    setaccname(e.target.value)
  }
  const accnoOnchange = (e) => {
    setaccno(e.target.value)
  }
  const picOnchange = (e) => {
    setpic(e.target.value)
  }
  const banknamOnchange = (e) => {
    setbankname(e.target.value)
  }
  const branchnamOnchange = (e) => {
    setbranchname(e.target.value)
  }
  const ifscOnchange = (e) => {
    setifsccode(e.target.value)
  }
  const oldonChange = (e) => {
    setoldsalary(e.target.value)

  }
  const newonChange = (e) => {
    setnewsalary(e.target.value)
    
  }
  const appliedonChange = (e) => {
    setappliedon(e.target.value)
  }

  return (
    <>
    
    <div className="addemployee_box">
      <ToastContainer />
      <Header />
      <div className="addemployee_box_row">
        <Sidebar className='sidebar_add_emp' />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        <div className="emp_table">

          <div className="d-flex justify-content-between align-items-center border-bottom pb-5 ">
            <h1 className="h1 heading_"><b>Update Employee Details</b></h1>
            <div className="btn-toolbar mb-2 mb-md-0">
             
            </div>
          </div>
          <div class="container_fluid px-5 py-0">

            <Tabs>
              <TabList>
                <Tab> <h3>Personal Details</h3></Tab>
                <Tab onClick={onbankdetailclick}><h3>Bank Details</h3></Tab>
                <Tab onClick={onincdetailclick}><h3>Increment Details</h3></Tab>
                <Tab><h3>Document Upload</h3></Tab>
             </TabList>
             <TabPanel >
    {/* <img src={pic} className={'image'} ></img> */}

                <div class="row ">

                  <div class="container">
                    <form id="contact-form" role="form">
                      <div class="controls">
                        {/* <h5 class="mt-4"><b>Personal Details-</b></h5> */}

                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Name of Employee *</label>

                              <div class="input-group mb-3">
                                <input type="text" class="form-control label_text label_text" placeholder="Name"
                                  aria-label="Username" aria-describedby="basic-addon1"
                                  value={name} onChange={nameOnchange} />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Date of Birth *</label>

                              <div class="input-group mb-3">
                                <input type="date" class="form-control label_text" placeholder="Dob"
                                  aria-label="Dob" aria-describedby="basic-addon1"
                                  value={dob} onChange={dobOnchange} />
                              </div>
                            </div>
                          </div>


                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Gender*</label>

                              <div class="input-group mb-3">

                                <select onChange={genderOnchange} className={"dept label_text"} value={gender} >Select
                                  <option value="">Select</option>

                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Qualification*</label>

                              <div class="input-group mb-3">
                                <input type="text" class="form-control label_text" placeholder=""
                                  aria-label="Username" aria-describedby="basic-addon1"
                                  onChange={qualificationOnchange} value={qualification} />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">

                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Mobile*</label>

                              <input type="number" class="form-control label_text" placeholder="Mobile no."
                                aria-label="Mobile no." aria-describedby="basic-addon1"
                                onChange={mobileOnchange} value={mobile} />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Residence Phone No.</label>

                              <input type="number" class="form-control label_text" placeholder=""
                                onChange={alternatenoOnchange} value={altno} />
                            </div>
                          </div>
                        </div>


                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Country*</label>
                              <select onChange={countryOnchange} className={"dept label_text"} value={country} >Country
                                <option value={''}>Select</option>

                                <option value={'India'}>India</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>State*</label>
      
                     <select onChange={stateOnchange}  className={"dept label_text"} value={statedata.state}>Select
                    <option>State</option>
                    {(state || []).map((statedata) => (
                      <option value={[statedata.state,statedata.id]}
                       >{statedata.state}</option>
                    ))}
                  </select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>City*</label>
                              <select onChange={cityOnchange} className={"dept label_text"} value={citydata.city}>Select
                                <option>City</option>
                                {(city || []).map((citydata) => (

                                  <option value={citydata.city_name}>{citydata.city_name}</option>


                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="form-group">

                              <label for="form_name" className='label_text'>Address *</label>
                            
                              <textarea type="text" class="form-control label_text" onChange={addressOnchange} value={address} />
                            </div>
                          </div>

                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Email *</label>

                              <div class="input-group mb-3">
                                <input type="email" class="form-control label_text" placeholder="Email"
                                  aria-label="email" aria-describedby="basic-addon1"
                                  onChange={emailOnchange} value={email} />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Skills</label>

                              <input type="text" class="form-control label_text" placeholder="Skills"
                                aria-label="email" aria-describedby="basic-addon1"
                                onChange={skillOnchange} value={skill} />
                            </div>
                          </div>

                        </div>
                        <div className='row mt-4'>
                          <h4><b>Job Details-</b></h4>
                          <div class="col-md-4">

                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Experience *</label>

                              <input type="text" class="form-control label_text" placeholder="job experience"
                                aria-label="Date of joining" aria-describedby="basic-addon1"
                                onChange={expOnchange} value={experience} />
                            </div>
                          </div>
                          <div class="col-md-4">

                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Date of joining *</label>

                              <input type="date" class="form-control label_text" placeholder="Date of joining"
                                aria-label="Date of joining" aria-describedby="basic-addon1"
                                onChange={dojOnchange} value={doj} />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Department *</label>
                              <select className='dept label_text' onChange={departOnchange} value={departmentdata}>Select
                                <option>Department</option>
                                {(depart || []).map((depart) => (

                                  <option value={depart.id}>{depart.department_name}</option>

                                ))}
                              </select>

                            </div>
                          </div>

                        </div>

                        <div class="row mt-4">

                          <div class="col-md-4 mt-3">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Choose File *</label>

    
                              <input type="file" name="image" accept='image/*' class="form-control label_text " onChange={picOnchange} src={pic} />
                            </div>
                          </div>

                          <div class="col-md-4 mt-3">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Salary*</label>

                              <input type="number" name="image" accept='image/*' class="form-control label_text " onChange={salaryyOnchange}  value={salaryval}/>
                            </div>
                          </div>

                          <div class="col-md-4 mt-3">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Status *</label>

                              <div className='status_check'>
                                {status===1 ?
                                  <input type="checkbox"onChange={statusOnchange} value={status} checked/>
                                  :
                                  <input type="checkbox" onChange={statusOnchange} value={status} />
                                } 
                                <span className='label_text'>Active</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3 mt-3">
                          <button type="button" class="btn sign_out_btn text-white text-center p-2" onClick={updEmployee}><h3>Update Employee</h3></button>
                        </div>
                      </div>
                    </form>
                </div>
                </div>
              </TabPanel>
              <TabPanel >
                <div class="row ">
                  <div class="container">

                    <form id="contact-form" role="form">
                      <div class="controls">

                        {/* <h5 class="mt-4"><b>Bank Details-</b></h5> */}
                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Account Holder*</label>

                              <div class="input-group mb-3">
                                <input type="text" class="form-control label_text" placeholder="Name"
                                  aria-label="Username" aria-describedby="basic-addon1"
                                  onChange={accnameOnchange} value={accname} />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Bank Name*</label>
                              <input id="form_name" type="text" name="name" class="form-control label_text" placeholder="" required="required"
                                onChange={banknamOnchange} value={bankname} />

                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Branch Name *</label>
                              <input id="form_lastname" type="text" name="surname" class="form-control label_text" placeholder="" required="required"
                                onChange={branchnamOnchange} value={branchname} />

                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>IFSC Code *</label>
                              <input id="form_lastname" type="text" name="surname" class="form-control label_text" placeholder="" required="required"
                                onChange={ifscOnchange} value={ifsccode} />

                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Account No. *</label>
                              <input id="form_lastname" type="text" name="surname" class="form-control label_text" placeholder="" required="required"
                                onChange={accnoOnchange} value={accno} />

                            </div>
                          </div>
                        </div>
                        <div class="row mt-4">

                          <div class="col-md-3">

                            <button type="button" class="btn sign_out_btn text-white text-center" onClick={add_bank_detail}><h3>Update Bank Details</h3></button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </TabPanel>


              <TabPanel>
                <div class="row mt-4">

                  <div class="container">

                    <form id="contact-form" role="form">
                      <div class="controls">
                        {/* <h5 class="mt-4"><b>Increment Log</b></h5> */}
                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_name" className='label_text'>Old Salary*</label>
                              <input id="form_name" type="text" name="name" class="form-control label_text" placeholder="" required="required"
                                onChange={oldonChange} value={oldsalary} />

                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>New Salary *</label>
                              <input id="form_lastname" type="text" name="surname" class="form-control label_text" placeholder="" required="required"
                                onChange={newonChange} value={newsalary} />

                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="form_lastname" className='label_text'>Applied on*</label>
                              <input id="form_lastname" type="date" name="surname" class="form-control label_text" placeholder="" required="required"
                                onChange={appliedonChange} value={appliedon} />

                            </div>
                          </div>
                        </div>

                        <div class="row mt-4">

                          <div class="col-md-4 mt-3">

                            <button type="button" class="btn sign_out_btn text-white text-center " onClick={add_inc_detail}><h3> Increment Update</h3></button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
          </div>
</main>

      </div>
    </div>
    </>
  );
}

export default UpdateEmp;
