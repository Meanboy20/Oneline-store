import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { productReducer, reducer } from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userReducer: reducer,
  productReducer: productReducer,
});

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
