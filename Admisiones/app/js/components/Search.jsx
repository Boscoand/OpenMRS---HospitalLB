import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render(){
        return(<div>
           
           <h1>Registro de {this.props.label}</h1>
           <h2>Buscar si el {this.props.label} ya tiene registro</h2>
           <h3>Ingresar cédula</h3>
           
           <input type="text" value={this.props.state.CI} onChange={this.props.handleChangeID}/>
            <button onClick={this.props.handleClickSearch}>BUSCAR</button>        
        </div>);
    }
    
}