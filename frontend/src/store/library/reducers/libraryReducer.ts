import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  BulkEditPayload,
  LibraryError,
  LibraryRow,
  LibraryState,
  UpdateItemPayload,
} from '../libraryDataContracts';

// TODO: This is disgustingly long might want to refactor in the future

const initialState: LibraryState = {
  items: [],
  loading: false,
  error: null,
  mutating: false,
  pendingDeleteIds: [],
  pendingDeleteTitles: [],
  isUndoSnackbarOpen: false,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    fetchLibraryRequest(state) {
      // Don't overwrite happy path delete while undo window is open
      if (state.isUndoSnackbarOpen) return;
      state.loading = true;
      state.error = null;
    },
    fetchLibrarySuccess(state, action: PayloadAction<LibraryRow[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchLibraryFailure(state, action: PayloadAction<LibraryError>) {
      state.loading = false;
      state.error = action.payload;
    },

    // --- Bulk status update ---
    updateBulkStatusRequest(
      state,
      action: PayloadAction<{ ids: string[]; status: LibraryRow['status'] }>,
    ) {
      state.mutating = true;
      const { ids, status } = action.payload;
      state.items = state.items.map((item) =>
        ids.includes(item.id)
          ? {
              ...item,
              status,
              progress: status === 'Finished' ? 100 : item.progress,
            }
          : item,
      );
    },
    updateBulkStatusSuccess(state) {
      state.mutating = false;
    },
    updateBulkStatusFailure(state, action: PayloadAction<LibraryError>) {
      state.mutating = false;
      state.error = action.payload;
    },

    addToCollectionRequest(
      state,
      action: PayloadAction<{ ids: string[]; collectionName: string }>,
    ) {
      state.mutating = true;
      const { ids, collectionName } = action.payload;
      state.items = state.items.map((item) => {
        if (!ids.includes(item.id)) return item;
        if (item.collections.includes(collectionName)) return item;
        return { ...item, collections: [...item.collections, collectionName] };
      });
    },
    addToCollectionSuccess(state) {
      state.mutating = false;
    },
    addToCollectionFailure(state, action: PayloadAction<LibraryError>) {
      state.mutating = false;
      state.error = action.payload;
    },

    removeFromCollectionRequest(
      state,
      action: PayloadAction<{ ids: string[]; collectionName: string }>,
    ) {
      state.mutating = true;
      const { ids, collectionName } = action.payload;
      state.items = state.items.map((item) => {
        if (!ids.includes(item.id)) return item;
        return {
          ...item,
          collections: item.collections.filter((c) => c !== collectionName),
        };
      });
    },
    removeFromCollectionSuccess(state) {
      state.mutating = false;
    },
    removeFromCollectionFailure(state, action: PayloadAction<LibraryError>) {
      state.mutating = false;
      state.error = action.payload;
    },

    deleteBulkRequest(state, action: PayloadAction<{ ids: string[] }>) {
      const { ids } = action.payload;
      state.pendingDeleteTitles = state.items
        .filter((item) => ids.includes(item.id))
        .map((item) => item.title);
      state.items = state.items.filter((item) => !ids.includes(item.id));
      state.pendingDeleteIds = ids;
      state.isUndoSnackbarOpen = true;
    },
    deleteBulkConfirm() {},
    deleteBulkCommit(state) {
      state.pendingDeleteIds = [];
      state.pendingDeleteTitles = [];
      state.isUndoSnackbarOpen = false;
      state.mutating = false;
    },
    deleteBulkUndo(state) {
      state.pendingDeleteIds = [];
      state.pendingDeleteTitles = [];
      state.isUndoSnackbarOpen = false;
    },
    deleteBulkSuccess(state) {
      state.mutating = false;
    },
    deleteBulkFailure(state, action: PayloadAction<LibraryError>) {
      state.mutating = false;
      state.error = action.payload;
    },

    bulkEditRequest(state, action: PayloadAction<BulkEditPayload>) {
      state.mutating = true;
      const {
        ids,
        status,
        progress,
        rating,
        notes,
        addCollections,
        removeCollections,
      } = action.payload;

      state.items = state.items.map((item) => {
        if (!ids.includes(item.id)) return item;

        const collectionsAfterRemove = item.collections.filter(
          (c) => !(removeCollections ?? []).includes(c),
        );
        const collectionsAfterAdd = [
          ...collectionsAfterRemove,
          ...(addCollections ?? []).filter(
            (c) => !collectionsAfterRemove.includes(c),
          ),
        ];

        return {
          ...item,
          status: status ?? item.status,
          progress: progress ?? (status === 'Finished' ? 100 : item.progress),
          rating: rating ?? item.rating,
          notes: notes ?? item.notes,
          collections: collectionsAfterAdd,
        };
      });
    },
    bulkEditSuccess(state) {
      state.mutating = false;
    },
    bulkEditFailure(state, action: PayloadAction<LibraryError>) {
      state.mutating = false;
      state.error = action.payload;
    },

    updateItemRequest(state, _: PayloadAction<UpdateItemPayload>) {
      state.mutating = true;
    },
    updateItemSuccess(state, action: PayloadAction<LibraryRow>) {
      state.mutating = false;
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    updateItemFailure(state, action: PayloadAction<LibraryError>) {
      state.mutating = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = librarySlice.actions;

export default librarySlice.reducer;
