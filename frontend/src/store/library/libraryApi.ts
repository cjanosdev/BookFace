import { apiClient } from '../../services/apiClient';
import type { BackendReadingStatus, LibraryRow } from './libraryDataContracts';

export function mapStatus(status: string): LibraryRow['status'] {
  switch (status) {
    case 'READING':
      return 'Reading';
    case 'FINISHED':
      return 'Finished';
    case 'DROPPED':
      return 'Dropped';
    default:
      return 'Not Started';
  }
}

export function mapFrontendStatusToBackend(
  status: LibraryRow['status'],
): BackendReadingStatus {
  switch (status) {
    case 'Reading':
      return 'READING';
    case 'Finished':
      return 'FINISHED';
    case 'Dropped':
      return 'DROPPED';
    default:
      return 'NOT_STARTED';
  }
}

type BackendLibraryItem = {
  id: string;
  status: string;
  progressPercent: number;
  rating: number | null;
  notes: string | null;
  dateAdded: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  collections: string[];
  book: {
    title: string;
    author: string;
    coverUrl: string | null;
    pageCount: number | null;
    publishedYear: number | null;
  };
};

export function mapBackendItemToRow(item: BackendLibraryItem): LibraryRow {
  return {
    id: item.id,
    title: item.book.title,
    author: item.book.author,
    cover: item.book.coverUrl,
    status: mapStatus(item.status),
    progress: item.progressPercent,
    collections: item.collections ?? [],
    rating: item.rating ?? 0,
    added: item.dateAdded,
    notes: item.notes ?? '',
    pageCount: item.book.pageCount ?? null,
    publishedYear: item.book.publishedYear ?? null,
    startedAt: item.startedAt ?? null,
    finishedAt: item.finishedAt ?? null,
  };
}

export const fetchLibrary = async (): Promise<LibraryRow[]> => {
  const response = await apiClient.get('/library');
  return response.data.map(mapBackendItemToRow);
};

export const updateBulkLibraryStatus = async (
  libraryItemIds: string[],
  status: BackendReadingStatus,
) => {
  await apiClient.patch('/library/bulk/status', {
    libraryItemIds,
    status,
  });
};

export const addBulkLibraryItemsToCollection = async (
  libraryItemIds: string[],
  collectionName: string,
) => {
  await apiClient.patch('/library/bulk/collections', {
    libraryItemIds,
    collectionName,
  });
};

export const removeBulkLibraryItemsFromCollection = async (
  libraryItemIds: string[],
  collectionName: string,
) => {
  await apiClient.patch('/library/bulk/collections/remove', {
    libraryItemIds,
    collectionName,
  });
};

export const deleteBulkLibraryItems = async (libraryItemIds: string[]) => {
  await apiClient.delete('/library/bulk', {
    data: {
      libraryItemIds,
    },
  });
};

export const updateBulkLibraryProgress = async (
  libraryItemIds: string[],
  progressPercent: number,
) => {
  await apiClient.patch('/library/bulk/progress', {
    libraryItemIds,
    progressPercent,
  });
};

export const bulkUpdateLibraryItems = async (
  libraryItemIds: string[],
  payload: { rating?: number; notes?: string; progressPercent?: number },
) => {
  await apiClient.patch('/library/bulk', { libraryItemIds, ...payload });
};

export const updateLibraryItem = async (
  id: string,
  payload: {
    status: BackendReadingStatus;
    progressPercent: number;
    rating: number;
    notes: string;
    collections: string[];
    dateAdded: string | null;
    startedAt: string | null;
  },
): Promise<LibraryRow> => {
  const response = await apiClient.patch(`/library/${id}`, payload);
  return mapBackendItemToRow(response.data);
};
