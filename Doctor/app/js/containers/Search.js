// import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Search from "../components/Search"
// actions
import * as VisitActions from "../actions/Visits"
import * as sidebarActions from "../actions/sidebar"
import * as locationActions from "../actions/Location"
import * as formActions from "../actions/Form"
import * as sessionActions from "../actions/Session"
import * as providerActions from "../actions/Provider"

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, VisitActions, sidebarActions, locationActions, formActions, sessionActions, providerActions ), dispatch)
}

const mapStateToProps = state => Object.assign({}, state, {
  visits: state.visits,
  visitSelected: state.visitSelected,
  location: state.location,
  form: state.form,
  session: state.session,
  provider: state.provider,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
