import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-flexbox-grid';
import apiCall from '../../utilities/apiHelper'
import validate from './validate';
import DatosPreliminares from '../DatosPreliminares';
import {renderField,renderDateTimePicker, renderCombobox} from '../Widgets';



const AmbulatorioFormFirstPage = props => {
  
  
  // console.log(getPatient(props.patientService));
  // console.log(props);
  const { handleSubmit, pacientePerson } = props;
  // console.log(pacientePerson);
  return (
    <div>
      <DatosPreliminares datos={pacientePerson}/>
      
    </div>
  );
};
// 

export default reduxForm({
  form: 'ambulatorio', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(AmbulatorioFormFirstPage);
