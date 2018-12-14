export const RECEIVED_CI = "RECEIVED_CI"
export const RECEIVED_OPENMRSID ="RECEIVED_OPENMRSID"
export const RECEIVED_OPENMRSPERSON ="RECEIVED_OPENMRSPERSON"
export function savePatientCI(state = ""){
  return {
    type: RECEIVED_CI,
    payload: state,
  }
}

export function savePatientOpenMRSID(state = ""){
  return {
    type: RECEIVED_OPENMRSID,
    payload: state,
  }
}
export function savePatientPerson(state = {}){
  return {
    type: RECEIVED_OPENMRSPERSON,
    payload: state,
  }
}
