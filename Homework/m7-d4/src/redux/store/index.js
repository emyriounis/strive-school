import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import jobsReducer from "../reducers/jobsReducer.js";
import favComReducer from "../reducers/favComReducer.js";
import thunk from "redux-thunk";

const composeThatAlwaysWorks =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  favCom: {
    companies: [],
  },
  jobs: {
    data: [],
  },
};

const bigReducer = combineReducers({
  favCom: favComReducer,
  jobs: jobsReducer,
});

const configureStore = createStore(
  bigReducer,
  initialState,
  composeThatAlwaysWorks(applyMiddleware(thunk))
);

export default configureStore;
