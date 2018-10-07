import apiCall from "../utilities/apiHelper"
import { fetchObs } from "./Obs"
import { fetchLocation } from "./Location"
import { fetchForm } from "./Form"

export const FETCH_ACTIVE_VISITS = "FETCH_ACTIVE_VISITS"
export const EMPTY_ACTIVE_VISITS = "EMPTY_ACTIVE_VISITS"
export const ERROR_FETCHING_VISITS = "EMPTY_ACTIVE_VISITS"
export const RECEIVED_ACTIVE_VISITS = "RECEIVED_ACTIVE_VISITS"
export const CHANGE_SELECTED_VISIT = "CHANGE_SELECTED_VISIT"

export function changeSelectedVisit(visit) {
  return (dispatch) => {
    dispatch(fetchForm())
    dispatch(fetchLocation(visit))
    dispatch({
      type: CHANGE_SELECTED_VISIT,
      payload: visit,
    })
  }
}

export function updateVisitEncounters(visit) {
  let encounters = []
  return (dispatch) => {
    try {
      apiCall(null, "get", `visit/${visit.uuid}?v=full`)
      .then((result) => {
        dispatch(changeSelectedVisit(result))
        encounters = result.encounters
        dispatch(fetchObs(encounters))
      })
    } catch (e) {
      console.error("Something happened updating visit...", e)
    }
  }
}


export function receivedActiveVisits(visits) {
  return {
    type: RECEIVED_ACTIVE_VISITS,
    payload: visits,
  }
}

export function emptyActiveVisits() {
  return {
    type: RECEIVED_ACTIVE_VISITS,
    payload: [],
  }
}

export function fetchActiveVisits(input) {
  return (dispatch) => {
    try {
      apiCall(null, "get", "visit?v=default")
      .then((visits) => {
        if (visits.results && Array.isArray(visits.results) && visits.results.length > 0) {
          visits.results = visits.results.filter(visit => visit.stopDatetime == null)
          if (input) {
            visits.results = visits.results.filter(visit => (visit.patient.display.indexOf(input) !== -1 || visit.location.display.indexOf(input) !== -1 || visit.visitType.display.indexOf(input) !== -1))
          }
          console.info("Visitas: ", visits.results)
          dispatch(receivedActiveVisits(visits))
        } else {
          dispatch(receivedActiveVisits({ results: [] }))
        }
      })
    } catch (e) {
      console.error("Something weird happened...", e)
      dispatch(receivedActiveVisits({ results: [] }))
    }
  }
}
