import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchCollections,
  createCollection,
  fetchCollectionDetail,
  updateCollection,
  deleteCollection,
} from '../collectionsApi';
import {
  fetchCollectionsRequest,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  fetchCollectionDetailRequest,
  fetchCollectionDetailSuccess,
  fetchCollectionDetailFailure,
  createCollectionRequest,
  createCollectionSuccess,
  createCollectionFailure,
  renameCollectionRequest,
  renameCollectionSuccess,
  renameCollectionFailure,
  deleteCollectionRequest,
  deleteCollectionSuccess,
  deleteCollectionFailure,
} from '../reducers/collectionsReducer';
import type { CollectionDetail, CollectionSummary } from '../collectionsDataContracts';

function toSerializableError(error: unknown, fallback: string) {
  return error instanceof Error ? { message: error.message } : { message: fallback };
}

function* fetchCollectionsWorker(): Generator {
  try {
    const data = (yield call(fetchCollections)) as CollectionSummary[];
    yield put(fetchCollectionsSuccess(data));
  } catch (error: unknown) {
    yield put(fetchCollectionsFailure(toSerializableError(error, 'Failed to load collections')));
  }
}

function* fetchCollectionDetailWorker(
  action: ReturnType<typeof fetchCollectionDetailRequest>,
): Generator {
  try {
    const data = (yield call(fetchCollectionDetail, action.payload)) as CollectionDetail;
    yield put(fetchCollectionDetailSuccess(data));
  } catch (error: unknown) {
    yield put(fetchCollectionDetailFailure(toSerializableError(error, 'Failed to load collection')));
  }
}

function* createCollectionWorker(
  action: ReturnType<typeof createCollectionRequest>,
): Generator {
  try {
    const { name, description } = action.payload;
    const summary = (yield call(createCollection, name, description)) as CollectionSummary;
    yield put(createCollectionSuccess(summary));
  } catch (error: unknown) {
    yield put(createCollectionFailure(toSerializableError(error, 'Failed to create collection')));
  }
}

function* renameCollectionWorker(
  action: ReturnType<typeof renameCollectionRequest>,
): Generator {
  try {
    const { id, name } = action.payload;
    const summary = (yield call(updateCollection, id, { name })) as CollectionSummary;
    yield put(renameCollectionSuccess(summary));
  } catch (error: unknown) {
    yield put(renameCollectionFailure(toSerializableError(error, 'Failed to rename collection')));
  }
}

function* deleteCollectionWorker(
  action: ReturnType<typeof deleteCollectionRequest>,
): Generator {
  try {
    yield call(deleteCollection, action.payload);
    yield put(deleteCollectionSuccess(action.payload));
  } catch (error: unknown) {
    yield put(deleteCollectionFailure(toSerializableError(error, 'Failed to delete collection')));
  }
}

export function* collectionsSaga() {
  yield all([
    takeLatest(fetchCollectionsRequest.type, fetchCollectionsWorker),
    takeLatest(fetchCollectionDetailRequest.type, fetchCollectionDetailWorker),
    takeLatest(createCollectionRequest.type, createCollectionWorker),
    takeLatest(renameCollectionRequest.type, renameCollectionWorker),
    takeLatest(deleteCollectionRequest.type, deleteCollectionWorker),
  ]);
}
