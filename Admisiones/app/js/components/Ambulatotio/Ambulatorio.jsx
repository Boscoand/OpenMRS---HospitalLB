import React from 'react';
import AmbulatorioForm from "./AmbulatorioForm";
//import showResults from "./showResults";
// import { Values } from "redux-form-website-template";
import {OCUPACION_UUID,NACIMIENTO_UUID,ETNIA_UUID,TELEFONO_UUID,CELULAR_UUID,OTRONUMERO_UUID,LUGARTRABAJO_UUID,ESTADOCIVIL_UUID, PADRE_NOMBRE_UUID, MADRE_NOMBRE_UUID,CONYUGE_NOMBRE_UUID} from '../../utilities/constants';
import apiCall from '../../utilities/apiHelper' ;
export default class AmbulatorioP extends React.Component {
    constructor(props) {
        super(props);
        this.showResults = this.showResults.bind(this);
        this.showVal = this.showVal.bind(this);
        this.handleTitularID = this.handleTitularID.bind(this);
        this.changeTitularId = this.changeTitularId.bind(this);
        this.handleActualizarPersona = this.handleActualizarPersona.bind(this);
        this.handlepacienteId = this.handlepacienteId.bind(this);
        this.changepacienteId = this.changepacienteId.bind(this);
        this.handleRelativeNames = this.handleRelativeNames.bind(this);
        this.handleNombresCompletos = this.handleNombresCompletos.bind(this);
        this.state = {
            titularId:"",
            pacienteId:"",
            titularUUID : "",
            pacienteUUID: "",
            personTitular: "",
            personPaciente:"",
            pacienteName: "",
            titularName:"",
            pacienteDireccion:"",
            titularDireccion:"",
            titularNombresCompletos : "",
            pacienteNombresCompletos : "",
            titularGuardado:false,
            pacienteGuardado:false,
            "nombresGuardado":false,
            titularError : false,
            pacienteError :false,
            TitularErrores :[],
            PacienteErrores : []
        };
    }
    
    
    componentWillMount(){
        
        // console.log(this.props)
        // apiCall(null,'get',`/patient?v=full&q=${this.props.pacienteOPENMRSID}`).then((result) => {
                
        //         if(result.results.length==0){
        //             this.setState({encontrado:false});
        //         }else{
                    
        //             let person= result.results[0].person;
                    
        //             this.preliminares={nombre: person.names[0].givenName,apellido:person.names[0].familyName,genero:person.gender};
        //         }                                                                                                                                              //&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3Df59fba90-e7bbF-4783-8d54-7368cf3cb525%26
        //   });
    }
    
    showResults(values){
        console.log(values);
    }
    
    showVal(values){
        return(
            "RegistroAmbulatorio "+JSON.stringify(values, null, 2)    
        );
    }
    
    handleActualizarPersona(persona,tipo){
        // {"attributes": [{"attributeType": "8d8718c2-c2cc-11de-8d13-0010c6dffd0f", "value": "Guayaquil Nacimiento" }]}
       let attr = [];
        let id = (tipo=="TITULAR")? this.state.titularUUID:this.state.pacienteUUID;
        let nameID = (tipo=="TITULAR")? this.state.titularName:this.state.pacienteName;
        let personID = (tipo=="TITULAR")? this.state.personTitular:this.state.personPaciente;
        let addressID = (tipo=="TITULAR")? this.state.titularDireccion:this.state.pacienteDireccion;
        
        if(tipo=="TITULAR"){
            let provincia = persona.provincia;
            let ciudad = persona.ciudad;
            let address = persona.direccion;
            let parroquia = persona.parroquia;
            this.props.changeFieldValue("ambulatorio2","Provincia",{ provincia: provincia.charAt(0).toUpperCase() + provincia.substr(1), value: provincia });
            this.props.changeFieldValue("ambulatorio2","Ciudad",{ ciudad: ciudad.charAt(0).toUpperCase() + ciudad.substr(1), value: ciudad });
            this.props.changeFieldValue("ambulatorio2","Direccion",address);
            this.props.changeFieldValue("ambulatorio2","Parroquia",{ parroquia: parroquia.charAt(0).toUpperCase() + parroquia.substr(1), value: parroquia });
        }
        
        
        attr.push({
        
                      "attributeType": OCUPACION_UUID,
                      "value": persona.ocupacion
                    });
        attr.push({
                      "attributeType": NACIMIENTO_UUID,
                      "value": persona.lnacimiento
                    });
        attr.push({
                      "attributeType": ETNIA_UUID,
                      "value": persona.etnia
                    });
        attr.push({
                      "attributeType": TELEFONO_UUID,
                      "value": persona.telefono
                    });
        attr.push({
                      "attributeType": CELULAR_UUID,
                      "value": persona.celular
                    });
        attr.push({
                      "attributeType": OTRONUMERO_UUID,
                      "value": persona.otroTelf
                    });
        attr.push({
                      "attributeType": LUGARTRABAJO_UUID,
                      "value": persona.ltrabajo
                    });
        attr.push({
                      "attributeType": ESTADOCIVIL_UUID,
                      "value": persona.estado_civil
                    });           
                    
                    
                    
        let cedula = persona.cedula;
        let name = 
        {
          "givenName": persona.name,
          "middleName": persona.surname,
          "familyName": persona.familyName,
          "familyName2": persona.familyName2,
          "preferred": true
        };
        let n = persona.name + " " + persona.surname + " " + persona.familyName + " " + persona.familyName2;
        this.handleNombresCompletos(n,tipo);
        // {
        //     "givenName":persona.name,
        //     "middleName":persona.surname,
        //     "familyName":persona.familyName,
        //     "familyName2": persona.familyName2,
            
        // };
        let address = 
        
        {
          "preferred": true,
          "address1": persona.direccion,
          "address2": persona.parroquia,
          "cityVillage": persona.ciudad,
          "stateProvince": persona.provincia,
          "country": persona.pais
        };
        
        let json ={
                  
                "gender": persona.genero,
                "birthdate": persona.nacimiento,
                "birthdateEstimated": false,
                "attributes": attr
                    
        };
        
        let myJson = {
            "person" : json
        };
        
        if(id==""){
            
            let iden =  [
                {
                  "identifier": cedula,
                  "identifierType": "899291ac-3216-4bfd-b0a9-8cf9555b8e97",
                  "location": this.props.lugar,
                  "preferred": true
                }
              ];
            json["names"] = [name];
            json["addresses"] = [address];
            myJson = {
                "person" : json,
                "identifiers": iden
                
            };
            
        }
        
        console.log(myJson);
        
        
        apiCall(myJson,'post',`patient/${id}`).then((result) => {
            // console.log(result);
            if(result.hasOwnProperty("error")){
                let errores = (result.error.globalErrors);
                
                let erroresJunto = errores.map((erro)=>{
                    return(erro.message);
                });
                if(tipo=="TITULAR"){
                    this.setState({titularError:true,TitularErrores:erroresJunto});
                    
                }else{
                    this.setState({pacienteError:true,PacienteErrores:erroresJunto});
                }
                
                
            }else{
                if(tipo=="TITULAR"){
                    this.setState({titularError:false,TitularErrores:[]});
                    
                }else{
                    this.setState({pacienteError:false,PacienteErrores:[]});
                }
                
                let person = result.person;
                let name = person.preferredName.uuid;
                let addre = person.preferredAddress.uuid;
                
                if(tipo=="TITULAR"){
                    this.setState({"titularUUID":result.uuid});
                    this.setState({"titularId":cedula});
                    this.setState({"titularName":name});
                    this.setState({"personTitular":person.uuid});
                    this.setState({"titularDireccion":addre});
                    this.setState({"titularGuardado":true});
                    
                }else{
                    this.setState({"pacienteUUID":result.uuid});
                    this.setState({"pacienteId":cedula});
                    this.setState({"pacienteName":name});
                    this.setState({"personPaciente":person.uuid});
                    this.setState({"pacienteDireccion":addre});
                    this.setState({"pacienteGuardado":true});
                }

            }

      });
        
        
        if(id!=""){
            apiCall(name,'post',`person/${personID}/name/${nameID}`);
            apiCall(address,'post',`person/${personID}/address/${addressID}`);
        }
        
    }
    
    
    handlepacienteId(){
        // console.log("paciente")
        this.setState({"pacienteGuardado":false});
        this.setState({"nombresGuardado":false});
        apiCall(null,'get',`patient?v=full&q=${this.state.pacienteId}`).then((result) => {
                
                if(result.results.length==0){
                    // this.setState({encontrado:false});
                    // Object.assign(data, data.person, {});
                    this.setState({"pacienteUUID":"","pacienteId":""});
                    
                }else{
                    console.log(result);
                    const patient = result.results[0];
                    const person= result.results[0].person;
                    // const age = this.getAge(person.birthdate);
                    this.setState({"personPaciente":person.uuid});
                    
                    // console.log(person);
                    let address = person.addresses[0].address1;
                    let parroquia = person.addresses[0].address2;
                    let ciudad = person.addresses[0].cityVillage;
                    
                    this.setState({"pacienteDirecccion":person.preferredAddress.uuid});
                    
                    // let pais = person.addresses[0].country;
                    let provincia = person.addresses[0].stateProvince;
                    let atributos = person.attributes;
                    // console.log(atributos);
                    
                    let identificadores = patient.identifiers;
                    for(let j = 0 ; j<identificadores.length; j++){
                        let identificador  = identificadores[j];
                        let identifierType = identificador.identifierType.display;
                        
                        if(identifierType=="National ID"){
                            this.props.changeFieldValue("ambulatorio2","Cedula",identificador.identifier);
                            
                            this.setState({"pacienteId":identificador.identifier});
                        }
                        
                    }
                    
                    
                    for (var i=0;i<atributos.length;i++) {
                        let element = atributos[i];
                          let tipoAtributo = element.attributeType.uuid;
                          if(tipoAtributo == "8d8718c2-c2cc-11de-8d13-0010c6dffd0f"){
                              this.props.changeFieldValue("ambulatorio2","Lugar_Nacimiento",element.value);
                          }
                        //   ocupacion 
                        if(tipoAtributo == "45b10eed-6af7-4683-a734-aa0cb4097cbd"){
                              this.props.changeFieldValue("ambulatorio2","Ocupacion",element.value);
                          }
                        // estadocivil
                          if(tipoAtributo == "e79e203d-2d00-4bc3-a36b-55956d6b18dc"){
                              this.props.changeFieldValue("ambulatorio2","Estado_Civil",{ estado: element.value.charAt(0).toUpperCase() + element.value.substr(1), value: element.value });
                          }
                        // telefono
                          if(tipoAtributo == "14d4f066-15f5-102d-96e4-000c29c2a5d7"){
                              this.props.changeFieldValue("ambulatorio2","Telefono",element.value);
                          }
                        // celular
                          if(tipoAtributo == "6416df74-d9cb-431b-a5b0-e1bdeb4f5e23"){
                              this.props.changeFieldValue("ambulatorio2","Celular",element.value);
                          }
                        // lugar de trabajo
                        if(tipoAtributo == "886d7f30-d5be-4fd7-8560-61a3e0230613"){
                              this.props.changeFieldValue("ambulatorio2","Lug_Trabajo",element.value);
                          }
                        if(tipoAtributo == "65a33a23-bae9-493c-8b40-6496f562788e"){
                              this.props.changeFieldValue("ambulatorio2","Otro_telf",element.value);
                          }
                        if(tipoAtributo == PADRE_NOMBRE_UUID){
                              this.props.changeFieldValue("ambulatorio3","padre",element.value);
                          }
                        if(tipoAtributo == MADRE_NOMBRE_UUID){
                              this.props.changeFieldValue("ambulatorio3","madre",element.value);
                          }
                        if(tipoAtributo == CONYUGE_NOMBRE_UUID){
                              this.props.changeFieldValue("ambulatorio3","conyuge",element.value);
                          }
                        
                        
                    }
                    
                    
                   this.setState({"pacienteUUID":patient.uuid});
                    this.setState({"pacienteName":person.preferredName.uuid});
                    // console.log(atributos)
                    this.props.changeFieldValue("ambulatorio2","Primer_Nombre",person.preferredName.givenName);
                    
                    this.props.changeFieldValue("ambulatorio2","Segundo_Nombre",person.preferredName.middleName);
                    this.props.changeFieldValue("ambulatorio2","Primer_Apellido",person.preferredName.familyName);
                    this.props.changeFieldValue("ambulatorio2","Segundo_Apellido",person.preferredName.familyName2);
                    this.props.changeFieldValue("ambulatorio2","Fecha_Nacimiento",person.birthdate.substr(0, 10));
                    let g = (person.gender=="M")?"Masculino":"Femenino";
                    this.props.changeFieldValue("ambulatorio2","Genero",{ genero: g, value: person.gender });
                    // this.props.changeFieldValue("ambulatorio","Provincia",{ provincia: provincia.charAt(0).toUpperCase() + provincia.substr(1), value: provincia });
                    // this.props.changeFieldValue("ambulatorio","Ciudad",{ ciudad: ciudad.charAt(0).toUpperCase() + ciudad.substr(1), value: ciudad });
                    // this.props.changeFieldValue("ambulatorio","Direccion",address);
                    // this.props.changeFieldValue("ambulatorio","Parroquia",{ parroquia: parroquia.charAt(0).toUpperCase() + parroquia.substr(1), value: parroquia });
                    this.props.changeFieldValue("ambulatorio2","Provincia",{ provincia: provincia.charAt(0).toUpperCase() + provincia.substr(1), value: provincia });
                    this.props.changeFieldValue("ambulatorio2","Ciudad",{ ciudad: ciudad.charAt(0).toUpperCase() + ciudad.substr(1), value: ciudad });
                    this.props.changeFieldValue("ambulatorio2","Direccion",address);
                    this.props.changeFieldValue("ambulatorio2","Parroquia",{ parroquia: parroquia.charAt(0).toUpperCase() + parroquia.substr(1), value: parroquia });
                    
                    // const preliminares={nombre: person.names[0].givenName,apellido:person.names[0].familyName,genero:person.gender,edad:age };
                    // console.log(preliminares);
                    
                    // console.log(preliminares);
                    // this.props.savePatientPerson(preliminares);
                }                                                                                                                                              //&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3Df59fba90-e7bbF-4783-8d54-7368cf3cb525%26
          });
        
        
        // this.props.changeFieldValue("ambulatorio","Cedula",this.state.titularId);
    }
    
    
    handleRelativeNames(nombres){
        let attr = [];
        let id = this.state.pacienteUUID;
        
        attr.push({
        
                      "attributeType": PADRE_NOMBRE_UUID,
                      "value": nombres.padre
                    });
        attr.push({
                      "attributeType": MADRE_NOMBRE_UUID,
                      "value": nombres.madre
                    });
        attr.push({
                      "attributeType": CONYUGE_NOMBRE_UUID,
                      "value": nombres.conyuge
                    });
                    
        let json ={
                "attributes": attr
                    
        };
        
        
        let myJson = {
            "person" : json
        };
        console.log(`/patient/${id}`);
        console.log(myJson);
        apiCall(myJson,'post',`patient/${id}`).then((result)=>{
            this.setState({"nombresGuardado":true});
        });
    }
    handleNombresCompletos(nombres, tipo){
        if(tipo == "TITULAR"){
            this.setState({"titularNombresCompletos":nombres});
        }else{
            this.setState({"pacienteNombresCompletos":nombres});
        }
    }
    handleTitularID(){
        this.setState({"titularGuardado":false});
        apiCall(null,'get',`patient?v=full&q=${this.state.titularId}`).then((result) => {
                
                if(result.results.length==0){
                    // this.setState({encontrado:false});
                    // Object.assign(data, data.person, {});
                    this.setState({"titularUUID":"","titularId":""});
                    
                }else{
                    console.log(result);
                    const patient = result.results[0];
                    const person= result.results[0].person;
                    // const age = this.getAge(person.birthdate);
                    this.setState({"personTitular":person.uuid});
                    
                    // console.log(person);
                    this.setState({"titularDirecccion":person.preferredAddress.uuid});
                    let address = person.addresses[0].address1;
                    let parroquia = person.addresses[0].address2;
                    let ciudad = person.addresses[0].cityVillage;
                    // let pais = person.addresses[0].country;
                    let provincia = person.addresses[0].stateProvince;
                    let atributos = person.attributes;
                    // console.log(atributos);
                    
                    let identificadores = patient.identifiers;
                    for(let j = 0 ; j<identificadores.length; j++){
                        let identificador  = identificadores[j];
                        let identifierType = identificador.identifierType.uuid;
                        
                        if(identifierType=="899291ac-3216-4bfd-b0a9-8cf9555b8e97"){
                            this.props.changeFieldValue("ambulatorio","Cedula",identificador.identifier);
                            this.setState({"titularId":identificador.identifier});
                        }
                        
                    }
                    
                    
                    for (var i=0;i<atributos.length;i++) {
                        let element = atributos[i];
                          let tipoAtributo = element.attributeType.uuid;
                          if(tipoAtributo == "8d8718c2-c2cc-11de-8d13-0010c6dffd0f"){
                              this.props.changeFieldValue("ambulatorio","Lugar_Nacimiento",element.value);
                          }
                        //   ocupacion 
                        if(tipoAtributo == OCUPACION_UUID){
                              this.props.changeFieldValue("ambulatorio","Ocupacion",element.value);
                          }
                        // estadocivil
                          if(tipoAtributo == ESTADOCIVIL_UUID){
                              this.props.changeFieldValue("ambulatorio","Estado_Civil",{ estado: element.value.charAt(0).toUpperCase() + element.value.substr(1), value: element.value });
                          }
                        // telefono
                          if(tipoAtributo == "14d4f066-15f5-102d-96e4-000c29c2a5d7"){
                              this.props.changeFieldValue("ambulatorio","Telefono",element.value);
                          }
                        // celular
                          if(tipoAtributo == CELULAR_UUID){
                              this.props.changeFieldValue("ambulatorio","Celular",element.value);
                          }
                        // lugar de trabajo
                        if(tipoAtributo == LUGARTRABAJO_UUID){
                              this.props.changeFieldValue("ambulatorio","Lug_Trabajo",element.value);
                          }
                        if(tipoAtributo == OTRONUMERO_UUID){
                              this.props.changeFieldValue("ambulatorio","Otro_telf",element.value);
                          }
                        
                        
                    }
                    
                    
                   this.setState({"titularUUID":patient.uuid});
                    
                    // console.log(atributos)}
                    this.setState({"titularName":person.preferredName.uuid});
                    this.props.changeFieldValue("ambulatorio","Primer_Nombre",person.preferredName.givenName);
                    this.props.changeFieldValue("ambulatorio","Segundo_Nombre",person.preferredName.middleName);
                    this.props.changeFieldValue("ambulatorio","Primer_Apellido",person.preferredName.familyName);
                    this.props.changeFieldValue("ambulatorio","Segundo_Apellido",person.preferredName.familyName2);
                    this.props.changeFieldValue("ambulatorio","Fecha_Nacimiento",person.birthdate.substr(0, 10));
                    let g = (person.gender=="M")?"Masculino":"Femenino";
                    this.props.changeFieldValue("ambulatorio","Genero",{ genero: g, value: person.gender });
                    this.props.changeFieldValue("ambulatorio","Provincia",{ provincia: provincia.charAt(0).toUpperCase() + provincia.substr(1), value: provincia });
                    this.props.changeFieldValue("ambulatorio","Ciudad",{ ciudad: ciudad.charAt(0).toUpperCase() + ciudad.substr(1), value: ciudad });
                    this.props.changeFieldValue("ambulatorio","Direccion",address);
                    this.props.changeFieldValue("ambulatorio2","Provincia",{ provincia: provincia.charAt(0).toUpperCase() + provincia.substr(1), value: provincia });
                    this.props.changeFieldValue("ambulatorio2","Ciudad",{ ciudad: ciudad.charAt(0).toUpperCase() + ciudad.substr(1), value: ciudad });
                    this.props.changeFieldValue("ambulatorio2","Direccion",address);
                    this.props.changeFieldValue("ambulatorio2","Parroquia",{ parroquia: parroquia.charAt(0).toUpperCase() + parroquia.substr(1), value: parroquia });
                    this.props.changeFieldValue("ambulatorio","Parroquia",{ parroquia: parroquia.charAt(0).toUpperCase() + parroquia.substr(1), value: parroquia });
                    
                    // const preliminares={nombre: person.names[0].givenName,apellido:person.names[0].familyName,genero:person.gender,edad:age };
                    // console.log(preliminares);
                    
                    // console.log(preliminares);
                    // this.props.savePatientPerson(preliminares);
                }                                                                                                                                              //&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3Df59fba90-e7bbF-4783-8d54-7368cf3cb525%26
          });
        
        
        // this.props.changeFieldValue("ambulatorio","Cedula",this.state.titularId);
    }
    changeTitularId(ev){
        this.setState({titularId:ev.target.value});
    }
    
    changepacienteId(ev){
        this.setState({pacienteId:ev.target.value});
    }
    
    render(){ return(<div style={{ padding: 10 }}>
      <h2>Registro Ambulatorio</h2>
      <AmbulatorioForm  changeTitularId={this.changeTitularId} titularId={this.state.titularId} 
      handleTitularID={this.handleTitularID} onSubmit={this.showResults} 
      patientService={this.props.pacienteOPENMRSID} pacientePerson={this.props.pacientePerson}
      
      handleActualizarPersona ={this.handleActualizarPersona}
      handlepacienteId = {this.handlepacienteId}
      changepacienteId={this.changepacienteId} pacienteId={this.state.pacienteId} 
      pacienteCI ={this.state.pacienteId}
      titularCI = {this.state.titularId}
      
      handleRelativeNames = {this.handleRelativeNames}
      
      PacienteNombre = {this.state.pacienteNombresCompletos}
      TitularNombre = {this.state.titularNombresCompletos}
      handleNombresCompletos = {this.handleNombresCompletos}
      pacienteGuardado = {this.state.pacienteGuardado}
      titularGuardado = {this.state.titularGuardado}
      nombresGuardado = {this.state.nombresGuardado}
      titularError = {this.state.titularError}
      pacienteError = {this.state.pacienteError}
      titularErrores = {this.state.TitularErrores}
      pacienteErrores = {this.state.PacienteErrores}
      />

    </div>);
    }
    
}

//<Values form="ambulatorio"   format={this.showVal}  />