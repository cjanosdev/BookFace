import { all } from 'redux-saga/effects';
import { librarySaga } from '../features/library/librarySaga';

export function* rootSaga() {
  yield all([librarySaga()]);
}
