import { createStore, combineReducers } from "redux";
import interestReducer from "./reducers/addInterest";
import levelReducer from "./reducers/addLevel";

const rootReducer = combineReducers({
  interests: interestReducer,
  level: levelReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
