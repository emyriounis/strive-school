import { UPDATE_JOBS } from "../actions";
import { initialState } from "../store";

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_JOBS:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};



export default jobsReducer;
