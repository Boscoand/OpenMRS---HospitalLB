import { TOGGLE_SIDEBAR, CHANGE_SIDEBAR_OPTION } from "../actions/sidebar"

function sidebar(state = false, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      if (state === true) {
        document.getElementById("sideBar").style.width = "0"
      } else {
        document.getElementById("sideBar").style.width = "300px"
      }
      return !state
    }
    default:
      return state
  }
}

function sidebarOption(state = 1, action) {
  switch (action.type) {
    case CHANGE_SIDEBAR_OPTION: {
      return action.payload
    }
    default:
      return state
  }
}

export { sidebar, sidebarOption }
