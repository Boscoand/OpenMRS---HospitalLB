import { FETCH_ENCOUNTER_TYPE, RECEIVED_ENCOUNTER_TYPE } from "../actions/EncounterType"

function encounterType(state = {}, action) {
  switch (action.type) {
    case FETCH_ENCOUNTER_TYPE: {
      return state
    }
    case RECEIVED_ENCOUNTER_TYPE: {
      return action.payload
    }
    default:
      return state
  }
}

export { encounterType }
