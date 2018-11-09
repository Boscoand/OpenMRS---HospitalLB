import React from 'react';
import Search from './Search'
import apiCall from '../utilities/apiHelper'
import {HOME} from '../utilities/constants'
import OpenMRSView from './openmrsView'
import { Col, Button, Label } from "react-bootstrap"

export default class Hospitalizacion extends React.Component {
  
    constructor(props) {
        super(props);
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
            if(result.results.length>0){
                return result.results[0].uuid
            }
            else{
                this.setState({encontrado:false})
            }   
        }).then(patient=>{
            apiCall(null,'get',`patient/${patient}?v=full`).then((result) => {
                return result.identifiers.map(identificador=>{  
                    if(identificador.identifierType.uuid=="899291ac-3216-4bfd-b0a9-8cf9555b8e97"){
                    return result.uuid
                    }else{
                        return "";
                    }
                  }).filter(id=>id!="")[0];
              }).then(paciente=>{
                    if(paciente){
                        apiCall(null,'get',`visit?patient=${patient}&includeInactive=false&v=full`).then((result) => {
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

    render() {

        const styles = {
            containerRigth: {
                marginTop: 30,
                marginLeft: 20
            },
            marginButtons: {
                marginRight: 10
            },
            error: {
                marginTop: 10,
                fontSize: "18px",
                padding: "10px",
                width: "100%", 
                float: "left"
            },
        }

        if(this.state.encontrado===""){
            return (
                <div>
                    <Search state={this.state}handleChangeID={this.handleChangeID} handleClickSearch={this.handleClickSearch} />
                </div>)
        }if(this.state.encontrado===true){
            return (
                <div>
                    <Col sm={3}></Col>
                    <Col sm={9} style={ styles.containerRigth }>
                        <Button bsStyle="success" style={{position: "relative", float: "right"}} onClick={this.handleClickNewSearch}>NUEVA BUSQUEDA</Button>
                        <Button bsStyle="warning" style={ styles.marginButtons } onClick={this.handleClickForm008}>FORMULARIO 008</Button>
                        <Button bsStyle="warning" style={ styles.marginButtons } onClick={this.handleClickForm003Corto}>FORMULARIO 003</Button>
                        <Button bsStyle="warning" style={ styles.marginButtons } onClick={this.handleClickForm005}>FORMULARIO 005</Button>  
                        <OpenMRSView url={this.state.url}/>
                    </Col>      
                </div>);
        }if(this.state.encontrado===false){
            return (
                <div>
                    <Search state={this.state}handleChangeID={this.handleChangeID} handleClickSearch={this.handleClickSearch} />
                    <Col sm={3}></Col>
                    <Col sm={9}>
                        <Label bsStyle="danger" style={ styles.error }>Paciente no encontrado, solo se admiten pacientes que han pasado por Admisiones.</Label>
                    </Col>
                </div>)
        }
    }
}
