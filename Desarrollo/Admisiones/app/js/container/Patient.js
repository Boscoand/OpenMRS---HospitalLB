// import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Paciente from "../components/Paciente"
// actions
import * as PatientActions from "../actions/patient"


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, PatientActions), dispatch)
}

const mapStateToProps = state => Object.assign({}, state, {
    pacienteCI:state.pacienteCI,
    pacienteOPENMRSID:state.pacienteOPENMRSID,
    pacientePerson : state.pacientePerson
  
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Paciente))
