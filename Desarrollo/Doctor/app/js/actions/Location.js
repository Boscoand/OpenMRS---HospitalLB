import apiCall from "../utilities/apiHelper"

export const FETCH_LOCATION = "FETCH_LOCATION"
export const RECEIVED_LOCATION = "RECEIVED_LOCATION"

export function receivedLocation(location = {}) {
  return {
    type: RECEIVED_LOCATION,
    payload: location,
  }
}

export function fetchLocation(visitSelected = {}) {
  return (dispatch) => {
    try {
      apiCall(null, "get", `location/${visitSelected.location.uuid}?v=ref`).then((result) => {
        dispatch(receivedLocation(result))
      }, (error) => {
        console.error("Something happened...", error)
      })
    } catch (e) {
      console.error("Something weird happened in fetching locations in Location.js...", e)
    }
  }
}
