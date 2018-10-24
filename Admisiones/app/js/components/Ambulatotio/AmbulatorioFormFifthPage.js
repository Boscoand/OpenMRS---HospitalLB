import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Row, Col, Button } from 'react-bootstrap';
import {renderDropdownList,renderField } from '../Widgets';
import '../../styles/button.css'

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const AmbulatorioFormFifthPage = props => {
    
  const { handleSubmit, previousPage } = props;
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
      
      <h3 style={ styles.marginTitulo2 }><b>Información Titular/Afiliado</b></h3> 
      <h5 style={ styles.marginTitulo3 }>Datos preliminares del titular</h5>
      
      <div style={ styles.marginLeft20 }>
        <Row>
          <h5>
            <Col md={3}><b>Nombre:</b></Col>
            <Col md={6}>{props.TitularNombre+" "} </Col>
          </h5>
        </Row>
      
        <Row>
          <h5>
            <Col md={3}><b>Cédula:</b></Col>
            <Col md={6}>{props.titularCI}</Col>
          </h5>
        </Row>
      </div>  

      <h3 style={ styles.marginTitulo2 }><b>Verifique y complete datos</b></h3> 
      <h5 style={ styles.marginTitulo3 }>Establecer relación de parentesco entre el paciente y el titular o afiliado</h5>

      <div>
        <form onSubmit={handleSubmit}>

          {/* Parentesco */}
          <div style={ styles.marginLeft20 }>
            <Row>
              <Col md={6}>
                <Field name="parentesco" 
                      component={renderDropdownList}
                      label="Parentesco"
                      data={[ { parentesco: 'Hijo/a', value: 'Hijo' },{ parentesco: 'Nieto/a', value: 'Nieto' },{ parentesco: 'Padre/Madre', value: 'Padre' },{ parentesco: 'Tío/a', value: 'Tío' },{ parentesco: 'Otro', value: 'otro' } ]}
                      valueField="value"
                      textField="parentesco"
                      placeholder="Seleccione parentesco con el paciente"
                />
              </Col>
              <Col md={6}>
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

          {/* Segundo progenitor */}
          <h3 style={ styles.marginTitulo2 }><b>Segundo Progenitor</b></h3>
          <h5 style={ styles.marginTitulo3 }>Ingrese la información del segundo progenitor</h5>
          <div style={ styles.marginLeft20 }>
            <Row>
              <Col md={6}>
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

          {/* Guardar */}
          <hr></hr>
          <Col md={3}></Col>
          <Col md={6}>
            <Button bsStyle="success" style={ styles.button } type="submit" className="button">GUARDAR</Button>                            
          </Col>
          
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