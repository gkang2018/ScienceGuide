import { ADD_INTEREST } from "../actions/types";

const initialState = {
  selectedInterests: []
};

const interestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INTEREST:
      // spread operator (...) makes it so that we don't change the entire state
      return {
        ...state,
        // selectedInterests: [
        //   ...state.selectedInterests,
        //   { id: Math.random().toString(), interest: action.data }
        // ]
        selectedInterests: state.selectedInterests.concat({
          id: Math.random().toString(),
          interest: action.data
        })
      };
    default:
      return state;
  }
};

export default interestReducer;
