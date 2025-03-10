import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmbulatorioFormFirstPage from './AmbulatorioFormFirstPage';
import AmbulatorioFormSecondPage from './AmbulatorioFormSecondPage';
import AmbulatorioFormThirdPage from './AmbulatorioFormThirdPage';
import AmbulatorioFormFourthPage from './AmbulatorioFormFourthPage';
import AmbulatorioFormFifthPage from './AmbulatorioFormFifthPage';
import AmbulatorioFormSixthPage from './AmbulatorioFormSixthPage';
import OpenMRSView from '../openmrsView';
import VentanaForm from './VentanaForm';
import { Nav, NavItem, Tab, Row, Col, Form, FormControl, FormGroup, Button } from "react-bootstrap"
import "./AmbulatorioFormStyle.css"
import '../../styles/button.css'

class AmbulatorioForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.page1 = this.page1.bind(this);
    this.page2 = this.page2.bind(this);
    this.page3 = this.page3.bind(this);
    this.page4 = this.page4.bind(this);
    this.page5 = this.page5.bind(this);
    this.page6 = this.page6.bind(this);
    this.page7 = this.page7.bind(this);
    this.page8 = this.page8.bind(this);
    this.handleChangeTitularID = this.handleChangeTitularID.bind(this);
    this.searchTitular = this.searchTitular.bind(this);
    this.handleTitularSubmit = this.handleTitularSubmit.bind(this);
    this.handleNamesSubmit = this.handleNamesSubmit.bind(this);
    this.handlePacienteSubmit = this.handlePacienteSubmit.bind(this);
    this.state = {
      page: 1,
      titular:{},
      titularId:"",
      paciente:{},
      enlace: `http://localhost:8080/openmrs/coreapps/datamanagement/mergePatients.page?app=coreapps.mergePatients`
    };
  }
  
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  
  page1() {
    this.setState({ page: 1 });
  }
  
  page2() {
    this.setState({ page: 2 });
  }
  
  page3() {
    this.setState({ page: 3 });
  }
  
  page4() {
    this.setState({ page: 4 });
  }
  
  page5() {
    this.setState({ page: 5 });
  }
  
  page6() {
    this.setState({ page: 6 });
  }
  
  page7() {
    this.setState({ page: 7 });
  }
  
  page8() {
    this.setState({ page: 8 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  
  handleChangeTitularID(ev){
    this.setState({titularId:ev.target.value});
  }

  searchTitular(){
    // console.log(changeFieldValue);
    
  }
  
  handleTitularSubmit(values){
    // console.log(values);
    let person = {
      "cedula" : values.Cedula,
      "celular" : values.Celular,
      "ciudad" : values.Ciudad.value,
      "etnia" : (values["Cultura_Étnica"])?values["Cultura_Étnica"]["value"]:undefined,
      "direccion" : values["Direccion"],
      "estado_civil" : (values["Estado_Civil"])?values["Estado_Civil"]["estado"]:undefined,
      "nacimiento" : values.Fecha_Nacimiento,
      "genero" : (values.Genero)?values.Genero.value:undefined,
      "ltrabajo" : values.Lug_Trabajo,
      "lnacimiento" : values.Lugar_Nacimiento,
      "nacionalidad" : (values.Nacionalidad)?values.Nacionalidad.value:undefined,
      "ocupacion"  : values.Ocupacion,
      "otroTelf" : values.Otro_telf,
      "parroquia" : (values.Parroquia)?values.Parroquia.value:undefined,
      "familyName" : values.Primer_Apellido,
      "familyName2" : values.Segundo_Apellido,
      "name" : values.Primer_Nombre,
      "surname" : values.Segundo_Nombre,
      "telefono" : values.Telefono,
      "provincia" : (values.Provincia)?(values.Provincia.value):undefined
    };
    // console.log(person);
    let namesComplete = person.name+" "+person.surname+" "+person.familyName+" "+person.familyName2;
    this.props.handleNombresCompletos(namesComplete,"TITULAR");
    this.props.handleActualizarPersona(person,"TITULAR");
  }

  handleNamesSubmit(values){
    let names = {
        "conyuge" : values.conyuge,
        "padre" : values.padre,
        "madre" : values.madre
    };
    this.props.handleRelativeNames(names);
  }

  handlePacienteSubmit(values){
    // console.log(values);
    let person = {
      "cedula" : values.Cedula,
      "celular" : values.Celular,
      "ciudad" : values.Ciudad.value,
      "etnia" : (values["Cultura_Étnica"])?values["Cultura_Étnica"]["value"]:undefined,
      "direccion" : values["Direccion"],
      "estado_civil" : (values["Estado_Civil"])?values["Estado_Civil"]["estado"]:undefined,
      "nacimiento" : values.Fecha_Nacimiento,
      "genero" : (values.Genero)?values.Genero.value:undefined,
      "ltrabajo" : values.Lug_Trabajo,
      "lnacimiento" : values.Lugar_Nacimiento,
      "nacionalidad" : (values.Nacionalidad)?values.Nacionalidad.value:undefined,
      "ocupacion"  : values.Ocupacion,
      "otroTelf" : values.Otro_telf,
      "parroquia" : (values.Parroquia)?values.Parroquia.value:undefined,
      "familyName" : values.Primer_Apellido,
      "familyName2" : values.Segundo_Apellido,
      "name" : values.Primer_Nombre,
      "surname" : values.Segundo_Nombre,
      "telefono" : values.Telefono,
      "provincia" : (values.Provincia)?(values.Provincia.value):undefined
    };
    
    let namesComplete = person.name+" "+person.surname+" "+person.familyName+" "+person.familyName2;
    this.props.handleNombresCompletos(namesComplete,"PACIENTE");
    this.props.handleActualizarPersona(person,"PACIENTE");
  }

  render() {
    const { onSubmit } = this.props;
    const { page, enlace} = this.state;
    const styles = {      
			navBar: {
        display: "inline-block",
        width: "100%",
        marginTop: "15px"
      }, 
      borderBottom: {
        borderBottom: "1px solid silver"
      },
      containerItem: {
        margin: "10px"
      },
      containerNavLeft: {
        borderRight: "1px solid silver",
      },
      textFormat: {
        color: "#777"
      },
      button: {
        width: '100%'
      }, 
      inputSecondPage: {
        zIndex: 1
      },
      marginTitulo2: {
        marginTop: 25,
          marginBottom: 25,
          borderBottom: "1px solid silver"
      },
      button: {
        width: '100%',
        marginTop: "3px"
      }, 
      marginLeft20: {
        marginLeft: 20
      },
      marginTitulo3: {
        marginTop: 30,
        textDecoration: "underline silver"
      },
      marginTitulo4: {
        marginTop: 10,
        marginBottom: 10
      },
    };
    
    return (
      
      <div>
        
        <Tab.Container className="selectedItem" style={ styles.navBar } id="tab-left" defaultActiveKey="1">
          <Row>
            <Col sm={3} style={ styles.containerNavLeft }>
              <Nav style={ styles.navBar } bsStyle="pills" stacked>
                <NavItem eventKey="1" onClick={this.page1} style={ styles.borderBottom }><b style={ styles.textFormat }>Datos Preliminares</b></NavItem>
                <NavItem eventKey="2" onClick={this.page2} style={ styles.borderBottom }><b style={ styles.textFormat }>Titular</b></NavItem>
                <NavItem eventKey="3" onClick={this.page3} style={ styles.borderBottom }><b style={ styles.textFormat }>Paciente</b></NavItem>
                <NavItem eventKey="4" onClick={this.page4} style={ styles.borderBottom }><b style={ styles.textFormat }>Otra Información</b></NavItem>
                <NavItem eventKey="5" onClick={this.page5} style={ styles.borderBottom }><b style={ styles.textFormat }>Titular y 2° Progenitor</b></NavItem>
                <NavItem eventKey="6" onClick={this.page6} style={ styles.borderBottom }><b style={ styles.textFormat }>Seguro y Cta. x Cobrar</b></NavItem>
                <NavItem eventKey="7" onClick={this.page7} style={ styles.borderBottom }><b style={ styles.textFormat }>Ventana de Asistencia</b></NavItem>
                <NavItem eventKey="8" onClick={this.page8} style={ styles.borderBottom }><b style={ styles.textFormat }>Finalizar proceso</b></NavItem>
              </Nav>
            </Col>
            <Col sm={9} style={ styles.containerRigth }>
              <Tab.Content animation>
                <Tab.Pane eventKey="1" style={ styles.containerItem}>
                  {page === 1 && (
                    <div>
                      <Col md={12}>
                        <AmbulatorioFormFirstPage patientService={this.props.patientService} pacientePerson={this.props.pacientePerson} onSubmit={this.nextPage} />
                      </Col>
                    </div>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="2" style={ styles.containerItem}>
                  {page === 2 && (
                    <div>
                      <Col md={12}>
                        <Form>
                          <FormGroup>
                              <Col md={3}></Col>
                              <Col md={4}>
                                  {/* <FormControl type="text" value={this.props.titularId} onChange={this.props.changeTitularID}/> */}
                                  <FormControl type="text"/>
                              </Col>                             
                              <Col md={2}>
                                  <Button bsStyle="success" className="button" style={ styles.button } onClick={this.props.handleTitularID}>BUSCAR</Button>                            
                              </Col>
                          </FormGroup>
                        </Form>
                      </Col>

                      <Col md={12}>
                        <AmbulatorioFormSecondPage
                          previousPage = {this.previousPage}
                          onSubmit = {this.handleTitularSubmit}
                          patientService={this.props.patientService} pacientePerson={this.props.pacientePerson}
                          guardado = {this.props.titularGuardado}
                          errorT = {this.props.titularError}
                          errores = {this.props.titularErrores}
                        />
                      </Col>
                    </div>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="3" style={ styles.containerItem }>
                  {page === 3 && (
                    <div>
                      <Col md={12}>
                        <Form>
                          <FormGroup>
                              <Col md={3}></Col>
                              <Col md={4}>
                                  <FormControl type="text" value={this.props.pacienteId} onChange={this.props.changepacienteId}/>
                                  <FormControl.Feedback/>
                              </Col>                             
                              <Col md={2}>
                                  <Button bsStyle="success" className="button" style={ styles.button } onClick={this.props.handlepacienteId}>BUSCAR</Button>                            
                              </Col>
                          </FormGroup>
                        </Form>
                      </Col>

                      <Col md={12}>
                        <AmbulatorioFormThirdPage
                          previousPage={this.previousPage}
                          onSubmit={this.handlePacienteSubmit}
                          guardado = {this.props.pacienteGuardado}
                          patientService={this.props.patientService} pacientePerson={this.props.pacientePerson}
                          errorT = {this.props.pacienteError}
                          errores = {this.props.PacienteErrores}
                        />
                      </Col>

                    </div>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="4" style={ styles.containerItem}>
                  {page === 4 && (
                    <AmbulatorioFormFourthPage
                      previousPage={this.previousPage}
                      onSubmit={this.handleNamesSubmit}
                      PacienteNombre = {this.props.PacienteNombre}
                      pacienteCI = {this.props.pacienteCI}
                      TitularNombre = {this.props.TitularNombre}
                      titularCI = {this.props.titularCI}
                      guardado = {this.props.nombresGuardado}
                    />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="5" style={ styles.containerItem}>
                  {page === 5 && (
                    <div>
                      <AmbulatorioFormFifthPage
                        previousPage={this.previousPage}
                        onSubmit={onSubmit}
                        PacienteNombre = {this.props.PacienteNombre}
                        pacienteCI = {this.props.pacienteCI}
                        TitularNombre = {this.props.TitularNombre}
                        titularCI = {this.props.titularCI}
                      />
                      </div>
                    )}
                </Tab.Pane>
                <Tab.Pane eventKey="6" style={ styles.containerItem}>
                  {page === 6 && (
                    <AmbulatorioFormSixthPage
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                      PacienteNombre = {this.props.PacienteNombre}
                      pacienteCI = {this.props.pacienteCI}
                      TitularNombre = {this.props.TitularNombre}
                      titularCI = {this.props.titularCI}
                    />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="7" style={ styles.containerItem}>
                  {page === 7 && (
                    <VentanaForm
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                      PacienteNombre = {this.props.PacienteNombre}
                      pacienteCI = {this.props.pacienteCI}
                      TitularNombre = {this.props.TitularNombre}
                      titularCI = {this.props.titularCI}
                    />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="8" style={ styles.containerItem}>
                {page === 8 && (
                  <div>
                    <h3 style={ styles.marginTitulo2 }><b>Nuevos identificadores del Paciente:</b></h3>
                    <h5 style={ styles.marginTitulo3 }>Por favor, siga los siguientes pasos: </h5>
                    
                    <div style={ styles.marginLeft20 }>
                      <h5 style={ styles.marginTitulo4 }><b>1.-</b> Copie los siguientes códigos uno a uno en los recuadros *Patient ID* ubicados en la ventana inferior: </h5>
                      <ul>
                            <li>{this.props.pacienteCI}</li>
                            <li>{this.props.patientService}</li>
                      </ul>
                      <h5 style={ styles.marginTitulo4 }><b>2.-</b> Luego, presione el botón verde "Continue".</h5>
                      <h5 style={ styles.marginTitulo4 }><b>3.-</b> Seleccione el rectángulo de datos del paciente de la izquierda y clic en Yes, continue.</h5>
                    </div>  
                    <h5 style={ styles.marginTitulo3 }><b>IMPORTANTE:</b> Los recuadros de Patient ID no pueden tener el mismo código</h5>
                    
                    <hr></hr>

                    <OpenMRSView url={enlace} esilos={this.estilos}/>

                    <hr></hr>

                    <Row>
                      <Col md={3}></Col>
                      <Col md={6}>
                        <h5 style={ styles.marginTitulo4 }>Dé clic cuando ya haya hecho los pasos anteriores</h5>
                        <Button bsStyle="success" style={ styles.button } type="submit" className="button" onClick={this.handleClickContinuar}>GUARDAR</Button>                            
                      </Col>
                    </Row>
                  </div>
                )}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
         
      </div>
    );
  }
}

AmbulatorioForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AmbulatorioForm;