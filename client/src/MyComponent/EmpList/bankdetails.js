import React, {  useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/salary/Generatesalary.css';

const Bankdetails = () => {


  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [bankname, setbankname] = useState("");
  const [branchname, setbranchname] = useState("");
  const [accno, setaccno] = useState("");
  const [ifsccode, setifsccode] = useState("");
const addBankDetails = () => {
   
    const idd = localStorage.getItem('newstaffid');
    const sname =localStorage.getItem('newstaff_name');
   
    if (name.length === 0) {
      toast("Please Enter the name", {
        position: "top-center",
        autoClose: 5000,
      })
      return false;
    }
    if (!bankname) {
      toast("Please Enter the bank name", {
        position: "top-center",
        autoClose: 5000,
      })
      return false;
    }
    if (branchname.length === 0) {
      toast("Please Enter the branch name", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (accno.length === 0) {
      toast("Please Enter the account number", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (ifsccode.length === 0) {
      toast("Please Enter the IFSC code", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
   Axios.post("https://apnaorganicstore.in/empapp/bankkcreate", {
      staff_id:idd,
      staff_name: sname,
      acc_holder:name,
      bank_name: bankname,
      branch_name: branchname,
      ifsc_code: ifsccode,
      account_no:accno,
      
    }).then((response) => {
      console.log("------" + response)
      // navigate("/IncrementLog");
    });
  alert("Data is saved successfully")
    
  }
const nameOnchange = (e) => {
    setName(e.target.value)
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
  const accnoOnchange = (e) => {
    setaccno(e.target.value)
  }

  
  return (
    <div className="addemployee_box">
      <ToastContainer />
      
      <div className="addemployee_box_row">

        
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
         <div class="container_fluid">
            <div class="row ">
            <div class="container">

                <form id="contact-form" role="form">
                  <div class="controls">
                    
                    {/* <h5 class="mt-4"><b>Bank Details-</b></h5> */}
                    <div class="row mt-4">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="form_name"  className='label_text'>Account Holder*</label>

                          <div class="input-group mb-3">
                            <input type="text" class="form-control label_text" placeholder="Name"
                              aria-label="Username" aria-describedby="basic-addon1"
                            onChange={nameOnchange} />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="form_name"  className='label_text'>Bank Name*</label>
                          <input id="form_name" type="text" name="name" class="form-control label_text " placeholder="" required="required"
                          onChange={banknamOnchange} />

                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="form_lastname"  className='label_text'>Branch Name *</label>
                          <input id="form_lastname" type="text" name="surname" class="form-control label_text" placeholder="" required="required"
                           onChange={branchnamOnchange} />

                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="form_lastname "  className='label_text'>IFSC Code *</label>
                          <input id="form_lastname" type="text" name="surname" class="form-control label_text" placeholder="" required="required"
                          onChange={ifscOnchange}  />

                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="form_lastname"  className='label_text'>Account No. *</label>
                          <input id="form_lastname" type="text" name="surname" class="form-control label_text" placeholder="" required="required" 
                          onChange={accnoOnchange} />

                        </div>
                      </div>
                      </div>
                   <div class="row mt-4">

                    <div class="col-md-3">

                        <button type="button" class="btn sign_out_btn text-white text-center" onClick={addBankDetails}><h3>Add Bank Details</h3></button>
                       </div>
                  </div>
                 </div>
                </form>
            </div>
            </div>
          </div>
           </main>
          </div>
    </div>
  );
}

export default Bankdetails;
