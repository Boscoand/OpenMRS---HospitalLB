export const RECEIVED_SEGURO = "RECEIVED_SEGURO";
export const RECEIVED_SESSION_PROVIDER = "RECEIVED_SESSION_PROVIDER";
export const RECEIVED_SESSION_LOCATION = "RECEIVED_SESSION_LOCATION";

export function saveSeguro(state = ""){
  return {
    type: RECEIVED_SEGURO,
    payload: state,
  };
}

export function saveSessionLocation(state = ""){
  return {
    type: RECEIVED_SESSION_LOCATION,
    payload: state,
  };
}

export function saveSessionProvider(state = ""){
  return {
    type: RECEIVED_SESSION_PROVIDER,
    payload: state,
  };
}
