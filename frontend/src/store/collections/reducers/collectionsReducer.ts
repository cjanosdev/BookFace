import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CollectionDetail,
  CollectionError,
  CollectionSummary,
  CollectionsState,
} from '../collectionsDataContracts';
import type { LibraryRow } from '../../library/libraryDataContracts';
import { updateItemSuccess } from '../../library/reducers/libraryReducer';

const initialState: CollectionsState = {
  summaries: [],
  detail: null,
  loading: false,
  detailLoading: false,
  mutating: false,
  error: null,
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    fetchCollectionsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCollectionsSuccess(state, action: PayloadAction<CollectionSummary[]>) {
      state.loading = false;
      state.summaries = action.payload;
    },
    fetchCollectionsFailure(state, action: PayloadAction<CollectionError>) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchCollectionDetailRequest(state, _: PayloadAction<string>) {
      state.detailLoading = true;
      state.error = null;
    },
    fetchCollectionDetailSuccess(state, action: PayloadAction<CollectionDetail>) {
      state.detailLoading = false;
      state.detail = action.payload;
    },
    fetchCollectionDetailFailure(state, action: PayloadAction<CollectionError>) {
      state.detailLoading = false;
      state.error = action.payload;
    },

    createCollectionRequest(
      state,
      _: PayloadAction<{ name: string; description?: string }>,
    ) {
      state.mutating = true;
      state.error = null;
    },
    createCollectionSuccess(state, action: PayloadAction<CollectionSummary>) {
      state.mutating = false;
      state.summaries = [action.payload, ...state.summaries];
    },
    createCollectionFailure(state, action: PayloadAction<CollectionError>) {
      state.mutating = false;
      state.error = action.payload;
    },

    renameCollectionRequest(
      state,
      _: PayloadAction<{ id: string; name: string }>,
    ) {
      state.mutating = true;
      state.error = null;
    },
    renameCollectionSuccess(state, action: PayloadAction<CollectionSummary>) {
      state.mutating = false;
      state.summaries = state.summaries.map((s) =>
        s.id === action.payload.id ? action.payload : s,
      );
      if (state.detail?.id === action.payload.id) {
        state.detail = { ...state.detail, name: action.payload.name };
      }
    },
    renameCollectionFailure(state, action: PayloadAction<CollectionError>) {
      state.mutating = false;
      state.error = action.payload;
    },

    deleteCollectionRequest(state, _: PayloadAction<string>) {
      state.mutating = true;
      state.error = null;
    },
    deleteCollectionSuccess(state, action: PayloadAction<string>) {
      state.mutating = false;
      state.summaries = state.summaries.filter((s) => s.id !== action.payload);
    },
    deleteCollectionFailure(state, action: PayloadAction<CollectionError>) {
      state.mutating = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateItemSuccess, (state, action: PayloadAction<LibraryRow>) => {
      if (!state.detail) return;
      state.detail = {
        ...state.detail,
        books: state.detail.books.map((b) =>
          b.id === action.payload.id ? action.payload : b,
        ),
      };
    });
  },
});

export const {
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
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
