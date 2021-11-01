import * as types from "../types/errorTypes";

export const setError = (error) => ({
  type: types.REQUEST_FAILED,
  payload: error.message,
});
