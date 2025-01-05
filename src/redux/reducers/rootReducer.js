import { combineReducers } from "redux";
import { authReducer } from "../auth/authReducer";
import registrationReducer from "../registration/registrationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  registration: registrationReducer,
});

export default rootReducer;
