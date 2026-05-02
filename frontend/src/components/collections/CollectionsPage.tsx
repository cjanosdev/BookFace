import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import AppShell from '../layout/AppShell';
import CollectionCard from './CollectionCard';
import { fetchCollectionsRequest } from '../../store/collections/reducers/collectionsReducer';
import {
  selectCollectionSummaries,
  selectCollectionsLoading,
} from '../../store/collections/collectionsSelectors';
import { useCreateCollectionDialog } from '../../hooks/collections/useCreateCollectionDialog';
import { useDeleteCollectionDialog } from '../../hooks/collections/useDeleteCollectionDialog';
import { useRenameCollectionDialog } from '../../hooks/collections/useRenameCollectionDialog';
import { styles } from './collectionsPageStyles';

export default function CollectionsPage() {
  const dispatch = useDispatch();
  const summaries = useSelector(selectCollectionSummaries);
  const loading = useSelector(selectCollectionsLoading);

  // all the dialogs for collections crud...
  const createDialog = useCreateCollectionDialog();
  const deleteDialog = useDeleteCollectionDialog();
  const renameDialog = useRenameCollectionDialog();

  useEffect(() => {
    dispatch(fetchCollectionsRequest());
  }, [dispatch]);

  return (
    <AppShell>
      <Box sx={styles.container}>
        <Box sx={styles.headerRow}>
          <Box sx={styles.titleBlock}>
            <Typography sx={styles.title}>My Collections</Typography>
            <Typography sx={styles.subtitle}>
              {loading
                ? '…'
                : `${summaries.length} ${summaries.length === 1 ? 'collection' : 'collections'}`}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={createDialog.open}
          >
            New Collection
          </Button>
        </Box>

        {summaries.length === 0 && !loading ? (
          <Box sx={styles.emptyState}>
            <AutoStoriesRoundedIcon sx={styles.emptyIcon} />
            <Typography>
              No collections yet. Create one to get started.
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.grid}>
            {summaries.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                onRename={renameDialog.open}
                onDelete={deleteDialog.open}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Create collection dialog */}
      <Dialog
        open={createDialog.isOpen}
        onClose={createDialog.close}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>New Collection</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pt: '16px !important',
          }}
        >
          <TextField
            autoFocus
            label="Name"
            fullWidth
            value={createDialog.name}
            onChange={(e) => createDialog.setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createDialog.confirm()}
          />
          <TextField
            label="Description (optional)"
            fullWidth
            multiline
            minRows={2}
            value={createDialog.description}
            onChange={(e) => createDialog.setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={createDialog.close}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!createDialog.name.trim()}
            onClick={createDialog.confirm}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={renameDialog.isOpen}
        onClose={renameDialog.close}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Rename Collection</DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          <TextField
            autoFocus
            label="Name"
            fullWidth
            value={renameDialog.name}
            onChange={(e) => renameDialog.setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && renameDialog.confirm()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={renameDialog.close}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!renameDialog.name.trim()}
            onClick={renameDialog.confirm}
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete collection?</DialogTitle>
        <DialogContent>
          <Typography>
            This will delete the collection. Books in your library will not be
            affected.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteDialog.close}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={deleteDialog.confirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AppShell>
  );
}
