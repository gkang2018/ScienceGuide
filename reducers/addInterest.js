import {
  ADD_INTEREST,
  TOGGLE_INTEREST,
  DELETE_INTEREST
} from "../actions/types";

const initialState = {
  selectedInterests: []
};

const interestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INTEREST:
      // spread operator (...) makes it so that we don't change the entire state
      return {
        ...state,
        selectedInterests: state.selectedInterests.concat({
          id: action.data.id,
          interest: action.data.interest,
          completed: true
        })
      };
    case TOGGLE_INTEREST:
      state.selectedInterests.forEach((interest, index) => {
        if (index === action.data.id) {
          state.selectedInterests[index].completed = !state.selectedInterests[
            index
          ].completed;
        }
      });

      return {
        ...state,
        selectedInterests: state.selectedInterests
      };
    case DELETE_INTEREST:
      let vals = state.selectedInterests.filter(
        (completed, id, interest) => id !== action.data.id
      );
      return {
        ...state,
        selectedInterests: vals
      };
    default:
      return state;
  }
};

export default interestReducer;
