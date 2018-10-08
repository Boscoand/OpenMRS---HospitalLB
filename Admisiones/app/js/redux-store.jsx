/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import {createStore, applyMiddleware,compose, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index'

const composeEnhancers =
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose
    
const enhancer = composeEnhancers(
applyMiddleware(
        thunkMiddleware,
        promiseMiddleware(),
),
)
export default function () {
  
  const initialState = {
    routing:"",
    seguro:"",
    pacienteCI:"",
    responsableCI:"",
    pacienteOPENMRSID:"",
    provider:"",
    lugar:"",
    pacientePerson:{}
  };
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}