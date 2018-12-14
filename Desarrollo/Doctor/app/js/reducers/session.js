import { FETCH_SESSION, RECEIVED_SESSION } from "../actions/Session"

function session(state = {}, action) {
  switch (action.type) {
    case FETCH_SESSION: {
      return state
    }
    case RECEIVED_SESSION: {
      return action.payload
    }
    default:
      return state
  }
}

export { session }
