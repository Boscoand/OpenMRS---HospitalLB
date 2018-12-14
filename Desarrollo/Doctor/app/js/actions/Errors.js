export const ERROR_FETCHING_OBS = "ERROR_FETCHING_OBS"
export const SUCCESS_FETCHING_OBS = "SUCCESS_FETCHING_OBS"

export function errorFetchingObs() {
  return {
    type: ERROR_FETCHING_OBS,
    payload: { obs: true },
  }
}

export function successFetchingObs() {
  return {
    type: SUCCESS_FETCHING_OBS,
    payload: { obs: false },
  }
}
