/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { Col, Label, Button, Form, FormControl, HelpBlock, FormGroup, ControlLabel, Modal, Panel, ButtonToolbar, Table } from "react-bootstrap"
export default class Paciente extends React.Component {
  
  render() {
    const styles = {
      button: {
        width: '100%',
        marginTop: 28
      }, 
      marginSubtitulo: {
        marginTop: 60
      },
      sizeFields: {
        fontSize: '13px'
      }
    };
    return (
      <div>
          <h1><Label >Triaje en Enfermería</Label></h1>
          <h4 style={ styles.marginSubtitulo }>Ingreso de Datos Preliminares</h4>

            <Form>
              <Panel bsStyle="info">
                <Panel.Body>
                  <FormGroup controlId="variableID">
                    <Col md={6}>
                      <ControlLabel style={ styles.sizeFields }>Nombre: </ControlLabel>
                      {""}
                      <FormControl data-id="" type="text" value={this.props.valores.name} onChange={this.props.namehandler}/>
                      <FormControl.Feedback/>
                    </Col>                              

                    <Col md={6}>
                      <ControlLabel style={ styles.sizeFields }>Apellido: </ControlLabel>
                      {""}
                      <FormControl data-id="" type="text" value={this.props.valores.lastname} onChange={this.props.lastnamehandler}/>
                      <FormControl.Feedback/>
                    </Col>                  
                  </FormGroup>
                  
                  <FormGroup controlId="variableID">
                    <Col md={6}>
                      <ControlLabel style={ styles.sizeFields }>Años: </ControlLabel>
                      {""}
                      <FormControl data-id="" type="number" value={this.props.valores.yearsAge} onChange={this.props.yearhandler}/>
                      <FormControl.Feedback/>
                    </Col>                            
                    
                    <Col md={6}>
                      <ControlLabel style={ styles.sizeFields }>Meses:</ControlLabel>
                      <FormControl onChange={this.props.monthandler} componentClass="select" placeholder="select">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup controlId="formControlsSelect">
                    <Col md={6}>
                      <ControlLabel style={ styles.sizeFields }>Genero:</ControlLabel>
                      <FormControl onChange={this.props.genderhandler} componentClass="select" placeholder="select">
                        <option value="M">MASCULINO</option>
                        <option value="F">FEMENINO</option>
                      </FormControl>
                    </Col>

                    <Col md={6}>
                      <Button bsStyle="success" style={ styles.button } onClick={this.props.submit}>Guardar e Ingresar Vitales</Button>                            
                    </Col>

                  </FormGroup>      
                </Panel.Body>
              </Panel>
            </Form>       
          
        
      </div>
    )
  }
}
