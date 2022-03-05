import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { StoreType } from "../types/index";
import activeReducer from "./reducers/activeReducer";
import credentialsReducer from "./reducers/credentialsReducer";
import newMessageReducer from "./reducers/newMessageReducer";
import registeredReducer from "./reducers/registeredReducer";

const composeThatAlwaysWorks =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState: StoreType = {
  credentials: JSON.parse(
    localStorage.getItem("whatsapp") ||
      JSON.stringify({
        accessToken: "",
        refreshToken: "",
      })
  ),
  registered: true,
  active: null,
  newMessage: [],
};

const bigReducer = combineReducers({
  credentials: credentialsReducer,
  registered: registeredReducer,
  active: activeReducer,
  newMessage: newMessageReducer,
});

const configureStore = createStore(
  bigReducer,
  initialState,
  composeThatAlwaysWorks(applyMiddleware(thunk))
);

export default configureStore;
