import type { LibraryRow } from '../library/libraryDataContracts';

export type CollectionSummary = {
  id: string;
  name: string;
  description: string | null;
  bookCount: number;
  coverUrls: string[];
};

export type CollectionDetail = {
  id: string;
  name: string;
  description: string | null;
  books: LibraryRow[];
};

export interface CollectionError {
  message: string;
}

export interface CollectionsState {
  summaries: CollectionSummary[];
  detail: CollectionDetail | null;
  loading: boolean;
  detailLoading: boolean;
  mutating: boolean;
  error: CollectionError | null;
}
