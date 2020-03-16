import { ADD_LEVEL } from "../actions/types";

const initialState = {
  level: ""
};

const levelReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LEVEL:
      return {
        ...state,
        level: action.data.level
      };
    default:
      return {
        state
      };
  }
};

export default levelReducer;
