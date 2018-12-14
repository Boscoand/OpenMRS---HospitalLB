import React from 'react';
import { Col } from "react-bootstrap"

export default class DatosPreliminares extends React.Component {
    
    constructor(props) {
        super(props);  
    }
    
    render(){
        const styles = {      
            marginTitulo2: {
                marginTop: 25,
                marginBottom: 25,
                borderBottom: "1px solid silver"
            }
        }
        return(<div>

            <h3 style={ styles.marginTitulo2 }><b>Datos preliminares del Paciente enviados por el Doctor</b></h3>
            <h5>
                <Col md={3}><b>Nombre:</b></Col>
                <Col md={3}>{this.props.datos.nombre}</Col>
            </h5>
            <br></br>
            <h5>
                <Col md={3}><b>Género:</b></Col>
                <Col md={3}>{this.props.datos.genero}</Col>
            </h5>
            <br></br>
            <h5>
                <Col md={3}><b>Edad:</b></Col>
                <Col md={3}>{this.props.datos.edad}</Col>
            </h5>
            <br></br>

        </div>);
    }
    
}