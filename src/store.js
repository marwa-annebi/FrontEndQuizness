import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { companySettingsReducer } from "./reducers/quizmasterReducer";

const reducer = combineReducers({
  companySettings: companySettingsReducer,
});
const companyInfoStorage = localStorage.getItem("companyInfo")
  ? JSON.parse(localStorage.getItem("companyInfo"))
  : null;
const initialState = { companySettings: { companyInfo: companyInfoStorage } };
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
