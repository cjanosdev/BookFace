import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { LibraryRow } from '../../store/library/libraryDataContracts';
import { styles } from './bulkEditLibraryItemsDialogStyles';
import StatusButtonGroup from '../common/StatusButtonGroup';
import CollectionEditor, {
  type CollectionAddMode,
} from '../common/CollectionEditor';

type BulkEditPayload = {
  status?: LibraryRow['status'];
  progress?: number;
  rating?: number;
  notes?: string;
  addCollections?: string[];
  removeCollections?: string[];
};

type Props = {
  open: boolean;
  selectedCount: number;
  availableCollections: string[];
  selectedCollections: string[];
  onClose: () => void;
  onConfirm: (payload: BulkEditPayload) => void;
};

export default function BulkEditLibraryItemsDialog({
  open,
  selectedCount,
  availableCollections,
  selectedCollections,
  onClose,
  onConfirm,
}: Props) {
  const [changeStatus, setChangeStatus] = useState(false);
  const [changeProgress, setChangeProgress] = useState(false);
  const [changeRating, setChangeRating] = useState(false);
  const [changeNotes, setChangeNotes] = useState(false);

  const [status, setStatus] = useState<LibraryRow['status']>('Reading');
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  const [collectionAddMode, setCollectionAddMode] =
    useState<CollectionAddMode>('existing');
  const [pendingCollectionName, setPendingCollectionName] = useState('');
  const [addCollections, setAddCollections] = useState<string[]>([]);
  const [removeCollections, setRemoveCollections] = useState<string[]>([]);

  const canApply =
    changeStatus ||
    changeProgress ||
    changeRating ||
    changeNotes ||
    addCollections.length > 0 ||
    removeCollections.length > 0;

  const removableCollections = [
    ...selectedCollections.filter((c) => !removeCollections.includes(c)),
    ...addCollections,
  ];

  const addableCollections = availableCollections.filter(
    (collection) =>
      !addCollections.includes(collection) &&
      !selectedCollections.includes(collection),
  );

  const handleAddCollection = () => {
    const name = pendingCollectionName.trim();

    if (!name) return;
    if (addCollections.includes(name)) return;

    setAddCollections((prev) => [...prev, name]);

    if (collectionAddMode === 'existing') {
      const nextExisting = addableCollections.find(
        (collection) => collection !== name,
      );
      setPendingCollectionName(nextExisting ?? '');
      if (!nextExisting) setCollectionAddMode('new');
    } else {
      setPendingCollectionName('');
    }
  };

  const handleRemoveCollection = (collectionName: string) => {
    if (addCollections.includes(collectionName)) {
      setAddCollections((prev) => prev.filter((c) => c !== collectionName));
      return;
    }
    if (removeCollections.includes(collectionName)) return;
    setRemoveCollections((prev) => [...prev, collectionName]);
  };

  const handleApply = () => {
    onConfirm({
      status: changeStatus ? status : undefined,
      progress: changeProgress ? progress : undefined,
      rating: changeRating ? rating : undefined,
      notes: changeNotes ? notes : undefined,
      addCollections,
      removeCollections,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Bulk Edit Books</DialogTitle>

      <DialogContent>
        <Typography sx={styles.description}>
          Apply changes to {selectedCount} selected{' '}
          {selectedCount === 1 ? 'book' : 'books'}. Only checked sections will
          change.
        </Typography>

        <Box sx={styles.section}>
          <FormControlLabel
            sx={styles.sectionHeader}
            control={
              <Checkbox
                checked={changeStatus}
                onChange={(event) => setChangeStatus(event.target.checked)}
              />
            }
            label="Change status"
          />

          <StatusButtonGroup value={status} onChange={setStatus} />
        </Box>

        <Box sx={styles.section}>
          <FormControlLabel
            sx={styles.sectionHeader}
            control={
              <Checkbox
                checked={changeProgress}
                onChange={(event) => setChangeProgress(event.target.checked)}
              />
            }
            label="Change progress"
          />

          {changeProgress && (
            <Box sx={styles.progressRow}>
              <Slider
                value={progress}
                min={0}
                max={100}
                onChange={(_, value) => setProgress(value as number)}
              />

              <TextField
                size="small"
                value={progress}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (!Number.isNaN(next)) {
                    setProgress(Math.max(0, Math.min(100, next)));
                  }
                }}
              />
            </Box>
          )}
        </Box>

        <Box sx={styles.section}>
          <FormControlLabel
            sx={styles.sectionHeader}
            control={
              <Checkbox
                checked={changeRating}
                onChange={(event) => setChangeRating(event.target.checked)}
              />
            }
            label="Change rating"
          />

          {changeRating && (
            <Box sx={styles.ratingRow}>
              <Rating
                value={rating}
                onChange={(_, value) => setRating(value ?? 0)}
              />
              <Button size="small" onClick={() => setRating(0)}>
                Clear
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={styles.section}>
          <FormControlLabel
            sx={styles.sectionHeader}
            control={
              <Checkbox
                checked={changeNotes}
                onChange={(event) => setChangeNotes(event.target.checked)}
              />
            }
            label="Replace notes"
          />

          {changeNotes && (
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={notes}
              placeholder="These notes will replace notes on all selected books."
              onChange={(event) => setNotes(event.target.value)}
            />
          )}
        </Box>
        <Box sx={styles.section}>
          <CollectionEditor
            title="Edit collections"
            helperText="Click the x on a collection to remove it from any selected books that currently have it."
            emptyText="None of the selected books are currently in any collections."
            collections={removableCollections}
            availableCollections={addableCollections}
            addMode={collectionAddMode}
            value={pendingCollectionName}
            onAddModeChange={(mode) => {
              setCollectionAddMode(mode);
              setPendingCollectionName(
                mode === 'existing' ? (addableCollections[0] ?? '') : '',
              );
            }}
            onValueChange={setPendingCollectionName}
            onRemoveCollection={handleRemoveCollection}
            onAddCollection={handleAddCollection}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" disabled={!canApply} onClick={handleApply}>
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
