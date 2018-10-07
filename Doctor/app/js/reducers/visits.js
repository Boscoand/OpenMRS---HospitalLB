import {
  FETCH_ACTIVE_VISITS,
  RECEIVED_ACTIVE_VISITS,
  CHANGE_SELECTED_VISIT } from "../actions/Visits"

function visits(state = [], action) {
  switch (action.type) {
    case FETCH_ACTIVE_VISITS: {
      return state
    }
    case RECEIVED_ACTIVE_VISITS: {
      return action.payload.results
    }
    default:
      return state
  }
}

function visitSelected(state = {}, action) {
  switch (action.type) {
    case CHANGE_SELECTED_VISIT: {
      return action.payload
    }
    default:
      return state
  }
}
export { visits, visitSelected }
