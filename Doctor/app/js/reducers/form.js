import { RECEIVED_FORM } from "../actions/Form"

function form(state = {}, action) {
  switch (action.type) {
    case RECEIVED_FORM: {
      return action.payload
    }
    default:
      return state
  }
}

export { form }
