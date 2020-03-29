import { createStore, combineReducers, applyMiddleware } from "redux";
import interestReducer from "./reducers/addInterest";
import levelReducer from "./reducers/addLevel";
import mentorReducer from "./reducers/selectMentor";
import userReducer from "./reducers/user";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  interests: interestReducer,
  level: levelReducer,
  mentorName: mentorReducer,
  user: userReducer
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
