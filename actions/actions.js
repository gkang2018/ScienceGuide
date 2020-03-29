import {
  ADD_INTEREST,
  TOGGLE_INTEREST,
  DELETE_INTEREST,
  ADD_LEVEL,
  SELECT_MENTOR,
  LOGIN,
  SIGNUP,
  LOGOUT
} from "./types";

import DatabaseService from "../config/firebase";

const db = new DatabaseService();

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

export const signup = (
  email,
  password,
  name,
  researchLevel,
  researchAreas,
  mentorName
) => {
  return async (dispatch, getState) => {
    try {
      let resp = db.signUpUserWithEmail(
        email,
        password,
        name,
        researchLevel,
        researchAreas,
        mentorName
      );

      resp
        .then(val => {
          console.log(val);
          const user = {
            uid: val.user.uid,
            email: val.user.email
          };

          dispatch({ type: SIGNUP, payload: user });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (email, password) => {
  return (async = (dispatch, getState) => {
    console.log("login");
  });
};

export const logout = () => {
  return (async = (dispatch, getState) => {
    console.log("logout");
  });
};
