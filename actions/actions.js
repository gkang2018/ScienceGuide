import {
  ADD_INTEREST,
  DELETE_INTEREST,
  ADD_LEVEL,
  SELECT_MENTOR,
  LOGIN,
  SIGNUP,
  LOGOUT,
  UPDATE_USER
} from "./types";

import DatabaseService from "../config/firebase";

const db = new DatabaseService();

export const addInterest = interest => ({
  type: ADD_INTEREST,
  data: { interest }
});

export const deleteInterest = interest => ({
  type: DELETE_INTEREST,
  data: { interest }
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

          dispatch({ type: SIGNUP, data: user });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (email, password) => dispatch => {
  return new Promise((resolve, reject) => {
    let resp = db.signInUserWithEmail(email, password);
    resp
      .then(cred => {
        console.log(cred);
        const user = {
          uid: cred.user.uid,
          email: cred.user.email
        };
        dispatch({ type: LOGIN, data: user });
        resolve();
      })
      .catch(error => {
        console.log("here");
        reject(error);
      });
  });
};

export const update = user => ({
  type: UPDATE_USER,
  data: user
});

export const logout = () => {
  return async (dispatch, getState) => {
    let resp = db.signOutUser();
    resp
      .then(() => {
        console.log("successfully signed out");
        dispatch({ type: LOGOUT });
      })
      .catch(error => {
        console.log("Error signing out", error);
      });
  };
};
