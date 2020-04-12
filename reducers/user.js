import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return action.data;
    case LOGIN:
      return action.data;
    case UPDATE_USER:
      return action.data;
    case UPDATE_PROFILE:
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
