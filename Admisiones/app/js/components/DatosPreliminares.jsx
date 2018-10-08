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
           
           {/* <h2>Datos preliminares del Paciente enviados por el Doctor</h2>
           <table>
            <tbody>
             <tr><td> Nombre: </td><td>{this.props.datos.nombre} {this.props.datos.apellido}</td></tr>
             <tr><td> Genero: </td><td>{this.props.datos.genero}</td></tr>
             <tr><td> Edad: </td><td>{this.props.datos.edad}</td></tr>
             </tbody>
           </table> */}
            <h3 style={ styles.marginTitulo2 }><b>Datos preliminares del Paciente enviados por el Doctor</b></h3>
            <h5>
                <Col md={3}>Nombre:</Col>
                <Col md={3}>{this.props.datos.nombre}</Col>
            </h5>
            <br></br>
            <h5>
                <Col md={3}>Género:</Col>
                <Col md={3}>{this.props.datos.genero}</Col>
            </h5>
            <br></br>
            <h5>
                <Col md={3}>Edad:</Col>
                <Col md={3}>{this.props.datos.edad}</Col>
            </h5>
            <br></br>

        </div>);
    }
    
}