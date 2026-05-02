import type { RootState } from '../../app/rootReducer';

export const selectCollectionSummaries = (state: RootState) => state.collections.summaries;
export const selectCollectionDetail = (state: RootState) => state.collections.detail;
export const selectCollectionsLoading = (state: RootState) => state.collections.loading;
export const selectCollectionDetailLoading = (state: RootState) => state.collections.detailLoading;
export const selectCollectionsMutating = (state: RootState) => state.collections.mutating;
export const selectCollectionsError = (state: RootState) => state.collections.error;
