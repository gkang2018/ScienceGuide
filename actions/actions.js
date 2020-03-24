import {
  ADD_INTEREST,
  TOGGLE_INTEREST,
  DELETE_INTEREST,
  ADD_LEVEL,
  SELECT_MENTOR
} from "./types";

export const addInterest = (interest, id) => ({
  type: ADD_INTEREST,
  data: { id, interest }
});

export const toggleInterest = (interest, id) => ({
  type: TOGGLE_INTEREST,
  data: { id, interest }
});

export const deleteInterest = (interest, id) => ({
  type: DELETE_INTEREST,
  data: { id, interest }
});

export const addLevel = level => ({
  type: ADD_LEVEL,
  data: { level }
});

export const selectMentor = mentor => ({
  type: SELECT_MENTOR,
  data: { mentor }
});
