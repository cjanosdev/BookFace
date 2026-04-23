import { call, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
import { apiClient } from '../../services/apiClient';
import {
  fetchLibraryFailure,
  fetchLibraryRequest,
  fetchLibrarySuccess,
} from './librarySlice';
import type { LibraryBook } from './librarySlice';

function* fetchLibraryWorker(): Generator {
  try {
    const response: AxiosResponse<LibraryBook[]> = yield call(
      apiClient.get,
      '/library',
    );
    yield put(fetchLibrarySuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        fetchLibraryFailure(
          error.message
            ? { message: error.message }
            : { message: 'Failed to load library' },
        ),
      );
    }
  }
}

export function* librarySaga() {
  yield takeLatest(fetchLibraryRequest.type, fetchLibraryWorker);
}
