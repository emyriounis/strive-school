export const ADD_COMPANY = "ADD_COMPANY";
export const REMOVE_COMPANY = "REMOVE_COMPANY";

export const addCompanyAction = (company) => ({
  type: ADD_COMPANY,
  payload: company,
});

export const removeCompanyAction = (company) => ({
  type: REMOVE_COMPANY,
  payload: company,
});
