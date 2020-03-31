import { createStore, combineReducers, applyMiddleware } from "redux";
import interestReducer from "./reducers/addInterest";
import levelReducer from "./reducers/addLevel";
import mentorReducer from "./reducers/selectMentor";
import userReducer from "./reducers/user";
import thunk from "redux-thunk";

// handle resetting the state when user logs out

const appReducer = combineReducers({
  interests: interestReducer,
  level: levelReducer,
  mentorName: mentorReducer,
  user: userReducer
});

const rootReducer = (state, action) => {
  if (action.type == "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
