// import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import AmbulatorioP from "../components/Ambulatotio/Ambulatorio"
// actions
import * as ResponsableActions from "../actions/responsable"


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ResponsableActions), dispatch);
}

const mapStateToProps = state => Object.assign({}, state, {
    pacienteCI:state.pacienteCI,
    responsableCI: state.responsableCI,
    provider: state.provider,
    location: state.lugar
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AmbulatorioP));
