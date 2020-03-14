import { ADD_INTEREST, TOGGLE_INTEREST } from "../actions/types";

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
          id: action.data.id,
          interest: action.data.interest,
          completed: false
        })
      };
    case TOGGLE_INTEREST:
      return {
        ...state,
        selectedInterests: [
          ...state.selectedInterests,
          (state.selectedInterests.find(
            a => a.id == action.data.id
          ).completed = !state.selectedInterests[action.data.id].completed)
        ]
      };
    default:
      return state;
  }
};

export default interestReducer;
