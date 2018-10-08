import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmbulatorioFormFirstPage from './AmbulatorioFormFirstPage';
import AmbulatorioFormSecondPage from './AmbulatorioFormSecondPage';
import AmbulatorioFormThirdPage from './AmbulatorioFormThirdPage';
import AmbulatorioFormFourthPage from './AmbulatorioFormFourthPage';
import AmbulatorioFormFifthPage from './AmbulatorioFormFifthPage';
import AmbulatorioFormSixthPage from './AmbulatorioFormSixthPage';
import OpenMRSView from '../openmrsView';
import HOME from '../../utilities/constants' ;
import VentanaForm from './VentanaForm';
class AmbulatorioForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.page1 = this.page1.bind(this);
    this.page2 = this.page2.bind(this);
    this.page3 = this.page3.bind(this);
    this.page4 = this.page4.bind(this);
    this.page5 = this.page5.bind(this);
    this.page6 = this.page6.bind(this);
    this.page7 = this.page7.bind(this);
    this.page8 = this.page8.bind(this);
    this.handleChangeTitularID = this.handleChangeTitularID.bind(this);
    this.searchTitular = this.searchTitular.bind(this);
    this.handleTitularSubmit = this.handleTitularSubmit.bind(this);
    this.handleNamesSubmit = this.handleNamesSubmit.bind(this);
    this.handlePacienteSubmit = this.handlePacienteSubmit.bind(this);
    this.state = {
      page: 1,
      titular:{},
      titularId:"",
      paciente:{},
      enlace: `http://200.10.147.155:8080/openmrs/coreapps/datamanagement/mergePatients.page?app=coreapps.mergePatients`
    };
  }
  
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  
  page1() {
    this.setState({ page: 1 });
  }
  
  page2() {
    this.setState({ page: 2 });
  }
  
  page3() {
    this.setState({ page: 3 });
  }
  
  page4() {
    this.setState({ page: 4 });
  }
  
  page5() {
    this.setState({ page: 5 });
  }
  
  page6() {
    this.setState({ page: 6 });
  }
  
  page7() {
    this.setState({ page: 7 });
  }
  
  page8() {
    this.setState({ page: 8 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  
  handleChangeTitularID(ev){
    // console.log(ev.target.value);
    this.setState({titularId:ev.target.value});
  }

  searchTitular(){
    // console.log(changeFieldValue);
    
  }
  
  handleTitularSubmit(values){
    // console.log(values);
    let person = {
      "cedula" : values.Cedula,
      "celular" : values.Celular,
      "ciudad" : values.Ciudad.value,
      "etnia" : (values["Cultura_Étnica"])?values["Cultura_Étnica"]["value"]:undefined,
      "direccion" : values["Direccion"],
      "estado_civil" : (values["Estado_Civil"])?values["Estado_Civil"]["estado"]:undefined,
      "nacimiento" : values.Fecha_Nacimiento,
      "genero" : (values.Genero)?values.Genero.value:undefined,
      "ltrabajo" : values.Lug_Trabajo,
      "lnacimiento" : values.Lugar_Nacimiento,
      "nacionalidad" : (values.Nacionalidad)?values.Nacionalidad.value:undefined,
      "ocupacion"  : values.Ocupacion,
      "otroTelf" : values.Otro_telf,
      "parroquia" : (values.Parroquia)?values.Parroquia.value:undefined,
      "familyName" : values.Primer_Apellido,
      "familyName2" : values.Segundo_Apellido,
      "name" : values.Primer_Nombre,
      "surname" : values.Segundo_Nombre,
      "telefono" : values.Telefono,
      "provincia" : (values.Provincia)?(values.Provincia.value):undefined
    };
    // console.log(person);
    let namesComplete = person.name+" "+person.surname+" "+person.familyName+" "+person.familyName2;
    this.props.handleNombresCompletos(namesComplete,"TITULAR");
    this.props.handleActualizarPersona(person,"TITULAR");
  }

  handleNamesSubmit(values){
    let names = {
        "conyuge" : values.conyuge,
        "padre" : values.padre,
        "madre" : values.madre
    };
    this.props.handleRelativeNames(names);
  }

  handlePacienteSubmit(values){
    // console.log(values);
    let person = {
      "cedula" : values.Cedula,
      "celular" : values.Celular,
      "ciudad" : values.Ciudad.value,
      "etnia" : (values["Cultura_Étnica"])?values["Cultura_Étnica"]["value"]:undefined,
      "direccion" : values["Direccion"],
      "estado_civil" : (values["Estado_Civil"])?values["Estado_Civil"]["estado"]:undefined,
      "nacimiento" : values.Fecha_Nacimiento,
      "genero" : (values.Genero)?values.Genero.value:undefined,
      "ltrabajo" : values.Lug_Trabajo,
      "lnacimiento" : values.Lugar_Nacimiento,
      "nacionalidad" : (values.Nacionalidad)?values.Nacionalidad.value:undefined,
      "ocupacion"  : values.Ocupacion,
      "otroTelf" : values.Otro_telf,
      "parroquia" : (values.Parroquia)?values.Parroquia.value:undefined,
      "familyName" : values.Primer_Apellido,
      "familyName2" : values.Segundo_Apellido,
      "name" : values.Primer_Nombre,
      "surname" : values.Segundo_Nombre,
      "telefono" : values.Telefono,
      "provincia" : (values.Provincia)?(values.Provincia.value):undefined
    };
    
    let namesComplete = person.name+" "+person.surname+" "+person.familyName+" "+person.familyName2;
    this.props.handleNombresCompletos(namesComplete,"PACIENTE");
    this.props.handleActualizarPersona(person,"PACIENTE");
  }


  render() {
    const { onSubmit } = this.props;
    const { page, enlace} = this.state;
    
    return (
      
      <div>
      <button onClick={this.page1} >Datos Preliminares</button>
      <button onClick={this.page2} >Titular</button>
      <button onClick={this.page3} >Paciente</button>
      <button onClick={this.page4} >Otra Información</button>
      <button onClick={this.page5} >Titular y 2° Progenitor</button>
      <button onClick={this.page6} >Seguro y Cta. x Cobrar</button>
      <button onClick={this.page7} >Ventana de Asistencia</button>
      <button onClick={this.page8} >Finalizar proceso</button>
        {page === 1 && <AmbulatorioFormFirstPage patientService={this.props.patientService} pacientePerson={this.props.pacientePerson} onSubmit={this.nextPage} />}
        {page === 2 && (
        <div>
          <input type="text" value={this.props.titularId} onChange={this.props.changeTitularId}/>
          <button onClick={this.props.handleTitularID}>BUSCAR</button>
          <AmbulatorioFormSecondPage
            previousPage = {this.previousPage}
            onSubmit = {this.handleTitularSubmit}
            patientService={this.props.patientService} pacientePerson={this.props.pacientePerson}
            guardado = {this.props.titularGuardado}
            errorT = {this.props.titularError}
            errores = {this.props.titularErrores}
          />
          </div>
        )}
        {page === 3 && (
        <div>
        <input type="text" value={this.props.pacienteId} onChange={this.props.changepacienteId}/>
          <button onClick={this.props.handlepacienteId}>BUSCAR</button>
          <AmbulatorioFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.handlePacienteSubmit}
            guardado = {this.props.pacienteGuardado}
            patientService={this.props.patientService} pacientePerson={this.props.pacientePerson}
            errorT = {this.props.pacienteError}
            errores = {this.props.PacienteErrores}
          />
          </div>
        )}
        {page === 4 && (
          <AmbulatorioFormFourthPage
            previousPage={this.previousPage}
            onSubmit={this.handleNamesSubmit}
            PacienteNombre = {this.props.PacienteNombre}
            pacienteCI = {this.props.pacienteCI}
            TitularNombre = {this.props.TitularNombre}
            titularCI = {this.props.titularCI}
            guardado = {this.props.nombresGuardado}
          />
        )}
        {page === 5 && (
        <div>
          <AmbulatorioFormFifthPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
            PacienteNombre = {this.props.PacienteNombre}
            pacienteCI = {this.props.pacienteCI}
            TitularNombre = {this.props.TitularNombre}
            titularCI = {this.props.titularCI}
          />
          </div>
        )}
        {page === 6 && (
          <AmbulatorioFormSixthPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
            PacienteNombre = {this.props.PacienteNombre}
            pacienteCI = {this.props.pacienteCI}
            TitularNombre = {this.props.TitularNombre}
            titularCI = {this.props.titularCI}
          />
        )}
        {page === 7 && (
          <VentanaForm
            previousPage={this.previousPage}
            onSubmit={onSubmit}
            PacienteNombre = {this.props.PacienteNombre}
            pacienteCI = {this.props.pacienteCI}
            TitularNombre = {this.props.TitularNombre}
            titularCI = {this.props.titularCI}
          />
        )}
        {page === 8 && (
          <div>
                    <h1>Ambulatorio</h1>
                    
                   <h2>Nuevos identificadores del Paciente:</h2>
                   <h5 >Por favor, copie los siguientes códigos uno a uno</h5>
                   <ul>
                        <li>{this.props.pacienteCI}</li>
                        <li>{this.props.patientService}</li>
                   </ul>
                   <h5 >Por favor, en el formulario de abajo; pegue uno a uno los códigos que copió en los recuadros con nombre PatientID, clic en Continue, seleccione el rectángulo de datos del paciente de la izquierda y clic en Yes, continue. Es importante que al pegar los códigos no repita en los 2 recuadros un mismo código</h5>
                   <label>Dé clic cuando ya haya hecho los pasos anteriores</label><button onClick={this.handleClickContinuar}>CONTINUAR</button>
                   <OpenMRSView url={enlace} esilos={this.estilos}/>
            </div>
        )}
         
      </div>
    );
  }
}

AmbulatorioForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AmbulatorioForm;