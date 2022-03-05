import { NewMessagenType } from "../../types";
import { RESET_NEW_MESSAGE, SET_NEW_MESSAGE } from "../actions/newMessage";
import { initialState } from "../index";

const newMessageReducer = (
  state = initialState.newMessage,
  action: NewMessagenType
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_NEW_MESSAGE:
      return [...state, payload];
    case RESET_NEW_MESSAGE:
      return state.filter((_id) => _id !== payload) || [];

    default:
      return state;
  }
};

export default newMessageReducer;
