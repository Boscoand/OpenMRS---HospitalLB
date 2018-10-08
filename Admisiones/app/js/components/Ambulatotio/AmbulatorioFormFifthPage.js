import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {renderDropdownList,renderField,renderDateTimePicker, renderCombobox, renderSelectList} from '../Widgets';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const AmbulatorioFormFifthPage = props => {
     const { handleSubmit, previousPage } = props;
  return (
    <div>
     
    <div>
    <h2>Información Titular/Afiliado</h2>
    <h4>Datos preliminares del titular</h4>
    <p>
      Nombres:{props.TitularNombre+" "} 
      Cédula:  {props.titularCI} 
    </p>
      <h3>Verifique y complete datos</h3>
      <h4>Establecer relación de parentesco entre el paciente y el titular o afiliado</h4>
    </div>
  <div>
    <form onSubmit={handleSubmit}>
    <div id="RelacionParentesco" className="seccion">
      <Row>
      <Col xs ={6} md={3}>
      <Field name="parentesco" 
            component={renderDropdownList}
            label="Parentesco"
            data={[ { parentesco: 'Hijo/a', value: 'Hijo' },{ parentesco: 'Nieto/a', value: 'Nieto' },{ parentesco: 'Padre/Madre', value: 'Padre' },{ parentesco: 'Tío/a', value: 'Tío' },{ parentesco: 'Otro', value: 'otro' } ]}
            valueField="value"
            textField="parentesco"
            placeholder="Seleccione parentesco con el paciente"
      />
      </Col>
      <Col xs ={5} md={2}>
      <Field
        name="observaciones"
        type="textarea"
        component={renderField}
        label="Observaciones"
        placeholder="Ingrese observaciones"
      />
      </Col>
      </Row>
      </div>
            <hr></hr>
      <div>
        <h2>Segundo Progenitor</h2>
        <h3>Ingrese la información del segundo progenitor</h3>
      </div>
        <div id="OtraInfo" className="seccion">
      <Row>
      <Col xs ={6} md={3}>
      <Field
        name="cedulaSegProg"
        type="text"
        component={renderField}
        label="Cédula: "
        placeholder="Ingrese cédula del segundo progenitor"
      />
      </Col>
      </Row>
      </div>
      <div>
        <button type="submit" className="next">
          Guardar
        </button>
      </div>
    </form>
    
    </div>
</div>
 );
};
export default reduxForm({
  form: 'ambulatorio4', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  initialValues:{
  "parentesco": {
    "parentesco": "Hijo/a",
    "value": "Hijo"
  }
  }
})(AmbulatorioFormFifthPage);