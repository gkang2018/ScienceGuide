import { ADD_INTEREST, DELETE_INTEREST } from "../actions/types";

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
    case DELETE_INTEREST:
      let vals = state.selectedInterests.filter(
        interest => interest.interest !== action.data.interest
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
