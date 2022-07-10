import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';

const rootReducer = combineReducers({
  main: mainSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});