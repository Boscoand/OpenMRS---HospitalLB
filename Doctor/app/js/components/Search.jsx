import React from 'react';
import { Col, Label, Button, Form, FormControl, FormGroup, ControlLabel, Panel, Row } from "react-bootstrap"

export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        const styles = {
            button: {
              width: '100%'
            }, 
            marginTitulo: {
              marginTop: 50
            },
            sizeFields: {
              fontSize: '13px'
            },
            labelComplete: {
              width: "100%", 
              float: "left",
              marginBottom: 5
            },
          };
        return(
        
        <div>

          <Form horizontal>           
            <Row>
              <Col md={3}/>
              <Col md={6}>
                <h1 style={ styles.marginTitulo }><Label style={ styles.labelComplete }>Búsqueda de Pacientes</Label></h1>
                <h6 style={{color:"gray"}}>Llenar Formularios de Ambulatorio</h6>
                <h6 style={{color:"gray"}}>La búsqueda se habilita si el paciente ha pasado por Admisiones</h6>
              </Col>    
            </Row>

            <Row>
              <Col md={3}/>
              <Col md={6}>
                <Panel bsStyle="info">
                  <Panel.Body>
                    <FormGroup controlId="variableID">
                      <Col md={12}>
                        <ControlLabel style={ styles.sizeFields }>Ingresar cédula o código de servicio</ControlLabel>
                        {""}
                        <FormControl data-id="" type="text" value={this.props.state.ID} onChange={this.props.handleChangeID}/>
                        <FormControl.Feedback/>
                      </Col>                             
                    </FormGroup> 
                    <FormGroup>
                      <Col md={12}>
                        <Button bsStyle="success" style={ styles.button } onClick={this.props.handleClickSearch}>BUSCAR</Button>                            
                      </Col>
                    </FormGroup>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Form>
           
        </div>);
    }   
}