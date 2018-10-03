import { RECEIVED_LOCATION } from "../actions/Location"

function location(state = {}, action) {
  switch (action.type) {
    case RECEIVED_LOCATION: {
      return action.payload
    }
    default:
      return state
  }
}

export { location }
