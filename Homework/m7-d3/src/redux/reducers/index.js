import { ADD_COMPANY, REMOVE_COMPANY } from "../actions";
import { initialState } from "../store";

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state,
        favCom: state.favCom.includes(action.payload)
          ? state.favCom
          : [...state.favCom, action.payload],
      };
    case REMOVE_COMPANY:
      return {
        ...state,
        favCom: state.favCom.filter((com) => com !== action.payload),
      };

    default:
      return state;
  }
};

export default mainReducer;
