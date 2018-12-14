import React from 'react';
import { Col, Label, Button, Form, FormControl, FormGroup, ControlLabel, Panel } from "react-bootstrap"
import "../styles/button.css"

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
      },
      marginTitulo: {
        marginTop: 50
      },
      labelComplete: {
          width: "100%", 
          float: "left",
          marginBottom: 5
      },
    };
    return (
      <div>
        <Form horizontal>
          <FormGroup>
              <Col md={2}/>
              <Col md={8}>
                  <h1 style={ styles.marginTitulo }><Label style={ styles.labelComplete }>Triaje en Enfermería</Label></h1>
                  <h6 style={{color:"gray"}}>Ingreso de Datos Preliminares</h6>
              </Col>    
          </FormGroup>

          
          <Col md={2}/>
          <Col md={8}>
            <Panel bsStyle="info">
              <Panel.Body>
                <FormGroup controlId="variableID">
                  <Col md={6}>
                    <ControlLabel style={ styles.sizeFields }>Nombre: </ControlLabel>
                    {""}
                    <FormControl data-id="" type="text" value={this.props.valores.name} onChange={this.props.namehandler}/>
                    
                  </Col>                              

                  <Col md={6}>
                    <ControlLabel style={ styles.sizeFields }>Apellido: </ControlLabel>
                    {""}
                    <FormControl data-id="" type="text" value={this.props.valores.lastname} onChange={this.props.lastnamehandler}/>
                    
                  </Col>                  
                
                  <Col md={6}>
                    <ControlLabel style={ styles.sizeFields }>Años: </ControlLabel>
                    {""}
                    <FormControl data-id="" type="number" value={this.props.valores.yearsAge} onChange={this.props.yearhandler}/>
                    
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
                
                  <Col md={6}>
                    <ControlLabel style={ styles.sizeFields }>Genero:</ControlLabel>
                    <FormControl onChange={this.props.genderhandler} componentClass="select" placeholder="select">
                      <option value="M">MASCULINO</option>
                      <option value="F">FEMENINO</option>
                    </FormControl>
                  </Col>

                  <Col md={12}>
                    <Button bsStyle="success" className="button" style={ styles.button } onClick={this.props.submit}>GUARDAR E INGRESAR VITALES</Button>
                  </Col>

                </FormGroup>      
              </Panel.Body>
            </Panel>
          </Col>
          
        </Form>       
                  
      </div>
    )
  }
}
