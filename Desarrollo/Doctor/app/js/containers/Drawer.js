import Drawer from "../components/Drawer"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as sidebarActions from "../actions/sidebar"

function mapDispatchToProps(dispatch) {
  return bindActionCreators(sidebarActions, dispatch)
}

const mapStateToProps = state => Object.assign({}, state, {
  sidebar: state.sidebar,
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
