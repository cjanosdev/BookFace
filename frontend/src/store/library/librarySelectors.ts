import type { RootState } from '../../app/store';

export const selectLibraryItems = (state: RootState) => state.library.items;
export const selectLibraryLoading = (state: RootState) => state.library.loading;
export const selectLibraryError = (state: RootState) => state.library.error;
export const selectMutating = (state: RootState) => state.library.mutating;

export const selectPendingDeleteIds = (state: RootState) =>
  state.library.pendingDeleteIds;

export const selectPendingDeleteCount = (state: RootState) =>
  state.library.pendingDeleteIds.length;

export const selectPendingDeleteTitles = (state: RootState) =>
  state.library.pendingDeleteTitles;

export const selectIsUndoSnackbarOpen = (state: RootState) =>
  state.library.isUndoSnackbarOpen;
