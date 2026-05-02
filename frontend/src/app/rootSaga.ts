import { all } from 'redux-saga/effects';
import { librarySaga } from '../store/library/sagas/librarySaga';
import { collectionsSaga } from '../store/collections/sagas/collectionsSaga';

export function* rootSaga() {
  yield all([librarySaga(), collectionsSaga()]);
}
