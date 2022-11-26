import React from 'react';
import styled from "styled-components";

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 31px;
  width: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchSection = (props) => {
  const labeltext =props.labeltext;
  const inputtype = props.inputtype;
  const onMonthChange = props.onMonthChange;
    return (
        <div className='search_section_box'>
             <h4 className='inputlabeltext'>{labeltext}</h4>
             <div className='search_section_box_input'>
              <input
                className="form-control form-control-dark w-50 search_input_type label_text"
                type={inputtype}
                placeholder="Search"
                aria-label="Search"
                onChange={onMonthChange}
              />
               <ClearButton onClick={props.onClear}>X</ClearButton>
               </div>
        </div>
    );
}

export default SearchSection;
