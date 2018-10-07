/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import Search from './Search'
import apiCall from '../utilities/apiHelper'
import {HOME} from '../utilities/constants'
import OpenMRSView from './openmrsView'
import { Label } from "react-bootstrap"

export default class Hospitalizacion extends React.Component {
  
  constructor(props) {
        super(props);
        console.log(apiCall);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleClickNewSearch = this.handleClickNewSearch.bind(this);
        this.handleClickForm005 = this.handleClickForm005.bind(this);
        this.handleClickForm008 = this.handleClickForm008.bind(this);
        this.handleClickForm003Corto = this.handleClickForm003Corto.bind(this);
        this.state = {
            patient:"",
            visit:"",
            form:"69570ced-0684-48c0-80f0-040e89d62d9f",
            encontrado:"",
            ID : ""
        };
    
  }
  
  handleClickSearch(event){
        apiCall(null,'get',`patient?q=${this.state.ID}&v=full`).then((result) => {
                //console.log(result.results[0]);
                if(result.results.length>0){
                  return result.results[0].uuid
                }
                else{
                  this.setState({encontrado:false})
                }
                
        }).then(patient=>{
               // console.log(patient)
              apiCall(null,'get',`patient/${patient}?v=full`).then((result) => {
                  return result.identifiers.map(identificador=>{
                      
                      if(identificador.identifierType.uuid=="899291ac-3216-4bfd-b0a9-8cf9555b8e97"){
                        //console.log(result.uuid)
                        return result.uuid
                      }else{
                          return "";
                      }
                  }).filter(id=>id!="")[0];
              }).then(paciente=>{
                    //console.log(paciente)
                    if(paciente){
                      apiCall(null,'get',`visit?patient=${patient}&includeInactive=false&v=full`).then((result) => {
                        console.log(result)
                        if(result.results.length>0){
                            let patient = result.results[0].patient.uuid;
                            let visita = result.results[0].uuid;
                            let url=`http://${HOME}/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${patient}&visitId=${visita}&formUuid=${this.state.form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${patient}%26`
                            this.setState({patient:patient, visit:visita, "url":url, encontrado:true })
                        }else{
                            this.setState({patient:"", visit:"", "url":"", encontrado:false })
                        }
                        
                        
                    })
                    }else{
                        this.setState({patient:"", visit:"", "url":"", encontrado:false })
                    }
                    
              })
        });
  }
  
  handleChangeID(event){
    this.setState({ID:event.target.value})
  }
  handleClickNewSearch(event){
    this.setState({patient:"", visit:"", "url":"", encontrado:"", ID:"" })
  }
  
  handleClickForm005(event){
      let patient =this.state.patient;
      let visita = this.state.visit;
      let form = "ac28566c-2ef0-49fd-9109-67f26870ad3e"
      let url=`http://${HOME}/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${patient}&visitId=${visita}&formUuid=${form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${patient}%26`
      this.setState({ "url":url})
  }
  
  handleClickForm008(event){
      let patient =this.state.patient;
      let visita = this.state.visit;
      let form = "69570ced-0684-48c0-80f0-040e89d62d9f";
      let url=`http://${HOME}/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${patient}&visitId=${visita}&formUuid=${form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${patient}%26`;
      this.setState({ "url":url});
  }
  handleClickForm003Corto(event){
      let patient =this.state.patient;
      let visita = this.state.visit;
      let form = "7e695fa3-6d4d-4175-8575-1d71af4992a8";
      let url=`http://${HOME}/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${patient}&visitId=${visita}&formUuid=${form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${patient}%26`;
      this.setState({ "url":url});
  }
  
  
  componentDidMount(){
    
   
  }

  render() {

    // const styles = {      
    //     marginSubtitulo: {
    //       marginTop: 140
    //         },
    //           marginTitulo: {
    //       marginTop: 80
    //     }
    //   };

    if(this.state.encontrado===""){
             return (
                <div>
                 {/* <h1 style={ styles.marginTitulo }><Label>Ambulatorio</Label></h1> */}
                 {/* <h4 style={ styles.marginSubtitulo }>Llenar Formularios de Ambulatorio</h4> */}
                 <Search state={this.state}handleChangeID={this.handleChangeID} handleClickSearch={this.handleClickSearch} />
                </div>)
    }
    if(this.state.encontrado===true){
          return (
                <div>
                 {/* <h1 style={ styles.marginTitulo }><Label>Ambulatorio</Label></h1> */}
                 {/* <h4 style={ styles.marginSubtitulo }>Llenar Formularios de Ambulatorio</h4> */}
                 <button style={{position: "relative", float: "right"}} onClick={this.handleClickNewSearch}>NUEVA BUSQUEDA</button>
                 <button onClick={this.handleClickForm008}>FORMULARIO 008</button>
                 <button onClick={this.handleClickForm003Corto}>FORMULARIO 003</button>
                 <button onClick={this.handleClickForm005}>FORMULARIO 005</button>  
                  
                 <OpenMRSView url={this.state.url}/>
                </div>);
    }
    if(this.state.encontrado===false){
          return (
                <div>
                 {/* <h1 style={ styles.marginTitulo }><Label>Ambulatorio</Label></h1> */}
                 {/* <h4 style={ styles.marginSubtitulo }>Llenar Formularios de Ambulatorio</h4> */}
                 <Search state={this.state}handleChangeID={this.handleChangeID} handleClickSearch={this.handleClickSearch} />
                 <h4 style={{color:"gray"}}>Paciente no encontrado, solo se admiten pacientes que han pasado por Admisiones</h4>
                </div>)
    }
   
  }
}
