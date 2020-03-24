import { createStore, combineReducers } from "redux";
import interestReducer from "./reducers/addInterest";
import levelReducer from "./reducers/addLevel";
import mentorReducer from "./reducers/selectMentor";
const rootReducer = combineReducers({
  interests: interestReducer,
  level: levelReducer,
  mentorName: mentorReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
