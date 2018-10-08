import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {renderDropdownList,renderField,renderField2,renderDateTimePicker,renderSelectList, renderCombobox} from '../Widgets';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const VentanaForm = props => {
    const { handleSubmit, previousPage } = props;
  return ( <div>
     
    <div>
    <h2>Ventana de Asistencia</h2>
    <h4>Datos del Paciente</h4>
    <p>
      Nombre: {props.PacienteNombre}
      Cédula: {props.pacienteCI}
    </p>
     <h4>Datos del Titular</h4>
    <p>
      Nombre: {props.TitularNombre}
      Cédula: {props.titularCI}
    </p>
      <h3>Información General de Ingreso</h3>
    </div>
  <div>
    <form onSubmit={handleSubmit}>
    <div id="ventanaasistencia" className="seccion">
      
      <Row>
        <Col xs ={12} md={6}>
         <Field
        name="responsable"
        type="text"
        width="90%"
        component={renderField2}
        label="En caso necesario llamar a: "
        placeholder="Nombre de responsable"
      />
      </Col>
      <Col xs ={6} md={3}>
         <Field
        name="afinidad_parentesco"
        type="text"
        width="90%"
        component={renderField2}
        label="Afinidad con el paciente: "
        placeholder="Afinidad o parentesco"
      />
      </Col>
      </Row>
      <Row>
        <Col xs ={12} md={6}>
         <Field
        name="direccionresponsable"
        type="text"
        width="90%"
        component={renderField2}
        label="Dirección: "
        placeholder="Dirección del responsable"
      />
      </Col>
      <Col xs ={6} md={3}>
         <Field
        name="telefono"
        type="text"
        width="90%"
        component={renderField2}
        label="Teléfono: "
        placeholder="Teléfono del responsable"
      />
      </Col>
      </Row>
      
      <Row>
       <Col xs ={5} md={2}>
      <Field
          name="firmante"
          component={renderSelectList}
          data={[ 'Paciente Firmante','Paciente NO Firmante','Acompañante']}/>
      </Col>
      <Col xs ={5} md={2}>
      <Field name="parentescofirmante" 
            component={renderDropdownList}
            label="Parentesco de acompañante: "
            data={[ { parentescofirmante: 'Padre', value: 'padre' },{ parentescofirmante: 'Madre', value: 'madre' },{ parentescofirmante: 'Tío', value: 'tío' },{ parentescofirmante: 'Tía', value: 'tía' },{ parentescofirmante: 'Otro', value: 'otro' } ]}
            valueField="value"
            textField="parentescofirmante"
            placeholder="Seleccione parentesco del firmante con el paciente"
      />
      </Col>
      <Col xs ={4} md={2}>
         <Field
        name="cedulafirmante"
        type="text  "
        width="90%"
        component={renderField2}
        label="Cédula Firmante: "
        placeholder="Ingrese cédula"
      />
      </Col>
      <Col xs ={4} md={2}>
         <Field
        name="nombrefirmante"
        type="text"
        width="90%"
        component={renderField2}
        label="Nombres del Firmante: "
        placeholder="Ingrese nombres"
      />
      </Col>
      </Row>
      <Row>
        <Col xs ={6} md={3}>
         Doctor Responsable:
      </Col>
      <Col xs ={6} md={3}>
         <Field
        name="observaciones"
        type="text"
        width="90%"
        component={renderField2}
        label="Observaciones: "
        placeholder="Ingrese observaciones"
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
  form: 'ventanaasistencia', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  }
    )(VentanaForm);
