import React, { useState, useEffect,useMemo } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Axios from "axios";
import DataTable from "react-data-table-component";
import FilterComponent from "../Department/FilterComponent";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { confirm } from "react-confirm-box";
import moment from 'moment';
import { Input } from "@mui/material";
const Holidays = () => {
   const [open, setOpen] = React.useState(false);
   const [editopen, seteditOpen] = React.useState(false);
   const [holidaydata, setHolidaydata] = useState([]);
   const [hoday, sethoday] = useState();
   const [SelectedData, setSelectedData] = useState(null);
   const [Status, setStatus] = useState();
   const [event, setEvent] = useState("");
   const [fromDays, setFromDays] = useState("");
   const [toDays, setToDays] = useState("");
   const [description, setDescription] = useState("");  
   const [apicall, setapicall] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
    }
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleeditClose = () => {
    seteditOpen(false)
  };
 const OnholidayChange = (e)=>{
  if(e.target.checked){
    sethoday(1)
  }else{
    sethoday(0)
  }
 }
  const handleadd = () => {
  const diffmnth= Math.abs(moment(fromDays).diff(moment(toDays), 'days'));
      Axios.post("https://apnaorganicstore.in/empapp/holidayCreate",{
      event: event,
      discription: description,
      is_holiday: hoday,
      status:Status,
      fromDays:fromDays,
      toDays:toDays,
      diffmnth:diffmnth
    }).then((response) => {
      if(response){
        alert("Data is saved successfully")
        setapicall(true)
        setOpen(false);
        seteditOpen(false);

      }
     
    });
  };

  const getHoliday = () => {
    Axios.get("https://apnaorganicstore.in/empapp/holiday").then((response) => {
      setHolidaydata(response.data);
      setapicall(false)
    });
  
  };
  useEffect(() => {
    getHoliday();
  }, [apicall]);



  // search sectuon


  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = holidaydata.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

 
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

    // 
  const DelClick = async (group_id) => {
    const result = await confirm("ARE YOU SURE YOU WANT TO PERFORM THIS OPERATION");
    if (result) {
      Axios.get(`https://apnaorganicstore.in/empapp/holidayDelete/${group_id}`, {
    }).then((response) => {
      setapicall(true)
    });
      return;
    }
    console.log("You click No!");

  };

  const editClick = (group_id) => {
    seteditOpen(true)

    {
      holidaydata.map((depdata) => {

        if(depdata.group_id == `${group_id}`) {
          return(
       setEvent(depdata.event),
       setFromDays(moment(depdata.from_holiday_date).format('YYYY-MM-DD')),
       setToDays(moment(depdata.to_holiday_date).format('YYYY-MM-DD')),
      setDescription(depdata.discription),
       sethoday(depdata.is_holiday),
       setStatus(depdata.status),
      setSelectedData(depdata.group_id)
          )
        }
      });
      setapicall(true)
    }
   
  };
  
  const onChangeEvent = (e) => {
    setEvent(e.target.value);
  };
  
  const onChangeFromDays = (e) => {
    setFromDays(e.target.value);
  };

  const onChangeToDays = (e) => {
    setToDays(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeStatuss = (e) => {
   setStatus(e.target.value)
  };
 
  const updateClick = () => {
    Axios.get(`https://apnaorganicstore.in/empapp/holidayDelete/${SelectedData}`, {
    }).then((response) => {
    });
    handleadd();
    setapicall(true)
  };
  //
  const columns = [
    {
      name: "Name",
      selector: (row) => row.event,
      sortable: true,
    },
   
    {
      name: "Decription",
      selector: (row) => row.discription,
      sortable: true,
    },
    {
      name: "Holiday From",
      selector: (row) => moment(row.from_holiday_date).format('DD-MM-YYYY'),
      sortable: true,
    },
    {
      name: "Holiday To",
      selector: (row) => moment(row.to_holiday_date).format('DD-MM-YYYY') ,
      sortable: true,
    },
   
    {
      name: "Type",
      selector: (row) =>
      {
        return(
          row.is_holiday === 1 ? 'Holiday' : 'Event'
        )
             },
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
    return(
        row.status === 1 ? 'Active' : row.status === 0 ?'InActive' : null
    )
         },
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) =>       
       
        (
          <>
            <i
              key={row.title}
              onClick={editClick.bind(this, row.group_id)}
              className="firsticpn fas fa-pen"
            ></i>
            
           <i
              onClick={DelClick.bind(this, row.group_id)}
              className="fas fa-trash-alt"
            ></i>
          </>
        )
        ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          {/*  */}
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 ">
          
            </div>
      {/* popup */}
{/* add click */}
            <div>
      <Dialog open={open} onClose={handleClose} className={'popup_main_box'}>
        <DialogTitle className="popupheading"><b>ADD EVENT</b></DialogTitle>
        <DialogContent className="popup_content_box">
        <label className={'label_text'} >Event</label>
          <Input
           className={''}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeEvent}
            value={event}
          />
        <label className={'label_text'} >From</label>
         
          <Input
           className={'label_text'}
            autoFocus
            margin="dense"
            id="name"
            type="date"
            fullWidth
            variant="standard"
            onChange={onChangeFromDays}
            value={fromDays}

          />
        <label className={'label_text'} >To</label>

          <Input
           className={'label_text'}
            autoFocus
            margin="dense"
            id="name"
            type="date"
            fullWidth
            variant="standard"
            onChange={onChangeToDays} 
            value={toDays}
            placeholder={''}
          />
        <label className={'label_text'} >Description</label>
          
          <Input
           className={'label_text'}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeDescription}
            value={description}

          />

           <p className="p-0 mb-0 mt-4 text-dark label_text">Status</p>
           <div className="p-0 mb-0 text-dark d-flex align-items-center">
           <div className={'mr-4 d-flex align-items-center'}>
           <p className="mb-0 mr-2 h4">Active</p>
         <input type={'radio'}  onChange={onChangeStatuss}
            value={1} name={Status+event} />
            </div>
           <div className={'d-flex align-items-center px-5'}>
           <p className="mb-0 mr-2 h4">InActive</p>
             <input type={'radio'}  onChange={onChangeStatuss}
            value={0} name={Status+event}/>
            </div>
            </div>

           <div className="p-0 mb-0 mt-4 text-dark ">
          <p className="text-dark mb-0 p-0 label_text">IsHoliday</p>
         <input type={'checkbox'}  onChange={OnholidayChange}
            value={hoday}/>
        </div>  
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  class='btn sign_out_btn text-white text-center'><b><h3>Cancel</h3></b></Button>
       <Button onClick={handleadd}  class='btn sign_out_btn text-white text-center '><b><h3>Add Event</h3></b></Button> 
      
        </DialogActions>
      </Dialog>
    </div>
           {/*  */}


{/* update click */}
<div>
      <Dialog open={editopen} onClose={handleeditClose} className={'popup_main_box'}>
        <DialogTitle className={'popupheading'}>UPDATE EVENT</DialogTitle>
        <DialogContent>
        
          <div className="event_table">
          <label className="label_text">Event</label>
          <Input
            className={'label_text'}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeEvent}
            value={event}
          />
          <label className="label_text">From</label>

          <Input
           className={'label_text'}
            autoFocus
            margin="dense"
            id="name"
            type="date"
            fullWidth
            variant="standard"
            onChange={onChangeFromDays}
            value={fromDays}

          />
          <label className="label_text">To</label>

          <Input
           className={'label_text'}
            autoFocus
            margin="dense"
            id="name"
            type="date"
            fullWidth
            variant="standard"
            onChange={onChangeToDays} 
            value={toDays}

          />
          <label className="label_text">Description</label>
          
          <Input
           className="label_text"
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeDescription}
            value={description}

          />
</div>
           <label className="p-0 mb-0 mt-4 text-dark label_text">Status</label>
           <div className="p-0 mb-0 text-dark d-flex align-items-center">
           <div className={'mr-4 d-flex align-items-center'}>
           <p className="mb-0 mr-2 h4" >Active</p>
           {Status === 1 ?
         <input type={'radio'}  onChange={onChangeStatuss}
            value={1} name={Status+event} checked/>:
             <input type={'radio'}  onChange={onChangeStatuss}
            value={1} name={Status+event} />
            }
            </div>
           <div className={'d-flex align-items-center px-5'}>
           <p className="mb-0 mr-2 h4">InActive</p>
           {Status === 0 ?
         <input type={'radio'}  onChange={onChangeStatuss}
            value={0} name={Status+event} checked/>:
             <input type={'radio'}  onChange={onChangeStatuss}
            value={0} name={Status+event}/>}
            </div>
            </div>

<div className="p-0 mb-0 mt-4 text-dark">
          <label className="text-dark mb-0 p-0 label_text">IsHoliday</label>
          {hoday === 1 ?
         <input type={'checkbox'}  onChange={OnholidayChange}
            value={hoday} checked/>  : <input type={'checkbox'}  onChange={OnholidayChange}
            value={hoday}/>}
        </div>  
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleeditClose}  class='btn sign_out_btn text-white text-center px-5 py-2   add-new'><b>Cancel</b></Button>
       <Button onClick={updateClick}  class='btn sign_out_btn text-white text-center px-5 py-2  add-new'><b>Update Event</b></Button>  
       
        </DialogActions>
      </Dialog>
    </div>
    {/*  */}
    
           
            <div className="holiday_table">
            <div class=" d-flex justify-content-between align-items-center border-bottom pb-5">

             
                <h1 className="h1 heading_">
                  <b> Events & Holidays </b>
                </h1>
            
          
            
            <div className="btn-group mr-2 px-5">
              <Button variant="outlined" class='btn sign_out_btn text-white text-center px-5 py-2  add-new ' onClick={handleClickOpen} >
          <b> <h3> Add Events</h3></b> 
            </Button>
            </div>
          </div>
          </div>
            <DataTable
              highlightOnHover
              pointerOnHover
              pagination
              columns={columns}
              data={filteredItems}
              subHeader
              subHeaderComponent={subHeaderComponent}
            />
          </main>
        </div>
      </div>
      
    </>
  );
};

export default Holidays;
