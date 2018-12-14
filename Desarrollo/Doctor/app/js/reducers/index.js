import { combineReducers } from "redux"
import { routerReducer as router } from "react-router-redux"
import { patients } from "./patients"
import { visits, visitSelected } from "./visits"
import { sidebar, sidebarOption } from "./sidebar"
import { obs, fetching_obs } from "./obs"
import { location } from "./location"
import { form } from "./form"
import { session } from "./session"
import { encounterType } from "./encounterType"
import { provider } from "./provider"
import { errors } from "./errors"

const rootReducer = combineReducers({
  routing: router,
  visitSelected,
  patients,
  visits,
  sidebar,
  sidebarOption,
  obs,
  location,
  form,
  session,
  encounterType,
  provider,
  fetching_obs,
  errors,
})

export default rootReducer
