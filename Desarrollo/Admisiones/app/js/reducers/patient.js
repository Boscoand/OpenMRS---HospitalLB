import { RECEIVED_CI, RECEIVED_OPENMRSID,RECEIVED_OPENMRSPERSON } from "../actions/patient"


function pacienteCI(state = "", action) {
  switch (action.type) {
    
    case RECEIVED_CI: {
      return action.payload
    }
    
    default:
      return state
  }
}



function pacienteOPENMRSID(state = "", action) {
  switch (action.type) {
    
    case RECEIVED_OPENMRSID: {
      return action.payload
    }
    
    default:
      return state
  }
}


function pacientePerson(state = {}, action) {
  switch (action.type) {
    
    case RECEIVED_OPENMRSPERSON: {
      return action.payload
    }
    
    default:
      return state
  }
}




export { pacienteCI, pacienteOPENMRSID, pacientePerson }