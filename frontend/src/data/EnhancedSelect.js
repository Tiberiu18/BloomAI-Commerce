import React from 'react';
import Select from 'react-select';



const EnhancedSelect = ({myOptions, onChangeFunction, selectedOptions}) => {

  return (
  <Select
    defaultValue={[myOptions[0]]}
    isMulti={true}
    placeholder="Alegeți..."
    name="enhancedSelect"
    options={myOptions}
    className="basic-multi-select"
    classNamePrefix="select"
    value={selectedOptions}
    onChange={onChangeFunction}
    menuShouldScrollIntoView={false}
    menuShouldBlockScroll={false}
    menuPlacement='top'

    
  />
  
  )
};


export default EnhancedSelect;


