import { ADD_INTEREST } from "./types";

export const addInterest = interest => ({
  type: ADD_INTEREST,
  data: interest
});
