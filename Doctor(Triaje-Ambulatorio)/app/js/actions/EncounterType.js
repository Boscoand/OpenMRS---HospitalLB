import apiCall from "../utilities/apiHelper"
import { ENCOUNTER_TYPE_UUID } from "../utilities/constants"

export const FETCH_ENCOUNTER_TYPE = "FETCH_ENCOUNTER_TYPE"
export const RECEIVED_ENCOUNTER_TYPE = "RECEIVED_ENCOUNTER_TYPE"

export function receivedEncounterType(encounterType = {}) {
  return {
    type: RECEIVED_ENCOUNTER_TYPE,
    payload: encounterType,
  }
}
export function fetchEncounterType() {
  return (dispatch) => {
    try {
      apiCall(null, "get", `encountertype/${ENCOUNTER_TYPE_UUID}`).then((result) => {
        dispatch(receivedEncounterType(result))
      }, (error) => {
        console.error("Something happened...", error)
      })
    } catch (e) {
      console.error("Something weird happened in EncounterType.js...", e)
    }
  }
}
