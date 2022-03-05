import { TokensType } from "../../types";

export const SET_CREDENTIALS = "SET_CREDENTIALS";
export const RESET_CREDENTIALS = "RESET_CREDENTIALS";

export const setCredentialsAction = (tokens: TokensType) => ({
  type: SET_CREDENTIALS,
  payload: tokens,
});

export const resetCredentialsAction = () => ({
  type: RESET_CREDENTIALS,
});
