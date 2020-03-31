import { SIGNUP, LOGIN, LOGOUT, UPDATE_USER } from "../actions/types";

const initialState = {
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return action.data;
    case LOGIN:
      return action.data;
    case UPDATE_USER:
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
