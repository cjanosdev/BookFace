import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { GridRowSelectionModel } from '@mui/x-data-grid';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import AppShell from '../layout/AppShell';
import LibraryContainer from './LibraryContainer';
import LibraryHeader from './LibraryHeader';
import LibraryContentPanel from './LibraryContentPanel';
import LibraryToolbar from './LibraryToolbar';
import LibraryContentArea from './LibraryContentArea';
import StatusDialog from '../dialogs/StatusDialog';
import EditCollectionsDialog from '../dialogs/EditCollectionsDialog';
import ConfirmDeleteDialog from '../dialogs/ConfirmDeleteDialog';
import BulkEditLibraryItemsDialog from '../dialogs/BulkEditLibraryItemsDialog';
import EditLibraryItemDrawer from '../drawers/EditLibraryItemDrawer';
import { fetchLibraryRequest, deleteBulkUndo, deleteBulkConfirm } from '../../store/library/reducers/libraryReducer';
import { fetchCollectionsRequest } from '../../store/collections/reducers/collectionsReducer';
import { selectCollectionSummaries } from '../../store/collections/collectionsSelectors';
import {
  selectLibraryItems,
  selectLibraryLoading,
  selectIsUndoSnackbarOpen,
  selectPendingDeleteCount,
  selectPendingDeleteTitles,
} from '../../store/library/librarySelectors';
import { useLibraryFilters } from '../../hooks/library/useLibraryFilters';
import { useLibrarySelection } from '../../hooks/library/useLibrarySelection';
import { useStatusDialog } from '../../hooks/library/useStatusDialog';
import { useCollectionsDialog } from '../../hooks/library/useCollectionsDialog';
import { useDeleteDialog } from '../../hooks/library/useDeleteDialog';
import { useBulkEditDialog } from '../../hooks/library/useBulkEditDialog';
import { useEditItemDrawer } from '../../hooks/library/useEditItemDrawer';
import type { LibraryRow } from '../../store/library/libraryDataContracts';

export default function LibraryPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectLibraryItems);
  const loading = useSelector(selectLibraryLoading);
  const collectionSummaries = useSelector(selectCollectionSummaries);
  const isUndoSnackbarOpen = useSelector(selectIsUndoSnackbarOpen);
  const pendingDeleteCount = useSelector(selectPendingDeleteCount);
  const pendingDeleteTitles = useSelector(selectPendingDeleteTitles);

  useEffect(() => {
    dispatch(fetchLibraryRequest());
    dispatch(fetchCollectionsRequest());
  }, [dispatch]);

  const filters = useLibraryFilters(items);
  const selection = useLibrarySelection(filters.filteredRows);

  const statusDialog = useStatusDialog();
  const deleteDialog = useDeleteDialog();
  const collectionsDialog = useCollectionsDialog();
  const bulkEditDialog = useBulkEditDialog();

  const editDrawer = useEditItemDrawer((row: LibraryRow) => {
    selection.setRowSelectionModel({
      type: 'include',
      ids: new Set([row.id]),
    } as GridRowSelectionModel);
    deleteDialog.open();
  });

  const availableCollections = useMemo(
    () => collectionSummaries.map((c: { name: string }) => c.name).sort((a: string, b: string) => a.localeCompare(b)),
    [collectionSummaries],
  );

  const selectedCollections = useMemo(() => {
    const selectedSet = new Set(selection.selectedIds);
    const collectionSet = new Set<string>();
    items
      .filter((row) => selectedSet.has(row.id))
      .forEach((row) => row.collections.forEach((c) => collectionSet.add(c)));
    return Array.from(collectionSet).sort((a, b) => a.localeCompare(b));
  }, [items, selection.selectedIds]);

  return (
    <AppShell>
      <LibraryContainer>
        <LibraryHeader
          totalBooks={items.length}
          searchValue={filters.searchValue}
          onSearchChange={filters.setSearchValue}
          filterValue={filters.filterValue}
          sortValue={filters.sortValue}
          onFilterChange={filters.setFilterValue}
          onSortChange={filters.setSortValue}
        />

        <LibraryContentPanel>
          <LibraryToolbar
            activeTab={filters.activeTab}
            onTabChange={filters.setActiveTab}
            selectedCount={selection.selectedCount}
            onOpenEditStatus={statusDialog.open}
            onOpenEditCollections={() =>
              collectionsDialog.open(availableCollections)
            }
            onOpenBulkEdit={bulkEditDialog.open}
            onBulkRemove={deleteDialog.open}
          />

          <LibraryContentArea
            rows={filters.filteredRows}
            loading={loading}
            rowSelectionModel={selection.rowSelectionModel}
            onSelectionChange={selection.setRowSelectionModel}
            onOpenEditItem={editDrawer.open}
          />
        </LibraryContentPanel>

        <StatusDialog
          open={statusDialog.isOpen}
          value={statusDialog.pendingStatus}
          onChange={statusDialog.setPendingStatus}
          onClose={statusDialog.close}
          onConfirm={() =>
            statusDialog.confirm(selection.selectedIds, selection.resetSelection)
          }
        />

        <EditCollectionsDialog
          open={collectionsDialog.isOpen}
          selectedCollections={selectedCollections}
          availableCollections={availableCollections}
          addMode={collectionsDialog.addMode}
          value={collectionsDialog.pendingName}
          onAddModeChange={collectionsDialog.setAddMode}
          onValueChange={collectionsDialog.setPendingName}
          onRemoveCollection={(name) =>
            collectionsDialog.removeCollection(selection.selectedIds, name)
          }
          onAddCollection={() =>
            collectionsDialog.addCollection(selection.selectedIds)
          }
          onClose={collectionsDialog.close}
        />

        <ConfirmDeleteDialog
          open={deleteDialog.isOpen}
          count={selection.selectedCount}
          onClose={deleteDialog.close}
          onConfirm={() =>
            deleteDialog.confirm(selection.selectedIds, selection.resetSelection)
          }
        />

        <BulkEditLibraryItemsDialog
          key={String(bulkEditDialog.isOpen)}
          open={bulkEditDialog.isOpen}
          selectedCount={selection.selectedCount}
          availableCollections={availableCollections}
          selectedCollections={selectedCollections}
          onClose={bulkEditDialog.close}
          onConfirm={(payload) =>
            bulkEditDialog.confirm(payload, selection.selectedIds, selection.resetSelection)
          }
        />

        <EditLibraryItemDrawer
          open={editDrawer.isOpen}
          row={editDrawer.activeRow}
          availableCollections={availableCollections}
          onClose={editDrawer.close}
          onSave={editDrawer.save}
          onDelete={editDrawer.deleteItem}
        />

        <Snackbar open={isUndoSnackbarOpen}>
          <Alert
            severity="warning"
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button color="inherit" size="small" onClick={() => dispatch(deleteBulkUndo())}>
                  Undo
                </Button>
                <Button color="inherit" size="small" variant="outlined" onClick={() => dispatch(deleteBulkConfirm())}>
                  Confirm
                </Button>
              </Box>
            }
          >
            Remove {pendingDeleteCount} {pendingDeleteCount === 1 ? 'book' : 'books'}?{' '}
            {pendingDeleteTitles.length <= 2
              ? pendingDeleteTitles.join(', ')
              : `${pendingDeleteTitles.slice(0, 2).join(', ')} +${pendingDeleteTitles.length - 2} more`}
          </Alert>
        </Snackbar>
      </LibraryContainer>
    </AppShell>
  );
}
