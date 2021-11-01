import * as types from "../types/errorTypes";

const initialState = {
  status: false,
  message: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_FAILED:
      return {
        status: true,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default errorReducer;
