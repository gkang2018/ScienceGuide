import { SELECT_MENTOR } from "../actions/types";

const initialState = {
  mentor: ""
};

const mentorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MENTOR:
      return {
        ...state,
        mentor: action.data.mentor,
        id: action.data.id
      };
    default:
      return state;
  }
};

export default mentorReducer;
