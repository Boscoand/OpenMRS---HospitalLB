import apiCall from "../utilities/apiHelper"

export const FETCH_FORM = "FETCH_FORM"
export const RECEIVED_FORM = "RECEIVED_FORM"

export function receivedForm(form = {}) {
  return {
    type: RECEIVED_FORM,
    payload: form,
  }
}

export function fetchForm() {
  const formType = "vital"
  return (dispatch) => {
    try {
      apiCall(null, "get", `form/?q=${formType}&limit=1`).then((result) => {
        dispatch(receivedForm(result.results[0]))
      }, (error) => {
        console.error("Something happened...", error)
      })
    } catch (e) {
      console.error("Something weird happened in fetching forms in forms.js...", e)
    }
  }
}
