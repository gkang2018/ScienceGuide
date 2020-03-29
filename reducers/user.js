import { SIGNUP, LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return action.payload;
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
