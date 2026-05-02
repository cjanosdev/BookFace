import {
  all,
  call,
  put,
  race,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  fetchLibrary,
  updateBulkLibraryStatus,
  bulkUpdateLibraryItems,
  addBulkLibraryItemsToCollection,
  removeBulkLibraryItemsFromCollection,
  deleteBulkLibraryItems,
  updateLibraryItem,
  mapFrontendStatusToBackend,
} from '../libraryApi';
import {
  fetchLibraryRequest,
  fetchLibrarySuccess,
  fetchLibraryFailure,
  updateBulkStatusRequest,
  updateBulkStatusSuccess,
  updateBulkStatusFailure,
  addToCollectionRequest,
  addToCollectionSuccess,
  addToCollectionFailure,
  removeFromCollectionRequest,
  removeFromCollectionSuccess,
  removeFromCollectionFailure,
  deleteBulkRequest,
  deleteBulkConfirm,
  deleteBulkCommit,
  deleteBulkUndo,
  deleteBulkSuccess,
  deleteBulkFailure,
  bulkEditRequest,
  bulkEditSuccess,
  bulkEditFailure,
  updateItemRequest,
  updateItemSuccess,
  updateItemFailure,
} from '../reducers/libraryReducer';
import type { LibraryRow } from '../libraryDataContracts';

// serialize to error or go to fallback if it blows up
function toSerializableError(error: unknown, fallback: string) {
  return error instanceof Error
    ? { message: error.message }
    : { message: fallback };
}

function* fetchLibraryWorker(): Generator {
  try {
    const data = (yield call(fetchLibrary)) as LibraryRow[];
    yield put(fetchLibrarySuccess(data));
  } catch (error: unknown) {
    yield put(
      fetchLibraryFailure(toSerializableError(error, 'Failed to load library')),
    );
  }
}

function* updateBulkStatusWorker(
  action: ReturnType<typeof updateBulkStatusRequest>,
): Generator {
  try {
    const { ids, status } = action.payload;
    yield call(
      updateBulkLibraryStatus,
      ids,
      mapFrontendStatusToBackend(status),
    );
    yield put(updateBulkStatusSuccess());
  } catch (error: unknown) {
    yield put(
      updateBulkStatusFailure(
        toSerializableError(error, 'Failed to update status'),
      ),
    );
    yield put(fetchLibraryRequest());
  }
}

function* addToCollectionWorker(
  action: ReturnType<typeof addToCollectionRequest>,
): Generator {
  try {
    const { ids, collectionName } = action.payload;
    yield call(addBulkLibraryItemsToCollection, ids, collectionName);
    yield put(addToCollectionSuccess());
  } catch (error: unknown) {
    yield put(
      addToCollectionFailure(
        toSerializableError(error, 'Failed to add to collection'),
      ),
    );
    yield put(fetchLibraryRequest());
  }
}

function* removeFromCollectionWorker(
  action: ReturnType<typeof removeFromCollectionRequest>,
): Generator {
  try {
    const { ids, collectionName } = action.payload;
    yield call(removeBulkLibraryItemsFromCollection, ids, collectionName);
    yield put(removeFromCollectionSuccess());
  } catch (error: unknown) {
    yield put(
      removeFromCollectionFailure(
        toSerializableError(error, 'Failed to remove from collection'),
      ),
    );
    yield put(fetchLibraryRequest());
  }
}

function* deleteBulkWorker(
  action: ReturnType<typeof deleteBulkRequest>,
): Generator {
  const { ids } = action.payload;

  const result = (yield race({
    confirmed: take(deleteBulkConfirm.type),
    undo: take(deleteBulkUndo.type),
  })) as { confirmed?: unknown; undo?: unknown };

  if (result.undo) {
    yield put(fetchLibraryRequest());
    return;
  }

  try {
    yield call(deleteBulkLibraryItems, ids);
    yield put(deleteBulkCommit());
    yield put(deleteBulkSuccess());
  } catch (error: unknown) {
    yield put(
      deleteBulkFailure(toSerializableError(error, 'Failed to delete items')),
    );
    yield put(fetchLibraryRequest());
  }
}

function* bulkEditWorker(
  action: ReturnType<typeof bulkEditRequest>,
): Generator {
  try {
    const {
      ids,
      status,
      progress,
      rating,
      notes,
      addCollections,
      removeCollections,
    } = action.payload;

    if (status) {
      yield call(
        updateBulkLibraryStatus,
        ids,
        mapFrontendStatusToBackend(status),
      );
    }

    if (rating !== undefined || notes !== undefined || progress !== undefined) {
      yield call(bulkUpdateLibraryItems, ids, {
        rating,
        notes,
        progressPercent: progress,
      });
    }

    yield all([
      ...(addCollections ?? []).map((name) =>
        call(addBulkLibraryItemsToCollection, ids, name),
      ),
      ...(removeCollections ?? []).map((name) =>
        call(removeBulkLibraryItemsFromCollection, ids, name),
      ),
    ]);

    yield put(bulkEditSuccess());
    yield put(fetchLibraryRequest());
  } catch (error: unknown) {
    yield put(
      bulkEditFailure(toSerializableError(error, 'Failed to bulk edit items')),
    );
    yield put(fetchLibraryRequest());
  }
}

function* updateItemWorker(
  action: ReturnType<typeof updateItemRequest>,
): Generator {
  try {
    const {
      id,
      status,
      progress,
      rating,
      notes,
      collections,
      dateAdded,
      startedAt,
    } = action.payload;
    const updated = (yield call(updateLibraryItem, id, {
      status: mapFrontendStatusToBackend(status),
      progressPercent: progress,
      rating,
      notes,
      collections,
      dateAdded,
      startedAt,
    })) as LibraryRow;
    yield put(updateItemSuccess(updated));
  } catch (error: unknown) {
    yield put(
      updateItemFailure(toSerializableError(error, 'Failed to update item')),
    );
    yield put(fetchLibraryRequest());
  }
}

export function* librarySaga() {
  yield all([
    takeLatest(fetchLibraryRequest.type, fetchLibraryWorker),
    takeLatest(updateBulkStatusRequest.type, updateBulkStatusWorker),
    takeLatest(addToCollectionRequest.type, addToCollectionWorker),
    takeLatest(removeFromCollectionRequest.type, removeFromCollectionWorker),
    takeEvery(deleteBulkRequest.type, deleteBulkWorker),
    takeLatest(bulkEditRequest.type, bulkEditWorker),
    takeLatest(updateItemRequest.type, updateItemWorker),
  ]);
}
