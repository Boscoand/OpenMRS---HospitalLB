import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {renderDropdownList,renderField,renderDateTimePicker,renderSelectList, renderCombobox} from '../Widgets';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const AmbulatorioFormSixthPage = props => {
    const { handleSubmit, previousPage,PacienteNombre } = props;
  return ( <div>
     
    <div>
    <h2>Cobertura de Seguro</h2>
    <h4>Datos del Paciente</h4>
    <p>
      Nombre: {props.PacienteNombre+" "}
      Cédula: {props.pacienteCI} 
      
    </p>
     <h4>Datos del Titular</h4>
    <p>
      Nombre: {props.TitularNombre+" "} 
      Cédula:{props.titularCI} 
      
    </p>
      <h3>Seleccione la cobertura del seguro aplicable para el ambulatorio</h3>
    </div>
  <div>
    <form onSubmit={handleSubmit}>
    <div id="DatosPersonales" className="seccion">
      <Row>
      <Col xs ={6} md={3}>
      <Field name="tiposeguro" 
            component={renderDropdownList}
            label="Tipo de Seguro"
            data={[ { tiposeguro: 'IESS', value: 'iess' },{ tiposeguro: 'ISSFA', value: 'issfa' },{ tiposeguro: 'ISPOL', value: 'ispol' },{ tiposeguro: 'SPPAT', value: 'sppat' } ,{ tiposeguro: 'FONSAT', value: 'fonsat' }]}
            valueField="value"
            textField="tiposeguro"
            placeholder="Seleccione tipo de seguro"
      />
      </Col>
      </Row>
      <Row>
      <Col xs ={5} md={2}>
      <Field
          name="selmascoberturas"
          component={renderSelectList}
          data={[ 'Más Coberturas']}/>
      </Col>
      </Row>
       <Row>
       <Col xs ={6} md={3}>
      <Field
          name="mascoberturas"
          component={renderSelectList}
          data={[ 'Prepaga','ISSFA','ISPOL']}/>
      </Col>
      </Row>
      
      </div>
      <hr></hr>
      <div>
      <h2>Cuenta por Cobrar</h2>
      </div>
      <div>
        <h3>Selecciones para la cuenta por cobrar</h3>
        <Row>
           <Col xs ={6} md={3}>
      <p>
      Código: {props.pacienteCI} 
      </p>
      </Col>
      <Col xs ={6} md={3}>
      <p>
      Nombre: {props.PacienteNombre+" "}
      </p>
      </Col>
      <Col xs ={6} md={3}>
      <Field
        label="Tercerizadora"
          name="tercerizadora"
          component={renderDropdownList}
          data={[ {tercerizadora: 'IESS', value: 'iess'},{tercerizadora: 'Tercerizadora HLB',value:'tercerizadora_HLB'},{tercerizadora: 'ISPOL',value:'ispol'}]}
           valueField="value"
            textField="tercerizadora"
            placeholder="Seleccione tipo de seguro"/>
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
  form: 'ambulatorio5', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  initialValues:{
  "tiposeguro": {
    "tiposeguro": "IESS",
    "value": "iess"
  }
  }
 
}
    )(AmbulatorioFormSixthPage);
