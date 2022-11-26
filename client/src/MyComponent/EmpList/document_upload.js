import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Documentupload(props) {
  const[doc,setdoc]=useState();
  const idd = localStorage.getItem('newstaffid');
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();
  const [file5, setFile5] = useState();
  const [file6, setFile6] = useState();

  const [fileNameone, setFileNameone] = useState("");
  const [fileNametwo, setFileNametwo] = useState("");
  const [fileNamethree, setFileNamethree] = useState("");
  const [fileNamefour, setFileNamefour] = useState("");
  const [fileNamefive, setFileNamefive] = useState("");
  const [fileNamesix, setFileNamesix] = useState("");
 

  const imageInputChange2 = (e) => {
    
    setFile2(e.target.files[0]);
    setFileNametwo(e.target.files[0].name);
};

  

  const imageInputChange = (e) => {
    
    setFile1(e.target.files[0]);
    setFileNameone(e.target.files[0].name);

  };

const getdocuments = () => {
    Axios.get("https://apnaorganicstore.in/empapp/document").then((response) => {
       setdoc(response.data);
       console.log("response.data"+(response.data.documents))
    });
  };
  useEffect(() => {
    getdocuments();
  },[]);
  // const uploaddocs = async (e) => {
  //   const formData = new FormData();
  //   formData.append("file", file1);
  //   // formData.append("file2", file2);
  //   // formData.append("file3", file3);
  //   // formData.append("file4", file4);
  //   // formData.append("file5", file5);
  //   // formData.append("file6", file6);
  //   formData.append("fileName", fileNameone);
    
  //   // formData.append("fileName2", fileNametwo);
  //   // formData.append("fileName3", fileNamethree);
  //   // formData.append("fileName4", fileNamefour);
  //   // formData.append("fileName5", fileNamefive);
  //   // formData.append("fileName6", fileNamesix);
  //   // console.log("fileName///////"+fileName)
  //   console.log("formdata - ----> "+JSON.stringify(formData))
  // Axios.post("https://apnaorganicstore.in/empapp/documentupload",formData, {
  //   staff_id:idd,
    
  //    }).then((response) => {
    
  //   console.log("------" +JSON.stringify( response))
  //   // navigate("/IncrementLog");
    
  // });

  // }

  const uploaddoc = async (e) => {
    const formData = new FormData();
    
    formData.append("file2", file2);
    formData.append("fileName2", fileNametwo);
// console.log("file1---1----> "+file1)
// console.log("file2---2----> "+file2)
    // console.log("fileName///////"+fileName)
    console.log("formdata - ----> "+JSON.stringify(formData))
  Axios.post("https://apnaorganicstore.in/empapp/documentupload",formData, {
    staff_id:idd,
    
     }).then((response) => {
    
    console.log("------" +JSON.stringify( response))
    // navigate("/IncrementLog");
    
  });

  }




  var docu;
(doc || []).map((docdata) => {
  // console.log("d----------"+JSON.stringify(docdata.documents))
    docu=(docdata.documents).split(',')
    // console.log("d5615----------"+docu)

})
    // var docu=(doc.documents).split(',')
    // console.log("d----------"+docu)
    return (
        <>
    
      <div class="col-md-12">
        <div class="form-group d-flex gap-4 ">
          <div className='image_input'>
         { (docu || []).map((dodata,i) => {
            console.log("dodata"+dodata)
          return(
            
           <input type='text' class="form-control label_text" onChange={imageInputChange} value={dodata} />
          
             )
          
            })}
              </div>
            <div class="">
            <form action="" method="POST" enctype="multipart/form-data">
            <div className='image_upload_box'>

            <input type='file' class="form-control label_text" onChange={imageInputChange}  name={"file"} />
            <button type="button" class="btn btn btn-send  pt-2 btn-block" onClick={uploaddoc}>Upload</button>
            </div>
            <div className='image_upload_box'>
             <input type='file' class="form-control label_text" onChange={imageInputChange2}  name={"file2"} />
            <button type="button" class="btn btn btn-send  pt-2 btn-block" onClick={uploaddoc}>Upload</button>
            </div>
            <div className='image_upload_box'>
           <input type='file' class="form-control label_text" onChange={imageInputChange2}  name={"file3"} />
            <button type="button" class="btn btn btn-send  pt-2 btn-block" onClick={uploaddoc}>Upload</button>
            </div>
            <div className='image_upload_box'>

            <input type='file' class="form-control label_text" onChange={imageInputChange}  name={"file4"} />
            <button type="button" class="btn btn btn-send  pt-2 btn-block" onClick={uploaddoc}>Upload</button>
            </div>
            <div className='image_upload_box'>

            <input type='file' class="form-control label_text" onChange={imageInputChange}  name={"file5"} />
            <button type="button" class="btn btn btn-send  pt-2 btn-block" onClick={uploaddoc}>Upload</button>
            </div>
            <div className='image_upload_box'>

            <input type='file' class="form-control label_text" onChange={imageInputChange}  name={"file6"} />
            <button type="button" class="btn btn btn-send  pt-2 btn-block" onClick={uploaddoc}>Upload</button> 
            </div>
           </form>
            </div>
        </div>
      </div>
    
    


      
   
    <div class="col-md-4 mt-3">

    {/* <button type="button" class="btn btn-primary btn-send  pt-2 btn-block" onClick={uploaddocs}>Upload</button> */}

    </div>
          
        </>
    );
}

export default Documentupload;