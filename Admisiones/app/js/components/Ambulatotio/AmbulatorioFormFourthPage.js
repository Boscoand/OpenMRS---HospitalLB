import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {renderDropdownList,renderField,renderDateTimePicker, renderCombobox} from '../Widgets';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const AmbulatorioFormFourthPage = props => {
    const { handleSubmit, previousPage, guardado } = props;
  return (
    <div>
     
    <div>
    <h2>Otra Información</h2>
   <h4>Datos del Paciente</h4>
    <p>
      Nombre:{props.PacienteNombre+" "}
      Cédula:{props.pacienteCI}
      
    </p>
     <h4>Datos del Titular</h4>
    <p>
      Nombre: {props.TitularNombre+" "} 
      Cédula: {props.titularCI} 
      
    </p>
      <h3>Verifique y complete datos</h3>
    </div>
  <div>
    <form onSubmit={handleSubmit}>
    <div id="OtraInfo" className="seccion">
       
      <Row>
      <Col xs ={6} md={3}>
      <Field
        name="padre"
        type="text"
        component={renderField}
        label="Padre: "
        placeholder="Halar del RC"
      />
      </Col>
      </Row>
      <Row>
      <Col xs ={6} md={3}>
      <Field
        name="madre"
        type="text"
        component={renderField}
        label="Madre: "
        placeholder="Halar del RC"
      />
      </Col>
      </Row>
       <Row>
       <Col xs ={6} md={3}>
      <Field
        name="conyuge"
        type="text"
        component={renderField}
        label="Cónyuge: "
        placeholder="Halar del RC"
      />
      </Col>
      </Row>
      </div>
      <div>
        <button type="submit" className="next">
          Guardar
        </button>
      </div>
      {guardado && (
      <div style={{"color":"green",fontWeight: "bold"}}> LOS DATOS FUERON GUARDADOS EXITOSAMENTE</div>
      )} 
    </form>
    
    </div>
</div>
 );
};
export default reduxForm({
  form: 'ambulatorio3', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  initialValues:{
  "Nacionalidad": {
    "nacionalidad": "Ecuatoriana",
    "value": "ecuatoriana"
  },
  "Cultura_Étnica": {
    "Cultura_Étnica": "Mestizo/a",
    "value": "mestizo"
  },
  "Provincia": {
    "provincia": "Guayas",
    "value": "guayas"
  },
  "Ciudad": {
    "ciudad": "Guayaquil",
    "value": "guayaquil"
  }
  }
})(AmbulatorioFormFourthPage);

