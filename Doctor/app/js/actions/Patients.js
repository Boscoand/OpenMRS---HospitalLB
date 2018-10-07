export const FETCH_ACTIVE_PATIENTS = "FETCH_ACTIVE_PATIENTS"

/**
 * Here we fetch the patients from the database
 * which have an active visit.
 *
 */
export function fetchPatients() {
  return {
    type: FETCH_ACTIVE_PATIENTS,
    payload: {},
  }
}
