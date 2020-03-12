import { createStore, combineReducers } from "redux";
import interestReducers from "./reducers/addInterest";
import interestReducer from "./reducers/addInterest";

const rootReducer = combineReducers({
  interests: interestReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
