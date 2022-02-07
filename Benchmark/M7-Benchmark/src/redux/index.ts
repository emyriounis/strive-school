import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { StoreType } from "../types/index";
import locationsReducer from "./reducers/locationReducer";

const composeThatAlwaysWorks =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState: StoreType = {
  location: {
    active: {
      name: "London",
      lat: 51.5073219,
      lon: -0.1276474,
      country: "GB",
      state: "England",
    },
    favs: [],
  },
};

const bigReducer = combineReducers({
  location: locationsReducer,
});

const configureStore = createStore(
  bigReducer,
  initialState,
  composeThatAlwaysWorks(applyMiddleware(thunk))
);

export default configureStore;
