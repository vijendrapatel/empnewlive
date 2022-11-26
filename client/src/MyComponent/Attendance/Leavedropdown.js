import React, { useState, useEffect } from "react";
import moment from "moment";
import Axios from "axios";

const Leavedropdown = (props) => {
  let employeid = props.employeeid;
  let employname = props.employeename;
  let mdates = props.mdays;
  let attendmonth=props.attendmonthh
  const [attendancedata, setattendancedata] = useState('');
  const [statusdata, setstatusdata] = useState();


    // api

useEffect(() => {
  Axios.get(
    `https://apnaorganicstore.in/empapp/dailyattendance/${props.firstdate}/${props.lastdate}/${employeid}`
  ).then((response) => {
    setattendancedata(response.data);
  });

}, [props.employeedataaa,attendmonth]);


// 
  // for
  let element = [];
  let el;
  let stat;
  let Stst = [];
  for (let index = 0; index < attendancedata?.length; index++) {
    el = moment(attendancedata[index].atd_date).format(`YYYY-MM-DD`);
    element.push(el);
    stat = attendancedata[index].Status;
    Stst.push(stat);
  }
  let hoday = [];
  let honame = [];
  let hname;
  let hday;
  let m = moment(attendmonth).format('MM');
  let y = moment(attendmonth).format('YYYY');


  
  for (let ind = 0; ind < props.holiday?.length; ind++) {
    if(props.holiday[ind].status === 1 && props.holiday[ind].is_holiday === 1){
      hname = props.holiday[ind].event;
      honame.push(hname);
          let i = moment(props.holiday[ind].holiday_date,'YYYY-MM-DD').format('dddd')
        hday = moment(props.holiday[ind].holiday_date).format('YYYY-MM-DD');
        hoday.push(hday);
      
    }
  }
  //  onchange
  let val;
  const onstatuschange = (id,e) => {
    
     val = e.target.value;

     Axios.post("https://apnaorganicstore.in/empapp/attendance/create", {
      staff_id: id[2],
      staff_name: id[1],
      Status: val,
      atd_date: id[0],
    }).then((response) => {
     
    });
   };
  //

  return (
    <>
      {(mdates || []).map((mdate, index) => {
        let x = element.indexOf(mdate);
        let y = hoday.indexOf(mdate);
                return moment(element[x]).isSame(mdate) ? (
                  (moment(mdate).format('ddd')=== 'Sun')  ?
          <td  scope="row" className="leavestatusdropdown">
        
         <select  className={'sundaymonth'}>
          <option value={""}>{"S"}</option>
          </select>
          </td>
         :   (moment(hoday[y]).isSame(mdate)) ?
        
           <td key={index} scope="row" className="leavestatusdropdown">
            <select  className={'sundaymonth'}>
          <option value={""}>{honame[y]}</option>
          </select>
          </td> 
       
          :
          <td key={index} scope="row" className="leavestatusdropdown">
            <select
            name={'aid_'+employeid+'_'+mdate}
              value={element[x] === mdate ? Stst[x] : ''}
              onChange={onstatuschange.bind(this, [mdate, employname, employeid])}
              className={''}
            >
              <option value={""}>{''}</option>
              <option value={"1"}>{"HD"}</option>
              <option value={"2"}>{"CL"}</option>
              <option value={"3"}>{"ML"}</option>
              <option value={"4"}>{"EL"}</option>
              <option value={"5"}>{"UA"}</option>
              <option value={"6"}>{"IA"}</option>
              <option value={"7"}>{"LC"}</option>
            
            </select>
            </td>
        )
        

         : (
          (moment(mdate).format('ddd')=== 'Sun') ?


          <td key={index} scope="row" className="leavestatusdropdown">
          <select  className={'sundaymonth'}>
          <option value={""}>{"S"}</option>
         </select>
          </td>

         :   (moment(hoday[y]).isSame(mdate) ) ?
     
        <td key={index} scope="row" className="leavestatusdropdown">
            <select  className={'holimonth'}>
          <option value={""}>{'E'}</option>
          </select>
      </td>
         
          :
          <td className="leavestatusdropdown" key={index} scope="row">
            <select
            name={'aid_'+employeid+'_'+mdate}
              value={statusdata}
              onChange={onstatuschange.bind(this, [mdate, employname, employeid])}
              className={''}
            >
              <option value={""}>{''}</option>
              <option value={"1"}>{"HD"}</option>
              <option value={"2"}>{"CL"}</option>
              <option value={"3"}>{"ML"}</option>
              <option value={"4"}>{"EL"}</option>
              <option value={"5"}>{"UA"}</option>
              <option value={"6"}>{"IA"}</option>
              <option value={"7"}>{"LC"}</option>
            </select>
         
          </td>
        );
      })}
    </>
  );
};

export default Leavedropdown;
