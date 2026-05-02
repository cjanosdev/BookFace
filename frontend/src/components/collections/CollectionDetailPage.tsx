import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { GridRowSelectionModel } from '@mui/x-data-grid';
import { Alert, Button, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AppShell from '../layout/AppShell';
import LibraryContentPanel from '../library/LibraryContentPanel';
import LibraryToolbar from '../library/LibraryToolbar';
import LibraryContentArea from '../library/LibraryContentArea';
import StatusDialog from '../dialogs/StatusDialog';
import EditCollectionsDialog from '../dialogs/EditCollectionsDialog';
import ConfirmDeleteDialog from '../dialogs/ConfirmDeleteDialog';
import BulkEditLibraryItemsDialog from '../dialogs/BulkEditLibraryItemsDialog';
import EditLibraryItemDrawer from '../drawers/EditLibraryItemDrawer';
import { fetchCollectionDetailRequest } from '../../store/collections/reducers/collectionsReducer';
import {
  selectCollectionDetail,
  selectCollectionDetailLoading,
} from '../../store/collections/collectionsSelectors';
import {
  deleteBulkUndo,
  removeFromCollectionRequest,
} from '../../store/library/reducers/libraryReducer';
import {
  selectIsUndoSnackbarOpen,
  selectPendingDeleteCount,
} from '../../store/library/librarySelectors';
import { useLibraryFilters } from '../../hooks/library/useLibraryFilters';
import { useLibrarySelection } from '../../hooks/library/useLibrarySelection';
import { useStatusDialog } from '../../hooks/library/useStatusDialog';
import { useCollectionsDialog } from '../../hooks/library/useCollectionsDialog';
import { useDeleteDialog } from '../../hooks/library/useDeleteDialog';
import { useBulkEditDialog } from '../../hooks/library/useBulkEditDialog';
import { useEditItemDrawer } from '../../hooks/library/useEditItemDrawer';
import type { LibraryRow } from '../../store/library/libraryDataContracts';
import { styles } from './collectionDetailPageStyles';

export default function CollectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const detail = useSelector(selectCollectionDetail);
  const detailLoading = useSelector(selectCollectionDetailLoading);
  const isUndoSnackbarOpen = useSelector(selectIsUndoSnackbarOpen);
  const pendingDeleteCount = useSelector(selectPendingDeleteCount);

  // rerender if id changes
  useEffect(() => {
    if (id) dispatch(fetchCollectionDetailRequest(id));
  }, [dispatch, id]);

  const books = useMemo(() => detail?.books ?? [], [detail]);
  const filters = useLibraryFilters(books);
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

  const availableCollections = useMemo(() => {
    const set = new Set<string>();
    books.forEach((row) => row.collections.forEach((c) => set.add(c)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [books]);

  const selectedCollections = useMemo(() => {
    const selectedSet = new Set(selection.selectedIds);
    const collectionSet = new Set<string>();
    books
      .filter((row) => selectedSet.has(row.id))
      .forEach((row) => row.collections.forEach((c) => collectionSet.add(c)));
    return Array.from(collectionSet).sort((a, b) => a.localeCompare(b));
  }, [books, selection.selectedIds]);

  const handleRemoveFromCollection = () => {
    if (!detail || selection.selectedIds.length === 0) return;
    dispatch(
      removeFromCollectionRequest({
        ids: selection.selectedIds,
        collectionName: detail.name,
      }),
    );
    selection.resetSelection();
    if (id) dispatch(fetchCollectionDetailRequest(id));
  };

  return (
    <AppShell>
      <Box sx={styles.container}>
        <Box sx={styles.headerRow}>
          <IconButton
            sx={styles.backButton}
            onClick={() => navigate('/collections')}
          >
            <ArrowBackRoundedIcon />
          </IconButton>

          <Box sx={styles.headerMeta}>
            <Typography sx={styles.title}>{detail?.name ?? '…'}</Typography>
            {detail?.description && (
              <Typography sx={styles.description}>
                {detail.description}
              </Typography>
            )}
            <Typography sx={styles.subtitle}>
              {detailLoading
                ? '…'
                : `${books.length} ${books.length === 1 ? 'book' : 'books'}`}
            </Typography>
          </Box>
        </Box>

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
            onRemoveFromCollection={handleRemoveFromCollection}
          />

          <LibraryContentArea
            rows={filters.filteredRows}
            loading={detailLoading}
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
            statusDialog.confirm(
              selection.selectedIds,
              selection.resetSelection,
            )
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
            deleteDialog.confirm(
              selection.selectedIds,
              selection.resetSelection,
            )
          }
        />

        <BulkEditLibraryItemsDialog
          open={bulkEditDialog.isOpen}
          selectedCount={selection.selectedCount}
          availableCollections={availableCollections}
          selectedCollections={selectedCollections}
          onClose={bulkEditDialog.close}
          onConfirm={(payload) =>
            bulkEditDialog.confirm(
              payload,
              selection.selectedIds,
              selection.resetSelection,
            )
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
            severity="info"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => dispatch(deleteBulkUndo())}
              >
                Undo
              </Button>
            }
          >
            {pendingDeleteCount} {pendingDeleteCount === 1 ? 'book' : 'books'}{' '}
            removed
          </Alert>
        </Snackbar>
      </Box>
    </AppShell>
  );
}
