import Menu from "../components/Menu"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as sidebarActions from "../actions/sidebar"
import * as sessionActions from "../actions/Session"

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, sidebarActions, sessionActions), dispatch)
}

const mapStateToProps = state => Object.assign({}, state, {
  sidebar: state.sidebar,
  sidebarOption: state.sidebarOption,
  session: state.session,
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
