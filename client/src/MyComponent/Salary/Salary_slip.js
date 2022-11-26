import React, { useState, useEffect,useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Axios from "axios";
import moment from "moment";
import { PDFExport } from "@progress/kendo-react-pdf";
import { ToWords } from 'to-words';
import {FaRupeeSign} from 'react-icons/fa';


function Salary_slip(props) {
    const pdfExportComponent = useRef(null);

    const toPdf = event => {
      pdfExportComponent.current.save();
    };

    const idd = localStorage.getItem("staffid");
    // console.log('___idd___' + idd)

    const deductionamt = localStorage.getItem("deduction");
    const [employeeList, setEmployeeList] = useState([]);
    const [bankdetail, setbankdetail] = useState([]);
    const [attendancedata, setattendancedata] = useState([]);
    const [holidaycount, setholidaycount] = useState([]);
    const [salaryList, setsalaryList] = useState([]);
    const [lc, setlc] = useState();
    const [hd, sethd] = useState();
    const [cl, setcl] = useState();
    const [el, setel] = useState();
    const [ia, setia] = useState();
    const [ua, setua] = useState();
    const [ml, setml] = useState();
    const [wday, setwday] = useState();
    const [depart, setdepart] = useState([]);
    const [departmentdata, setdepartmentdata] = useState([]);
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
    const getEmployees = () => {

        Axios.get(`https://apnaorganicstore.in/empapp/bankdetails/${idd}`).then((response) => {
            if (response.data[0] !== null || response.data[0] !== 'undefined' || response.data[0] !== '' || response.data[0] !== 'null' || response.data[0] !== undefined) {
                setbankdetail(response.data[0]);
                // console.log("ghghhuhuhiuiuiuiuy---------------"+JSON.stringify(response.data[0]))
            }
            else
            {
                setbankdetail('');
            }
        });
        Axios.get(`https://apnaorganicstore.in/empapp/attendancehistoryy/${firstdate}/${lastdate}/${idd}`
        ).then((response) => {
            sethd(response.data[0].HD);
            setlc(response.data[0].LC);
            setattendancedata(response.data[0]);
            setcl(response.data[0].CL);
            setml(response.data[0].ML);
            setel(response.data[0].EL);
            setia(response.data[0].IA);
            setua(response.data[0].UA)


        });

        const department = () => {
            Axios.get("https://apnaorganicstore.in/empapp/department").then((response) => {
                setdepart(response.data);
                // console.log("dfdf" + JSON.stringify(response.data))
            });

        };

        Axios.get(`https://apnaorganicstore.in/empapp/getholiday/${firstdate}/${lastdate}`
        ).then((response) => {
            setholidaycount(response.data[0]);
            let wdays = momentmonth - response.data[0].count;
            setwday(wdays)
        });
        Axios.get(`https://apnaorganicstore.in/empapp/employeeDetail/${idd}`).then((response) => {
            setEmployeeList(response.data[0]);
            setdepartmentdata(response.data[0].department_id)
           
        });
        department();
    };
    useEffect(() => {
        getEmployees();

    }, []);

    // console.log('______' + employeeList.salary)
    //   salary deduction
    let netsalary;
    let deductionn;
    let GrossEarnings;
    let onedaysal;
    let absent;
    let leave;
    let medicalleave;
    let emergencyleave;
    let halfday;

    onedaysal = (employeeList.salary / (wday))

    absent = ((onedaysal) * 3 * (ua))

    leave = (onedaysal * 1 * (ia))
    medicalleave = (onedaysal * 1 * (ml))
    emergencyleave = (onedaysal * 1 * (el))
    halfday = ((onedaysal / 2) * 1 * (hd))
    let latecom;

    if (lc > 2) {
        let diff = lc - 2
        if (diff === 1) {
            latecom = 0
        }
        if ((diff % 3 === 0 && diff % 2 === 0) || diff % 3 === 0) {
            latecom = (diff / 3) * onedaysal
        }
        // eslint-disable-next-line no-lone-blocks
        {
            if (diff % 2 === 0 && diff % 3 !== 0) {
                latecom = (diff / 4) * onedaysal
            }
        }
    }
    if (lc < 2) {
        latecom = 0;
    }
    deductionn = absent + leave + medicalleave + emergencyleave + halfday + latecom;
    GrossEarnings = (employeeList.salary)
    netsalary = (GrossEarnings) - (deductionn);
 
    const toWords = new ToWords();
    let words='';
   if(!isNaN(netsalary)){
   words = toWords.convert(parseInt(netsalary));
}

    let departm;

    // eslint-disable-next-line array-callback-return
    (depart || []).map((depdata) =>{
        if(departmentdata===depdata.id){
           
            departm=depdata.department_name
        }
    })



    const styles = {
        coverBg: {
                   zIndex: 0,
                   width: "800px",
                   padding:"10px 20px",
                   maxHeight: 'fit-content',
                 } ,

        fontsize1: {
            fontSize: "12px",
            padding:'1px'
        },
        fontsize: {
            fontSize: "12px",
            padding:'1px'
        },
        dflex:{
            display:'flex',
            flexWrap:'wrap',
        },
      };
   
    return (
        <>
      <pre style={styles.coverBg} >
        <PDFExport ref={pdfExportComponent}>
          
            <div id="divToPrint" class="container " >
                <div class="dflex" style={styles.dflex}>
                    <div class="col-md-12 mx-auto">
                        <div class="text-center lh-1 mb-2">
                            <h3 class="fw-bold" style={styles.fontsize}>Payslip</h3> 
                            <span class="fw-normal" className='label_text' style={styles.fontsize1}>Payment slip for the month of {moment(bankdetail.added_on).format('MMMM-YYYY')}</span>
                        </div>
                        <div class="d-flex justify-content-end label_text px-5" style={styles.fontsize}><span className="branch"><b style={styles.fontsize1}>Working Branch:</b >We2code Technology</span> </div>
                        <div class="row1" style={styles.dflex}>
                            <div class="col-md-12">
                                <div class="row1" style={styles.dflex}>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder label_text" style={styles.fontsize}>EMP Id:</span> 
                                        <small class="ms-3 label_text" style={styles.fontsize1}>{employeeList.id}</small> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder label_text" style={styles.fontsize}>EMP Name:</span> 
                                        <small class="ms-3 label_text" style={styles.fontsize1}>{employeeList.staff_name}</small> </div>
                                    </div>
                                </div>
                                <div class="row1" style={styles.dflex}>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder label_text" style={styles.fontsize}>Department:</span> 
                                        <small class="ms-3 label_text" style={styles.fontsize1}>{departm}</small> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder label_text" style={styles.fontsize}>Payment Month:</span> 
                                        <small class="ms-3 label_text" style={styles.fontsize1}>{moment(bankdetail.added_on).format('YYYY-MMM')}</small> </div>
                                    </div>
                                </div>
                                <div class="row1" style={styles.dflex}>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder label_text" style={styles.fontsize}>Name of Bank:</span> 
                                        <small class="ms-3 label_text" style={styles.fontsize1}>{bankdetail.bank_name}</small> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder label_text" style={styles.fontsize}>Mode of Payment:</span> 
                                        <small class="ms-3 label_text" style={styles.fontsize1}>Online</small> </div>
                                    </div>
                                </div>
                                <div class="row1" style={styles.dflex} >
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder label_text" style={styles.fontsize}>Date of Payment:</span> 
                                        <small class="ms-3 label_text" style={styles.fontsize1}>{moment(bankdetail.added_on).format('YYYY-MMM-DD')}</small> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder label_text" style={styles.fontsize}>Ac No.:</span> 
                                        <small class="ms-3 label_text" style={styles.fontsize1}>{bankdetail.account_no}</small> </div>
                                    </div>
                                </div>
                            </div>
                            <table class="mt-4 table table-bordered salarysliptable">
                                <thead class="bg-dark text-white">
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Description</th>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Earnings</th>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Deductions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Basic</th>
                                        <td className='label_text'  style={styles.fontsize1}>{employeeList.salary}</td>
                                        <td style={styles.fontsize1}> </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize} >Dearness Allowance</th>
                                        <td className='label_text'  style={styles.fontsize1}>{salaryList.allowance}</td>
                                        <td style={styles.fontsize1}> </td>


                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>House Rent Allowance</th>
                                        <td className='label_text'  style={styles.fontsize1}>{salaryList.allowance} </td>
                                        <td style={styles.fontsize1}> </td>
                                    </tr>

                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize} >Sales Incentive</th>
                                        <td className='label_text'  style={styles.fontsize1}>{salaryList.allowance}</td>
                                        <td style={styles.fontsize1}> </td>


                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Leave Encashment</th>
                                        <td className='label_text'  style={styles.fontsize1}>{salaryList.allowance}</td>
                                        <td style={styles.fontsize1}> </td>



                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Holiday Wages</th>
                                        <td className='label_text'  style={styles.fontsize1}>{salaryList.allowance}</td>
                                        <td style={styles.fontsize1}> </td>


                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Special Allowance</th>
                                        <td className='label_text'  style={styles.fontsize1}>{salaryList.allowance}</td>
                                        <td style={styles.fontsize1}> </td>



                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>PF</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{salaryList.tax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>ESI</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{salaryList.tax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Professional Tax</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{salaryList.tax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Other</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{salaryList.tax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Absent</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{absent}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Leave</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{leave}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Late Comings</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{latecom}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>Half Day </th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{halfday}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>CL</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{'0'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='label_text' style={styles.fontsize}>ML</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{medicalleave}</td>
                                    </tr>
                                    <tr class="border-top">
                                        <th scope="row" className='label_text' style={styles.fontsize}>Total</th>
                                        <td className='label_text'  style={styles.fontsize1}>{GrossEarnings}</td>
                                        <td  className='label_text' style={styles.fontsize1}>{deductionn}</td>

                                    </tr>
                                    <tr class="border-top">
                                        <th scope="row" className='label_text' style={styles.fontsize}>Gross Earnings(A)</th>
                                        <td  className='label_text' style={styles.fontsize1}>{GrossEarnings}</td>
                                        <td  ></td>

                                    </tr>
                                    <tr class="border-top">
                                        <th scope="row" className='label_text' style={styles.fontsize}>Gross Deduction(B)</th>
                                        <td ></td>
                                        <td  className='label_text' style={styles.fontsize1}>{deductionn}</td>


                                    </tr>
                                    <tr class="border-top">
                                        <th scope="row" className='label_text' style={styles.fontsize}>Net Salary Payable(A-B)</th>
                                        <td className='label_text'  style={styles.fontsize1}>{netsalary}</td>
                                        <td  className='label_text'></td>


                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row1" style={styles.dflex}>
                            <div class="col-md-6"><span class="fw-bold label_text" style={styles.fontsize}>Net Pay :<FaRupeeSign/>{netsalary}</span> </div>
                            <div class="border col-md-6">
                                <div class="d-flex flex-column label_text" style={styles.fontsize} > <span>In Words</span> <span className="hhlkjlj"><b style={styles.fontsize1}>{words}  only</b></span> </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end">
                            <div class="d-flex flex-column px-5 pb-5" style={styles.fontsize}><span class="label_text" style={styles.fontsize1}>Regards</span> <span class="label_text" style={styles.fontsize1}>We2code Technology</span>  </div>
                        </div>
                    </div>
                </div>
            </div>
      </PDFExport>

            </pre>
            <div class="d-flex gap-2">
                <Link to='/Salary_list' className="nav-link">

                    <Button><h4>Home</h4></Button>
                </Link>

                    <Button onClick={toPdf}> <h4>Download</h4></Button>

               
            </div>
            
       
        </>
    );
};

export default Salary_slip;




