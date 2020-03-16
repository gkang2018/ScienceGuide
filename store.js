import { createStore, combineReducers } from "redux";
import interestReducer from "./reducers/addInterest";

const rootReducer = combineReducers({
  interests: interestReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
