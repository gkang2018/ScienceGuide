import { ADD_INTEREST, TOGGLE_INTEREST } from "./types";

export const addInterest = (interest, id) => ({
  type: ADD_INTEREST,
  data: { id, interest }
});

export const toggleInterest = (interest, id) => ({
  type: TOGGLE_INTEREST,
  data: { id, interest }
});
