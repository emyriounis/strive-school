import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import jobsReducer from "../reducers/jobsReducer.js";
import favComReducer from "../reducers/favComReducer.js";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//  import { encryptTransform } from "redux-persist-transform-encrypt";

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

const persistConfig = {
  key: "root",
  storage,
  //  transforms: [
  //    encryptTransform({
  //      secretKey: process.env.REACT_APP_SECRET_KEY, // this is mandatory
  //      onError: (error) => {
  //        // this is optional
  //        console.log("encryption error", Error);
  //      },
  //    }),
  //  ],
};
const persistedReducer = persistReducer(persistConfig, bigReducer);

const configureStore = createStore(
  persistedReducer,
  initialState,
  composeThatAlwaysWorks(applyMiddleware(thunk))
);

export const persistor = persistStore(configureStore);

export default configureStore;
