import React from 'react';
import { Col, Button, Form, FormControl, FormGroup, ControlLabel, Panel, Row } from "react-bootstrap"

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
            containerRigth: {
              marginTop: 20
            }
          };
        return(
        
        <div>
          <Col sm={3}></Col>
          <Col sm={9} style={ styles.containerRigth }>
            <Form horizontal>           
              <Row>
                <Col md={12}>
                  <h4 style={{color:"gray"}}>Búsqueda de Pacientes</h4>
                  <h5 style={{color:"gray"}}>Llenar Formularios de Ambulatorio. La búsqueda se habilita si el paciente ha pasado por Admisiones</h5>
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
          </Col>
           
        </div>);
    }   
}