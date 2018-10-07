import { FETCH_OBS, FETCHING_OBS, RECEIVED_OBS } from "../actions/Obs"

function fetching_obs(state = false, action) {
  switch (action.type) {
    case FETCHING_OBS: {
      return action.payload
    }
    default:
      return state
  }
}
function obs(state = [], action) {
  switch (action.type) {
    case FETCH_OBS: {
      return state
    }
    case RECEIVED_OBS: {
      return action.payload
    }
    default:
      return state
  }
}

export { obs, fetching_obs }
