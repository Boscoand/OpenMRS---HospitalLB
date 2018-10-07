import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Vitals from "../components/Vitals"
import * as obsActions from "../actions/Obs"
import * as VisitActions from "../actions/Visits"
import * as sidebarActions from "../actions/sidebar"
import * as sessionActions from "../actions/Session"
import * as encounterTypeActions from "../actions/EncounterType"

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, obsActions, VisitActions, sidebarActions, sessionActions, encounterTypeActions), dispatch)
}

const mapStateToProps = state => Object.assign({}, state, {
  visitSelected: state.visitSelected,
  location: state.location,
  obs: state.obs,
  sidebarOption: state.sidebarOption,
  form: state.form,
  errors: state.errors,
  session: state.session,
  encounterType: state.encounterType,
  fetching_obs: state.fetching_obs,
})

export default connect(mapStateToProps, mapDispatchToProps)(Vitals)
