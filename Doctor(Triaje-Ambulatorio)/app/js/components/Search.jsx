import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render(){
        return(<div>
           
           <h1>Búsqueda de Pacientes</h1>
           <h4 style={{color:"gray"}}>La búsqueda se habilita si el paciente ha pasado por Admisiones</h4>
           <h3>Ingresar cédula o código de servicio</h3>
           
           <input type="text" value={this.props.state.ID} onChange={this.props.handleChangeID}/>
            <button onClick={this.props.handleClickSearch}>BUSCAR</button>        
        </div>);
    }
    
}