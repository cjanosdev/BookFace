export type LibraryRow = {
  id: string;
  title: string;
  author: string;
  cover?: string;
  status: 'Reading' | 'Finished' | 'Dropped' | 'Not Started';
  progress: number;
  collections: string[];
  rating: number;
  notes: string;
  added: string;
  pageCount: number;
  publishedYear: number;
  startedAt: Date | null;
  finishedAt: Date | null;
};

export type BackendReadingStatus =
  | 'NOT_STARTED'
  | 'READING'
  | 'FINISHED'
  | 'DROPPED';

export interface LibraryError {
  message: string;
  code?: string;
}

export interface LibraryState {
  items: LibraryRow[];
  loading: boolean;
  error: LibraryError | null;
  mutating: boolean;
  pendingDeleteIds: string[];
  pendingDeleteTitles: string[];
  isUndoSnackbarOpen: boolean;
}

export type BulkEditPayload = {
  ids: string[];
  status?: LibraryRow['status'];
  progress?: number;
  rating?: number;
  notes?: string;
  addCollections?: string[];
  removeCollections?: string[];
};

export type UpdateItemPayload = {
  id: string;
  status: LibraryRow['status'];
  progress: number;
  rating: number;
  notes: string;
  collections: string[];
  dateAdded: string | null;
  startedAt: string | null;
};

export type CollectionAddMode = 'existing' | 'new';

export type LibraryTab =
  | 'All Books'
  | 'Currently Reading'
  | 'Want to Read'
  | 'Finished'
  | 'Dropped';

export const TAB_STATUS_MAP: Partial<Record<LibraryTab, LibraryRow['status']>> =
  {
    'Currently Reading': 'Reading',
    'Want to Read': 'Not Started',
    Finished: 'Finished',
    Dropped: 'Dropped',
  };
