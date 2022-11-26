import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { GoPrimitiveDot } from "react-icons/go";

const LeaveName = (props) => {
    return (
        <div className='LeaveFullForm_section'>
            <GoPrimitiveDot className={props.className}/>
            <h5 className={'LEaveheading'}>{props.heading}</h5>
            <h5 className={'LEaveFullName'}>{props.FullName}</h5>
        </div>
    );
}

export default LeaveName;
