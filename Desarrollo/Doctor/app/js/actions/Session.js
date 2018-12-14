import apiCall from "../utilities/apiHelper"
import { fetchProvider } from "./Provider"

export const FETCH_SESSION = "FETCH_SESSION"
export const RECEIVED_SESSION = "RECEIVED_SESSION"
export const DELETE_SESSION = "DELETE_SESSION"

export function receivedSession(session = {}) {
  return {
    type: RECEIVED_SESSION,
    payload: session,
  }
}

export function deleteSession(session = {}) {
    try {
      apiCall(null, "delete", "session/").then((result) => {
        const addresses = document.location.href.split("/")
        window.open(`${addresses[0]}/${addresses[1]}/${addresses[2]}/${addresses[3]}`)
      }, (error) => {
        console.error("Something happened...", error)
      })
    } catch (e) {
      console.error("Something weird happened in Session.js...", e)
    }
  return {
    type: DELETE_SESSION,
    payload: session,
  }
}

export function fetchSession() {
  return (dispatch) => {
    try {
      apiCall(null, "get", "session/").then((result) => {
        dispatch(receivedSession(result))
        dispatch(fetchProvider(result.user.uuid))
      }, (error) => {
        console.error("Something happened...", error)
      })
    } catch (e) {
      console.error("Something weird happened in Session.js...", e)
    }
  }
}
