// import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import AmbulatorioInicio from "../components/AmbulatorioInicio"
// actions
import * as SeguroActions from "../actions/seguro"
import * as PatientActions from "../actions/patient"


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, PatientActions,SeguroActions), dispatch)
}

const mapStateToProps = state => Object.assign({}, state, {
  seguro: state.seguro,
  lugar : state.lugar,
  provider : state.provider
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AmbulatorioInicio))
