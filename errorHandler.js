const errorHandler = (error, type) => {
  switch (type) {
    case "Login":
      console.log(error.message);
      if (
        error.message ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        // will return the corresponding error from the localization
        return "snackbar.invalidLogin";
      } else if (
        error.message ===
        "The password is invalid or the user does not have a password."
      ) {
        return "snackbar.invalidLogin";
      } else if (
        error.message ===
        "Too many unsuccessful login attempts. Please try again later."
      ) {
        return "snackbar.tooManyLogin";
      } else {
        return "snackbar.errorLoginGeneral";
      }
    case "Signup":
      if (
        error.message ===
        "The email address is already in use by another account."
      ) {
        return "snackbar.duplicateEmailSignup";
      } else {
        return "snackbar.errorSignupGeneral";
      }
    case "changePassword":
      console.log(error.message);
      if (
        error.message ===
        "The password is invalid or the user does not have a password."
      ) {
        return "snackbar.invalidPasswordChange";
      } else if (
        error.message ===
        "You must select a password that you haven't used before"
      ) {
        return "snackbar.duplicatePasswordChange";
      } else {
        return "snackbar.errorUpdatedPassword";
      }
  }
};

export default errorHandler;
