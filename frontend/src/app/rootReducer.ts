import { combineReducers } from '@reduxjs/toolkit';
import libraryReducer from '../store/library/reducers/libraryReducer';
import collectionsReducer from '../store/collections/reducers/collectionsReducer';

export const rootReducer = combineReducers({
  library: libraryReducer,
  collections: collectionsReducer,
});
