import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

enum Status {
  NotStarted = 'NOT_STARTED',
  Reading = 'READING',
  Finished = 'FINISHED',
  Dropped = 'DROPPED',
}

export interface LibraryError {
  message: string;
  code?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  status: Status;
  progressPercent: number;
}

interface LibraryState {
  items: LibraryBook[];
  loading: boolean;
  error: LibraryError | null;
}

const initialState: LibraryState = {
  items: [],
  loading: false,
  error: null,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    fetchLibraryRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLibrarySuccess(state, action: PayloadAction<LibraryBook[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchLibraryFailure(state, action: PayloadAction<LibraryError>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchLibraryRequest, fetchLibrarySuccess, fetchLibraryFailure } =
  librarySlice.actions;

export default librarySlice.reducer;
