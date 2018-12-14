/*import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Combobox from 'react-widgets/lib/Combobox'
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'

import 'react-widgets/dist/css/react-widgets.css'

momentLocaliser(moment)


const renderDropdownList = ({ input, data, valueField, textField }) =>
  <DropdownList {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange} />

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />

const renderSelectList = ({ input, data }) =>
  <SelectList {...input}
    onBlur={() => input.onBlur()}
    data={data} />

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />
  
 
const renderCombobox = ({ input, data, disables, defaultValue, placeholder }) =>

    <Combobox {...input}
      data={data}
      defaultValue={defaultValue}
      disabled={disables}
      placeholder = {placeholder}
      filter='contains'
    />
    
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)


export {
  renderDropdownList,
  renderMultiselect,
  renderSelectList,
  renderDateTimePicker,
  renderCombobox,
  renderField
  
}*/