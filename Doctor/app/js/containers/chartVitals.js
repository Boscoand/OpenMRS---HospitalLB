// import React, { Component } from 'react';
import { bindActionCreators } from "redux"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import * as obs from "../actions/Obs"
import ChartVitals from "../components/chartVitals"

function mapDispatchToProps(dispatch) {
  return bindActionCreators(obs, dispatch)
}

const mapStateToProps = state => Object.assign({}, state, {
  obs: state.obs,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChartVitals))
