import { combineReducers } from '@reduxjs/toolkit';
import libraryReducer from '../features/library/librarySlice';

export const rootReducer = combineReducers({
  library: libraryReducer,
});
