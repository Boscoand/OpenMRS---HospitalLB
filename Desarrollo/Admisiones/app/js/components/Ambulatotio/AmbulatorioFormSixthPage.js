import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Button, Col } from 'react-bootstrap';
import { renderDropdownList, renderSelectList } from '../Widgets';
import { Row } from 'react-flexbox-grid';
import '../../styles/button.css'

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const AmbulatorioFormSixthPage = props => {
  
  const { handleSubmit, previousPage,PacienteNombre } = props;
  const styles = {      
    marginTitulo2: {
      marginTop: 25, 
      borderBottom: "1px solid silver"
    },
    marginTitulo3: {
      marginTop: 30,
      textDecoration: "underline silver"
    },
    button: {
      width: '100%',
      marginTop: "3px"
    },
    marginLeft20: {
      marginLeft: 20
    }
  }
   
  return ( 
  
    <div>
     
      <h3 style={ styles.marginTitulo2 }><b>Cobertura de Seguro</b></h3> 

      {/* Datos del paciente */}
      <h5 style={ styles.marginTitulo3 }>Datos del Paciente:</h5>
      
      <div style={ styles.marginLeft20 }>
        <Row>
          <h5>
            <Col md={3}><b>Nombre:</b></Col>
            <Col md={6}>{props.PacienteNombre+" "}</Col>
          </h5>
        </Row>
      
        <Row>
          <h5>
            <Col md={3}><b>Cédula:</b></Col>
            <Col md={6}>{props.pacienteCI}</Col>
          </h5>
        </Row>
      </div>

      <h3 style={ styles.marginTitulo2 }><b>Datos del Titular</b></h3>
      
      <div style={ styles.marginLeft20 }>
        <Row>
          <h5>
            <Col md={3}><b>Nombre:</b></Col>
            <Col md={6}>{props.TitularNombre+" "}</Col>
          </h5>
        </Row>

        <Row>
          <h5>
            <Col md={3}><b>Cédula:</b></Col>
            <Col md={6}>{props.titularCI}</Col>
          </h5>
        </Row>
      </div>
      
      {/* Cobertura de seguro */}
      <h5 style={ styles.marginTitulo3 }>Seleccione la cobertura del seguro aplicable para el ambulatorio</h5>  

      <div>
        <form onSubmit={handleSubmit}>
          {/* Tipo seguro */}
          <div style={ styles.marginLeft20 }>
            <Row>
              <Col md={6}>
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
          
            {/* Mas coberturas */}
            <Row>
              <Col md={6}>
                <Field
                  name="selmascoberturas"
                  component={renderSelectList}
                  data={['Más Coberturas']}
                />
              </Col>
            </Row>
            
            {/* Más coberturas */}
            <Row>
              <Col md={6}>
                <Field
                  name="mascoberturas"
                  component={renderSelectList}
                  data={['Prepaga','ISSFA','ISPOL']}
                />
              </Col>
            </Row>
          </div>

          {/* Cuentas por cobrar */}
          <h3 style={ styles.marginTitulo2 }><b>Cuenta por Cobrar</b></h3>   
          <h5 style={ styles.marginTitulo3 }>Selecciones para la cuenta por cobrar</h5>              
          <div style={ styles.marginLeft20 }>
            
            {/* Codigo */}
            <Row>
              <h5>
                <Col md={3}><b>Código:</b></Col>
                <Col md={6}>{props.pacienteCI}</Col>
              </h5>
            </Row>

            {/* Nombre */}
            <Row>
              <h5>
                <Col md={3}><b>Nombre:</b></Col>
                <Col md={6}>{props.PacienteNombre+" "}</Col>
              </h5>
            </Row>
            
            {/* Tercerizadora */}
            <Row>
              <Col md={6}>
                <h5>
                  <Field
                    name="tercerizadora"
                    component={renderDropdownList}
                    data={[ {tercerizadora: 'IESS', value: 'iess'},{tercerizadora: 'Tercerizadora HLB',value:'tercerizadora_HLB'},{tercerizadora: 'ISPOL',value:'ispol'}]}
                    valueField="value"
                    textField="tercerizadora"
                    placeholder="Seleccione tipo de seguro"
                    label="Tercerizadora:"
                  />
                </h5>
              </Col>
            </Row>
          </div>

          {/* Guardar */}
          <hr></hr>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Button bsStyle="success" style={ styles.button } type="submit" className="button">GUARDAR</Button>                            
            </Col>
          </Row>

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
