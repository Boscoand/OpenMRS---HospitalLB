import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import { pacienteCI, pacienteOPENMRSID, pacientePerson } from "./patient";
import { responsableCI } from "./responsable";
import { seguro, location, provider } from "./seguro";
import { reducer as reduxFormReducer } from 'redux-form';


const rootReducer = combineReducers({
  routing: router,
  pacienteCI: pacienteCI,
  pacienteOPENMRSID: pacienteOPENMRSID,
  responsableCI: responsableCI,
  seguro: seguro,
  form: reduxFormReducer,
  pacientePerson : pacientePerson,
  provider:provider,
  lugar: location
});

export default rootReducer;
