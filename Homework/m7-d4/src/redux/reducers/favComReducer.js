import { ADD_COMPANY, REMOVE_COMPANY } from "../actions";
import { initialState } from "../store";

const favComReducer = (state = initialState.favCom, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state,
        companies: state.companies.includes(action.payload)
          ? state.companies
          : [...state.companies, action.payload],
      };
    case REMOVE_COMPANY:
      return {
        ...state,
        companies: state.companies.includes(action.payload)
          ? state.companies.filter((com) => com !== action.payload)
          : state.companies,
      };

    default:
      return state;
  }
};

export default favComReducer;
