import React from 'react';
import {CI_UUID} from '../utilities/constants';
export default class Registro extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render(){
        if(!this.props.disabled){
            return(<div>
           <h1>Ambulatorio</h1>
           <h3>Registro Nuevo</h3>
               <select onChange={this.props.handleChangeIDType}>
                  <option value={CI_UUID}>CEDULA</option>
                </select>
           
           <input type="text" value={this.props.CI} onChange={this.props.handleChangeID}/>
            
        </div>);
        }else{
            return(<div>
           <h1>Ambulatorio</h1>
           <h3>Registro Nuevo</h3>
               <select onChange={this.props.handleChangeIDType} disabled>
                  <option value="CI_UUID">CEDULA</option>
                </select>
           
           <input type="text" value={this.props.CI} onChange={this.props.handleChangeID} disabled/>
            
        </div>);
        }
        
    }
    
}