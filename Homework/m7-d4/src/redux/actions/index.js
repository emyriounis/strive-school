export const ADD_COMPANY = "ADD_COMPANY";
export const REMOVE_COMPANY = "REMOVE_COMPANY";
export const UPDATE_JOBS = "UPDATE_JOBS ";

export const addCompanyAction = (company) => ({
  type: ADD_COMPANY,
  payload: company,
});

export const removeCompanyAction = (company) => ({
  type: REMOVE_COMPANY,
  payload: company,
});

export const getJobsActions = (url) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const { data } = await resp.json();
        dispatch({
          type: UPDATE_JOBS,
          payload: data,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
