import apiCall from "../utilities/apiHelper"

export const FETCH_PROVIDER = "FETCH_PROVIDER"
export const RECEIVED_PROVIDER = "RECEIVED_PROVIDER"

export function receivedProvider(provider = {}) {
  return {
    type: RECEIVED_PROVIDER,
    payload: provider,
  }
}

export function fetchProvider(userUUID) {
  return (dispatch) => {
    try {
      apiCall(null, "get", `provider/?user=${userUUID}`).then((result) => {
        console.info("resu;tado: ", result)
        dispatch(receivedProvider(result.results[0]))
      }, (error) => {
        console.error("Something happened...", error)
      })
    } catch (e) {
      console.error("Something weird happened in Provider.js...", e)
    }
  }
}
