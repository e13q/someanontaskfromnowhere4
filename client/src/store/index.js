 import { userApi } from "../services/AuthService";
 import userReducer from './authSlice'

import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [userReducer.name]: userReducer.reducer,
  [userApi.reducerPath]:userApi.reducer
})
export const setupStore = () => {
  return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(userApi.middleware),
     devTools: true
    })
}