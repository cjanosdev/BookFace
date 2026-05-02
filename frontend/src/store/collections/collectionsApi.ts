import { apiClient } from '../../services/apiClient';
import { mapBackendItemToRow } from '../library/libraryApi';
import type { CollectionDetail, CollectionSummary } from './collectionsDataContracts';

export const fetchCollections = async (): Promise<CollectionSummary[]> => {
  const response = await apiClient.get('/library/collections');
  return response.data;
};

export const createCollection = async (
  name: string,
  description?: string,
): Promise<CollectionSummary> => {
  const response = await apiClient.post('/library/collections', { name, description });
  return response.data;
};

export const fetchCollectionDetail = async (id: string): Promise<CollectionDetail> => {
  const response = await apiClient.get(`/library/collections/${id}`);
  const { books, ...rest } = response.data;
  return {
    ...rest,
    books: books.map(mapBackendItemToRow),
  };
};

export const updateCollection = async (
  id: string,
  payload: { name?: string; description?: string },
): Promise<CollectionSummary> => {
  const response = await apiClient.patch(`/library/collections/${id}`, payload);
  return response.data;
};

export const deleteCollection = async (id: string): Promise<void> => {
  await apiClient.delete(`/library/collections/${id}`);
};
