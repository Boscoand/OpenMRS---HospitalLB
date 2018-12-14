import { FETCH_ACTIVE_PATIENTS } from "../actions/Patients"
import apiCall from "../utilities/apiHelper"

function patients(state = [], action) {
  switch (action.type) {
    case FETCH_ACTIVE_PATIENTS:
      console.info("Fetching users")
      return state
    default:
      return state
  }
}
