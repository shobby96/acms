import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import { notificationsReducer } from "./Reducers/NotificationsReducer";
import { organizationsReducer } from "./Reducers/OrganizationsReducer";
import { requestsReducer } from "./Reducers/RequestsReducer";

import { signInReducer } from "./Reducers/SigninReducer";
import { signUpReducer } from "./Reducers/SignupReducer";
import { rootSaga } from "./Sagas/saga";
const sagaMiddleWare = createSagaMiddleWare();

const saveToLocalStorage = (state) => {
  try {
    let { notifications, ...filteredState } = state;
    localStorage.setItem("acmsstate", JSON.stringify(filteredState));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("acmsstate");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const reducers = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  organizations: organizationsReducer,
  requests: requestsReducer,
  notifications: notificationsReducer,
});

const appReducers = (state, action) => reducers(state, action);

const rootReducer = (state, action) => {
  if (action.type === "SIGNOUT") {
    localStorage.removeItem("acmsstate");
    return appReducers(undefined, action);
  }
  return appReducers(state, action);
};

const middlewareEnhancer = applyMiddleware(sagaMiddleWare);
const composedEnhancers = compose(
  middlewareEnhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// let store = createStore(rootReducer, composedEnhancers);

const persistedStore = loadFromLocalStorage();

const store = createStore(rootReducer, persistedStore, composedEnhancers);
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

sagaMiddleWare.run(rootSaga);
export default store;
