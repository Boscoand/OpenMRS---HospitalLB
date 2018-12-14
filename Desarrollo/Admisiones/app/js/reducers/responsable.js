import { RECEIVED_RESCI } from "../actions/responsable"


function responsableCI(state = "", action) {
  switch (action.type) {
    
    case RECEIVED_RESCI: {
      return action.payload
    }
    default:
      return state
  }
}

export { responsableCI }