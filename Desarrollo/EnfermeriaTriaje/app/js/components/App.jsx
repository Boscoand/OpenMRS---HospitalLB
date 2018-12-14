/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import * as request from "superagent"
import Paciente from './Paciente'
import {OPENMRSID, VISIT_UUID} from '../utilities/constants'
import apiCall from '../utilities/apiHelper'
export default class App extends React.Component {
  
  constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleYearAgeChange = this.handleYearAgeChange.bind(this);
        this.handleMonthAgeChange = this.handleMonthAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleEmergencyChange = this.handleEmergencyChange.bind(this);
        this.createForm = this.createForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.date = new Date(),
        this.state = {
           
            name : "",
            lastname : "",
            yearsAge : 0,
            monthsAge : 0,
            gender : "M",
            ID:"",
            location:"",
            paciente:""
            
        };
        
        
        
    
  }
  
  componentDidMount(){
    this.openMRSID().then((result) => {
        
        this.setState({ID: result.identifiers[0] })
      })
    
    apiCall(null,'get','appui/session?v=full').then((result) => {
        let uuid = (result.sessionLocation.uuid)
        this.setState({location: uuid })
        
      })
  }
  handleNameChange(event){
     this.setState({name: event.target.value})
  }
  
  handleLastNameChange(event){
     this.setState({lastname: event.target.value})
  }
  
    handleYearAgeChange(event){
      
     this.setState({yearsAge: event.target.value})
  }
  
   handleMonthAgeChange(event){
     
     this.setState({monthsAge: event.target.value})
  }
  
  handleGenderChange(event){
     this.setState({gender: event.target.value})
  }
  
  handleEmergencyChange(event){
     this.setState({emergency: event.target.value})
  }
  
  
  openMRSID(){
        const contextPath = location.href.split("/")[3]
        const BASE_URL = `/${contextPath}/module/idgen/generateIdentifier.form?source=1`
        return new Promise((resolve, reject) => {
          request['get'](BASE_URL)
            .set("Content-Type", "application/json")
            .end((err, res) => {
              if (res) {
                return resolve(res.body)
              }
              return reject(err)
            })
        })
  }
  
  
  createForm(){
      var d = new Date();
      var year = parseInt(this.state.yearsAge);
      var month = parseInt(this.state.monthsAge);
      
      let mesb = d.getMonth() - month;
      
      if(mesb<0){
        mesb+=12;
        year+=1;
      }
      
      let yearb=d.getFullYear()-year;
      d.setFullYear(yearb,mesb,d.getDate());
       let paciente = {
          "person": {
            "names": [
                {
                  "givenName": this.state.name,
                  "familyName": this.state.lastname,
                  "preferred": false,
                }],
            "gender": this.state.gender,
            "birthdate": d.toISOString(),
            "birthdateEstimated": true,
            "age" : this.state.yearsAge
              
          },
          "identifiers": [
            {
              "identifier": this.state.ID,
              "identifierType": OPENMRSID,
              "location": this.state.location,
              "preferred": true
            }
          ]
        }
        console.log(paciente);
        apiCall(paciente,'post','patient').then((result) => {
          console.log(result);
          this.setState({paciente: result.uuid})
          let visita = {
              "patient": result.uuid,
              "visitType": VISIT_UUID ,
              "startDatetime": new Date().toISOString(),
              "location": this.state.location,
              "stopDatetime": null,
          }
          console.log(visita);
          apiCall(visita,'post','visit').then((result) => {
          
                console.log(result)
                const contextPath = location.href.split("/")[3]
                
                let enlace = `/${contextPath}/htmlformentryui/htmlform/enterHtmlFormWithSimpleUi.page?patientId=${this.state.paciente}&visitId=${result.uuid}&formUuid=01f06683-9545-448a-a29c-c86caf814c19&returnUrl=%2Fopenmrs%2Fowa%2Fenfermeriatriaje%2Findex.html%3Fpatient`
                location.replace(enlace);                                                                                                                                                //&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3Df59fba90-e7bbF-4783-8d54-7368cf3cb525%26
          })
      })
  }
  onSubmit(){
     console.log(this.state);
     this.createForm();
  }
  render() {
    return (
      <div>
        <Paciente valores={this.state}  
        namehandler={this.handleNameChange}
        lastnamehandler={this.handleLastNameChange}
        yearhandler={this.handleYearAgeChange}
        monthandler={this.handleMonthAgeChange}
        genderhandler={this.handleGenderChange}
        submit={this.onSubmit}
        />
        
        
      </div>
     
    )
  }
}
