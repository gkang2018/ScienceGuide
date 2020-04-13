import { ENGLISH_SPEAKER } from "../actions/types";

const initialState = {
  englishSpeaker: null
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENGLISH_SPEAKER:
      return {
        ...state,
        englishSpeaker: action.data.speaksEnglish
      };
    default:
      return state;
  }
};

export default languageReducer;
