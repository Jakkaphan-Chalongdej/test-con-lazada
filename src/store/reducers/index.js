import { combineReducers } from "redux";
import product from "./reducersProducts";
import message from "./message";
export default combineReducers({
  product,
  message,
});
