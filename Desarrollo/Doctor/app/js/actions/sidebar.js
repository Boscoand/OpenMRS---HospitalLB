export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR"
export const CHANGE_SIDEBAR_OPTION = "CHANGE_SIDEBAR_OPTION"

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
    payload: {},
  }
}


/*
  option: @number
*/
export function changeSidebarOption(option) {
  return {
    type: CHANGE_SIDEBAR_OPTION,
    payload: option,
  }
}
