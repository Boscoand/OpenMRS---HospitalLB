import React from 'react'
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/SelectList';
import Multiselect from 'react-widgets/lib/Multiselect';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Combobox from 'react-widgets/lib/Combobox';
import moment from 'moment';
import momentLocaliser from 'react-widgets-moment';

import 'react-widgets/dist/css/react-widgets.css';

momentLocaliser(moment);


const renderDropdownList = ({ input, data, valueField, textField, label, placeholder, defaultValue }) =>(
  <div>
  <label>{label}</label>
  <DropdownList {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    placeholder={placeholder}
    defaultValue={defaultValue}
    onChange={input.onChange} />
    </div>);

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />;

const renderSelectList = ({ input, data }) =>
  <SelectList {...input}
    onBlur={() => input.onBlur()}
    data={data} />;

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />;
  
 
const renderCombobox = ({ input, data, disables, defaultValue, placeholder, label }) =>
    
    <Combobox {...input}
      data={data}
      defaultValue={defaultValue}
      disabled={disables}
      placeholder = {placeholder}
      label={label}
      filter='contains'
    />;
    
const renderField = ({ input, label, type, placeholder, style, meta: { touched, error } }) => (
  <div>
    <label style={style}>{label}</label>
    <div>
      <input  {...input} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderField2 = ({ input, label, type,width, placeholder,value ,onKeyPress,meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} width={width} onKeyPress={(refName)=>{onKeyPress(refName)}} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


// export default ;
export {renderField,
        renderField2,
        renderDateTimePicker,
        renderCombobox,
        renderDropdownList,
        renderMultiselect,
        renderSelectList};
// export {
//   // renderDropdownList,
//   // renderMultiselect,
//   // renderSelectList,
//   // renderDateTimePicker,
//   // renderCombobox,
//   renderField
  
// };