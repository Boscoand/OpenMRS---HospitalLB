export const RECEIVED_RESCI = "RECEIVED_RESCI"
import { change as changeFieldValue } from 'redux-form';

export {changeFieldValue};

export function saveResponsableCI(state = ""){
  return {
    type: RECEIVED_RESCI,
    payload: state,
  }
}
