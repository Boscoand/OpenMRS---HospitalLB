/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import apiCall from '../utilities/apiHelper'
import OpenMRSView from './openmrsView'
import {FacilityVisit, HOME} from '../utilities/constants'
import VitalEncounter from '../utilities/constants'
import PriorityQueue from 'js-priority-queue'
import ReactTable from "react-table";
var facilityVisit = FacilityVisit;
var Vitals = VitalEncounter;

import 'react-table/react-table.css';

export default class Ambulatorio extends React.Component {
  constructor(props) {
        super(props);
        this.cola={
          "prioridad1":[],
          "prioridad2":[],
          "prioridad3":[],
          "prioridad4":[],
          "prioridad5":[],
        };
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleReturnClick = this.handleReturnClick.bind(this);
        this.handlePatientClick = this.handlePatientClick.bind(this);
        this.addPat = this.addPat.bind(this);
        this.state = {
            server : HOME,
            patient:"",
            visit:"",
            form:"73376f0f-a248-4cda-8498-08be473284bd",
            url:"",
            facilityVisit:FacilityVisit,
            Vitals : VitalEncounter,
            comenzar:false,
            loading:true,
            data:[]
        };
        this.pat = new PriorityQueue({ "comparator": (a, b)=> a.estado - b.estado,strategy: PriorityQueue.BinaryHeapStrategy });
        this.data = [];
        
  }

   
   handleReturnClick(){
        this.data=[];
        this.setState({loading:true,data:[], comenzar:false});        
        apiCall(null,'get','visit?limit=100&includeInactive=false&v=full').then((result) => {
                
                let resultados = result.results;
                
                let encuentros = resultados.map((visita)=>{
                  //Filtrar las visitas que sean de ambulatorio
                      if(visita.visitType.uuid=="7b0f5697-27e3-40c4-8bae-f4049abfb4ed"){
                        
                          if(visita.encounters.length==1){
                            //Extraer el id del encuentro de tipo Vitals
                             if(visita.encounters[0].encounterType.uuid=="67a71486-1a54-468f-ac3e-7091a9a79584"){
                                return visita.encounters[0].uuid; 
                             }
                          }
                      }
                      return "";
                }).filter(encuentro =>{
                      return encuentro!=""; 
                });
                var promises = encuentros.map(encuentro=>{
                    return apiCall(null,'get',`encounter/${encuentro}?v=full`).then((result) => {
                        //Traer los encuentros completos
                        // console.log(result);
                        return result;
                    });
                    
                    
                });
        
                Promise.all(promises).then(results=> {
                      (results.map(encuentro=>{
                          return encuentro.obs.map(obs=>{
                            //Extrae de los encuentros la observacion del estado del paciente
                                if(obs.concept.uuid==="f1c5b625-efab-411f-b85e-b7d722048ee0"){
                                  let valor;
                                  switch (obs.value.display) {
                                        case "EMERGENCIA":
                                      	  valor = 1;
                                          break;
                                      case "MUY URGENTE":
                                          valor = 2;
                                          break;
                                      case "URGENTE":
                                          valor = 3;
                                          break;
                                      case "POCO URGENTE":
                                          valor = 4;
                                          break;
                                      case "NO URGENTE":
                                          valor = 5;
                                          break;
                                      default:
                                          valor = -1;
                                      
                                  }
                                  let ingresoHora=encuentro.visit.startDatetime;
                                  var ts = new Date(ingresoHora);
                                  console.log(ts);
                                  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                  var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "OCtubre", "Noviembre", "Deciembre"];
                                  ingresoHora=`${ts.getDate()}/${months[ts.getMonth()]}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()}`;
                                  return ({paciente: encuentro.patient.uuid,pacienteV:encuentro.patient.display,visita: encuentro.visit.uuid , estado: valor, estadoV: obs.value.display,ingreso:ingresoHora});
                                  // let ingresoHora=encuentro.visit.startDatetime;
                                  // var ts = Date.parse(ingresoHora);
                                  // console.log(ts);
                                  // return ({paciente: encuentro.patient.uuid,pacienteV:encuentro.patient.display,visita: encuentro.visit.uuid , estado: valor, estadoV: obs.value.display,ingreso:ingresoHora});
                                }else{
                                  return ("");
                                }
                          }).filter(obs=> obs!="")[0];
                        
                      }).filter(encounter=> encounter!=undefined) ).reverse().forEach((item)=>{
                        this.pat.queue(item);
                      });       
                      //console.log(this.pat);
                      let long = (this.pat.length);
                      for(let j = 0;j<long;j++){
                        
                        this.data.push(this.pat.dequeue());
                        // console.log(this.data);
                        if(j==long-1){
                          this.setState({loading:false, data:this.data});
                        }
                      }
                });
        });
   }
  
  
  componentWillMount(){
    //Consultar las visitas activas
    apiCall(null,'get','visit?limit=100&includeInactive=false&v=full').then((result) => {
        let resultados = result.results;
        console.log(result)
        console.log("Entro")
        let encuentros = resultados.map((visita)=>{
          //Filtrar las visitas que sean de ambulatorio
              if(visita.visitType.uuid=="7b0f5697-27e3-40c4-8bae-f4049abfb4ed"){
                  console.log("visita")
                  if(visita.encounters.length==1){
                    //Extraer el id del encuentro de tipo Vitals
                    console.log("Tiene visita")
                     if(visita.encounters[0].encounterType.uuid=="67a71486-1a54-468f-ac3e-7091a9a79584"){
                        return visita.encounters[0].uuid; 
                        console.log("visita Vitals")
                     }
                  }
              }
              return "";
        }).filter(encuentro =>{
              return encuentro!=""; 
        });
        var promises = encuentros.map(encuentro=>{
            return apiCall(null,'get',`encounter/${encuentro}?v=full`).then((result) => {
                //Traer los encuentros completos
                console.log(result);
                return result;
            });
            
            
        });

        Promise.all(promises).then(results=> {
              (results.map(encuentro=>{
                  return encuentro.obs.map(obs=>{
                    //Extrae de los encuentros la observacion del estado del paciente
                        if(obs.concept.uuid==="f1c5b625-efab-411f-b85e-b7d722048ee0"){
                          console.log("Estado paciente")
                          console.log(obs.value.display)
                          let valor;
                          switch (obs.value.display) {
                                case "EMERGENCIA":
                              	  valor = 1;
                                  break;
                              case "MUY URGENTE":
                                  valor = 2;
                                  break;
                              case "URGENTE":
                                  valor = 3;
                                  break;
                              case "POCO URGENTE":
                                  valor = 4;
                                  break;
                              case "NO URGENTE":
                                  valor = 5;
                                  break;
                              default:
                                  valor = -1;
                              
                          }
                          // console.log(encuentro.visit);
                          let ingresoHora=encuentro.visit.startDatetime;
                          var ts = new Date(ingresoHora);
                          console.log(ts);
                          var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                          var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "OCtubre", "Noviembre", "Deciembre"];
                          ingresoHora=`${ts.getDate()}/${months[ts.getMonth()]}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()}`;
                          return ({paciente: encuentro.patient.uuid,pacienteV:encuentro.patient.display,visita: encuentro.visit.uuid , estado: valor, estadoV: obs.value.display,ingreso:ingresoHora});
                        }else{
                          return ("")
                        }
                  }).filter(obs=> obs!="")[0]
                
              }).filter(encounter=> encounter!=undefined) ).reverse().forEach((item)=>{
                this.pat.queue(item);
              });
              let long = (this.pat.length);
              for(let j = 0;j<long;j++){
                
                this.data.push(this.pat.dequeue());
                console.log(this.data);
                if(j==long-1){
                  this.setState({loading:false, data:this.data, comenzar:false});
                }
                
              }
        });
        
    
});
        
        
    
    //console.info(this.props.router)
    let url=`http://${this.state.server}/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${this.state.patient}&visitId=${this.state.visit}&formUuid=${this.state.form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${this.state.patient}%26`;
    
   this.setState({"url":url});
   console.log(url);
  }
  handleClick(event){
    let obj = this.pat.dequeue();
    let patient = obj.paciente;
    let visita = obj.visita;
    let url=`http://${this.state.server}/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${patient}&visitId=${visita}&formUuid=${this.state.form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${patient}%26`;
    this.setState({patient:patient, visit:visita, "url":url });
  }
  handlePatientClick(patientID,visitaID){
    let url=`http://${this.state.server}/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${patientID}&visitId=${visitaID}&formUuid=${this.state.form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${patientID}%26`;
    this.setState({patient:patientID, visit:visitaID, "url":url, comenzar:true});
  }
  
  handleStartClick(event){
      let obj = this.pat.dequeue();
      let patient = obj.paciente;
      let visita = obj.visita;
      let url=`http://${this.state.server}/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${patient}&visitId=${visita}&formUuid=${this.state.form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${patient}%26`;
      this.setState({patient:patient, visit:visita, "url":url, comenzar:true });
  }
  
  addPat(val){
    this.pat.push(val);
  }
  render() {
    if(this.state.comenzar){
          return (
          <div>
          <h1>Triaje en Emergencia</h1>
          <h2 >Hacer clic para ver el siguiente paciente</h2>
          <button onClick={this.handleReturnClick}>Ver Pacientes </button>
          <OpenMRSView url={this.state.url}/>
          </div>
        );
    }else{
      // if(!this.state.loading || this.state.loading){
        // console.log(this.data);
         return (
          <div>
          <h1>Triaje en Emergencia</h1>
          <h2 >Hacer clic para ver al primer paciente</h2>
          <ReactTable
            data={this.state.data}
            columns={columns}
            loading = {this.state.loading}
            pageText= 'Página'
            previousText= 'Anterior'
            nextText= 'Siguiente'
            loadingText='Cargando...'
            noDataText= 'No hay pacientes en triaje'
            
            getTdProps={(state, rowInfo, column, instance) => {
                
                
                return {
                  
                  onClick: (e, handleOriginal) => {
                    let patientInfo = rowInfo.original;
                    // console.log(column);
                    // console.log("It was in this row:", patientInfo);
                    this.handlePatientClick(patientInfo.paciente,patientInfo.visita);
            
                    
                    if (handleOriginal) {
                      handleOriginal();
                    }
                  },
                  
                  // style:{
                  //   background:(column.Header!="Estado")?"white":
                  //   // (rowInfo.original.estadoV=="EMERGENCIA")?"red":
                  //   // (rowInfo.original.estadoV=="MUY URGENTE")?"orange":
                  //   // (rowInfo.original.estadoV=="URGENTE")?"yellow ":
                  //   // (rowInfo.original.estadoV=="POCO URGENTE")?"green":
                  //   // (rowInfo.original.estadoV=="NO URGENTE")?"blue":
                  //   "white"
                    
                  // }
                };
              }}
              
              
          />
          
          
          </div>
        );
      // }else{
      //   return(
      //     <div>Cargando</div>
      //     )
      // }
    }
    
  }
}

const columns=[
    {
                  Header: "Paciente",
                  accessor: "pacienteV",
                  Cell: props => <span>{props.value}</span>
    },
    {
                  Header: "Estado",
                  accessor: "estadoV",
                  Cell: props =><div style={tdSTyle(props.value)}> <span style={{color:(props.value!="NO URGENTE")?`
                  blue
                  `:"white",textAlign:"center",fontWeight:"300"}} >{props.value}</span></div>
    },
    {
                  Header: "Ingreso",
                  accessor: "ingreso",
                  Cell: props =><div > <span >{props.value}</span></div>
    }
];

function tdSTyle(value){
  let colorE = "";
  switch (value) {
      case "EMERGENCIA":
      	  colorE = "red";
          break;
      case "MUY URGENTE":
          colorE = "orange";
          break;
      case "URGENTE":
          colorE = "#CCCC00";
          break;
      case "POCO URGENTE":
          colorE = "green";
          break;
      case "NO URGENTE":
          colorE = "blue";
          break;
      default:
          colorE = "black";
      
  }
  return ({
      background: colorE
    })
}

function tdSTyleColor(value){
  let colorE = "";
  switch (value) {
      case "EMERGENCIA":
      	  colorE = "blue";
          break;
      case "MUY URGENTE":
          colorE = "blue";
          break;
      case "URGENTE":
          colorE = "blue";
          break;
      case "POCO URGENTE":
          colorE = "blue";
          break;
      case "NO URGENTE":
          colorE = "white";
          break;
      default:
          colorE = "black";
      
  }
  return (colorE);
}

var form = function format(obs, result) {
    return new Promise((resolve, reject) => {
      if(obs.concept.uuid==="174ea004-9784-47bd-b683-f3a11a9a58d9"){
        //console.log({paciente: result.patient.uuid, estado: obs.value.display})
        return resolve({paciente: result.patient.uuid,visita: result.visit.uuid , estado: obs.value.display});
      }else{
        return reject({})
      }
    });
  }
//"http://${HOME}:3000/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?formUuid=87cfc6c8-d607-4b39-97e0-dbc2c6e18818&patientId=39&refappui=true&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId=39"