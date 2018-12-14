import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Row, Col, Button } from 'react-bootstrap';
import {renderDropdownList, renderField2, renderSelectList } from '../Widgets';
import '../../styles/button.css'

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const VentanaForm = props => {
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
    
      <h3 style={ styles.marginTitulo2 }><b>Ventana de Asistencia</b></h3> 
      
      {/* Datos del paciente */}
      <h5 style={ styles.marginTitulo3 }>Datos del Paciente:</h5>
      <h5>
        <Col md={3}><b>Nombre:</b></Col>
        <Col md={6}>{props.PacienteNombre+" "}</Col>
      </h5>
      <br></br>
      <h5>
        <Col md={3}><b>Cédula:</b></Col>
        <Col md={6}>{props.pacienteCI}</Col>
      </h5>
      <br></br>

      {/* Datos del titular */}
      <h5 style={ styles.marginTitulo3 }>Datos del Titular</h5>
      <h5>
        <Col md={3}><b>Nombre:</b></Col>
        <Col md={6}>{props.TitularNombre+" "} </Col>
      </h5>
      <br></br>
      <h5>
        <Col md={3}><b>Cédula:</b></Col>
        <Col md={6}>{props.titularCI}</Col>
      </h5>
      <br></br>

      <h3 style={ styles.marginTitulo2 }><b>Información General de Ingreso</b></h3> 
      
      <form onSubmit={handleSubmit}>
        
        <div style={ styles.marginLeft20 }>  
          {/* Responsable */}
          <Row>
            <Col md={6}>
              <Field
                name="responsable"
                type="text"
                width="90%"
                component={renderField2}
                label="En caso necesario llamar a: "
                placeholder="Nombre de responsable"
              />
            </Col>

            {/* Afinidad */}
            <Col md={6}>
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
            {/* Direccion responsable   */}
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
            {/* Telefono responsable */}
            <Col md={6}>
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
            <Col md={6}>
              <Field name="parentescofirmante" 
                component={renderDropdownList}
                label="Parentesco de acompañante: "
                data={[ { parentescofirmante: 'Padre', value: 'padre' },{ parentescofirmante: 'Madre', value: 'madre' },{ parentescofirmante: 'Tío', value: 'tío' },{ parentescofirmante: 'Tía', value: 'tía' },{ parentescofirmante: 'Otro', value: 'otro' } ]}
                valueField="value"
                textField="parentescofirmante"
                placeholder="Seleccione parentesco del firmante con el paciente"
              />
            </Col>

            <Col md={6}>
              <Field
                name="cedulafirmante"
                type="text  "
                width="90%"
                component={renderField2}
                label="Cédula Firmante: "
                placeholder="Ingrese cédula"
              />
            </Col>

            <Col md={6}>
              <Field
                name="nombrefirmante"
                type="text"
                width="90%"
                component={renderField2}
                label="Nombres del Firmante: "
                placeholder="Ingrese nombres"
              />
            </Col>


            <Col md={6}>
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

          <Row>
            {/* <Col md={3}>Doctor Responsable:</Col> */}
            <Col md={6} style={{ marginTop: 26}}>
              <Field
                name="firmante"
                component={renderSelectList}
                data={[ 'Paciente Firmante','Paciente NO Firmante','Acompañante']}
              />
            </Col>
          </Row>

        </div>

        <hr></hr>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Button bsStyle="success" style={ styles.button } type="submit" className="button">GUARDAR</Button>                            
          </Col>
        </Row>
        

      </form>
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
