import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productReducer, reducer } from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userReducer: reducer,
  productReducer: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
