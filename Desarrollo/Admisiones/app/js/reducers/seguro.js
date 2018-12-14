import { RECEIVED_SEGURO, RECEIVED_SESSION_PROVIDER,RECEIVED_SESSION_LOCATION } from "../actions/seguro";


function seguro(state = "", action) {
  switch (action.type) {
    
    case RECEIVED_SEGURO: {
      return action.payload;
    }
    default:
      return state;
  }
}

function location(state = "", action) {
  switch (action.type) {
    
    case RECEIVED_SESSION_LOCATION: {
      return action.payload;
    }
    default:
      return state;
  }
}

function provider(state = "", action) {
  switch (action.type) {
    
    case RECEIVED_SESSION_PROVIDER: {
      return action.payload;
    }
    
    default:
      return state;
  }
}

export { seguro, location,provider };