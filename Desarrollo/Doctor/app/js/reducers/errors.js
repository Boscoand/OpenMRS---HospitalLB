import { ERROR_FETCHING_OBS, SUCCESS_FETCHING_OBS } from "../actions/Errors"

function errors(state = {}, action) {
  switch (action.type) {
    case ERROR_FETCHING_OBS: {
      return Object.assign({}, state, { obs: true })
    }
    case SUCCESS_FETCHING_OBS: {
      return Object.assign({}, state, { obs: false })
    }
    default:
      return state
  }
}

export { errors }
