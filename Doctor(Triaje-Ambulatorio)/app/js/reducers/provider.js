import { FETCH_PROVIDER, RECEIVED_PROVIDER } from "../actions/Provider"

function provider(state = {}, action) {
  switch (action.type) {
    case FETCH_PROVIDER: {
      return state
    }
    case RECEIVED_PROVIDER: {
      return action.payload
    }
    default:
      return state
  }
}

export { provider }
