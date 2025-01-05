import { combineReducers } from "redux";
import { authReducer } from "../auth/authReducer";
import { searchReducer } from "../search/searchReducer";
import { registrationSlice } from "../registration/registrationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  registration: registrationSlice.reducer,
});

export default rootReducer;
