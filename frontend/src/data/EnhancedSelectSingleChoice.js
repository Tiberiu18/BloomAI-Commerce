import React from 'react';
import Select from 'react-select';



const EnhancedSelectSingleChoice = ({myOptions, onChangeFunction, selectedOptions}) => {
  

  return (
  <Select
    defaultValue={[myOptions[0]]}
    placeholder="Alegeți..."
    name="enhancedSelectSingleChoice"
    options={myOptions}
    className="basic-select"
    classNamePrefix="select"
    value={selectedOptions}
    onChange={onChangeFunction}
    menuShouldScrollIntoView={false}
    menuShouldBlockScroll={false}
  />
  )
};


export default EnhancedSelectSingleChoice;


