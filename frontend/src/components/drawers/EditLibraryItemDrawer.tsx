import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type { LibraryRow } from '../../store/library/libraryDataContracts';
import { styles } from './editLibraryItemDrawerStyles';
import StatusButtonGroup from '../common/StatusButtonGroup';
import CollectionEditor, {
  type CollectionAddMode,
} from '../common/CollectionEditor';

type SavePayload = {
  id: string;
  status: LibraryRow['status'];
  progress: number;
  rating: number;
  notes: string;
  collections: string[];
  dateAdded: string | null;
  startedAt: string | null;
};

type Props = {
  open: boolean;
  row: LibraryRow | null;
  availableCollections: string[];
  onClose: () => void;
  onSave: (payload: SavePayload) => void;
  onDelete: (row: LibraryRow) => void;
};

export default function EditLibraryItemDrawer({
  open,
  row,
  availableCollections,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [status, setStatus] = useState<LibraryRow['status']>('Not Started');
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [collections, setCollections] = useState<string[]>([]);
  const [collectionAddMode, setCollectionAddMode] =
    useState<CollectionAddMode>('existing');
  const [pendingCollectionName, setPendingCollectionName] = useState('');
  const [dateAdded, setDateAdded] = useState<Dayjs | null>(null);
  const [startedAt, setStartedAt] = useState<Dayjs | null>(null);
  const [discardOpen, setDiscardOpen] = useState(false);

  useEffect(() => {
    if (!row) return;

    /* eslint-disable react-hooks/set-state-in-effect */
    setStatus(row.status);
    setProgress(row.progress);
    setRating(row.rating ?? 0);
    setNotes(row.notes ?? '');
    setCollections(row.collections ?? []);
    setDateAdded(row.added ? dayjs(row.added) : null);
    setStartedAt(row.startedAt ? dayjs(row.startedAt) : null);

    const firstAddable =
      availableCollections.find(
        (name) => !(row.collections ?? []).includes(name),
      ) ?? '';

    setCollectionAddMode(firstAddable ? 'existing' : 'new');
    setPendingCollectionName(firstAddable);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [row, availableCollections]);

  const addableCollections = useMemo(() => {
    return availableCollections.filter((name) => !collections.includes(name));
  }, [availableCollections, collections]);

  const isDirty = useMemo(() => {
    if (!row) return false;
    const datesMatch = (a: Dayjs | null, b: string | null | undefined) => {
      if (!a && !b) return true;
      if (!a || !b) return false;
      return a.isSame(dayjs(b), 'day');
    };
    return (
      status !== row.status ||
      progress !== row.progress ||
      rating !== (row.rating ?? 0) ||
      notes !== (row.notes ?? '') ||
      JSON.stringify([...collections].sort()) !== JSON.stringify([...(row.collections ?? [])].sort()) ||
      !datesMatch(dateAdded, row.added) ||
      !datesMatch(startedAt, row.startedAt)
    );
  }, [row, status, progress, rating, notes, collections, dateAdded, startedAt]);

  if (!row) {
    return null;
  }

  const handleRequestClose = () => {
    if (isDirty) {
      setDiscardOpen(true);
    } else {
      onClose();
    }
  };

  const handleDiscard = () => {
    setDiscardOpen(false);
    onClose();
  };

  const handleProgressChange = (nextProgress: number) => {
    const safeProgress = Math.max(0, Math.min(100, nextProgress));
    setProgress(safeProgress);

    if (safeProgress === 100) {
      setStatus('Finished');
    }

    if (safeProgress === 0 && status === 'Finished') {
      setStatus('Not Started');
    }
  };

  const handleAddCollection = () => {
    const name = pendingCollectionName.trim();

    if (!name) return;
    if (collections.includes(name)) return;

    const nextCollections = [...collections, name];
    setCollections(nextCollections);

    if (collectionAddMode === 'existing') {
      const nextAddable = availableCollections.find(
        (collection) => !nextCollections.includes(collection),
      );

      setPendingCollectionName(nextAddable ?? '');

      if (!nextAddable) {
        setCollectionAddMode('new');
      }
    } else {
      setPendingCollectionName('');
    }
  };

  const handleRemoveCollection = (collectionName: string) => {
    setCollections((prev) => prev.filter((name) => name !== collectionName));

    if (collectionAddMode === 'existing' && !pendingCollectionName) {
      setPendingCollectionName(collectionName);
    }
  };

  const handleSave = () => {
    onSave({
      id: row.id,
      status,
      progress,
      rating,
      notes,
      collections,
      dateAdded: dateAdded ? dateAdded.toISOString() : null,
      startedAt: startedAt ? startedAt.toISOString() : null,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleRequestClose}
      slotProps={{
        paper: {
          sx: styles.drawerPaper,
        },
      }}
    >
      <Box sx={styles.scrollableContent}>
        <Box sx={styles.headerRow}>
          <Typography variant="h6">Edit Book</Typography>

          <IconButton onClick={handleRequestClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Box sx={styles.bookRow}>
        {row.cover && (
          <Box
            component="img"
            src={row.cover}
            alt={row.title}
            sx={styles.cover}
          />
        )}

        <Box sx={styles.titleBlock}>
          <Typography sx={styles.title}>{row.title}</Typography>
          <Typography sx={styles.author}>{row.author}</Typography>
        </Box>
      </Box>

      <Box sx={styles.section}>
        <Typography sx={styles.sectionTitle}>Status</Typography>
        <StatusButtonGroup value={status} onChange={setStatus} />
      </Box>

      <Box sx={styles.section}>
        <Typography sx={styles.sectionTitle}>Progress</Typography>

        <Box sx={styles.progressRow}>
          <Slider
            value={progress}
            min={0}
            max={100}
            step={1}
            onChange={(_, value) => handleProgressChange(value as number)}
          />

          <TextField
            size="small"
            value={progress}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (!Number.isNaN(next)) {
                handleProgressChange(next);
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={styles.section}>
        <CollectionEditor
          title="Collections"
          helperText="Click the x to remove this book from a collection."
          emptyText="This book is not in any collections yet."
          collections={collections}
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

      <Box sx={styles.section}>
        <Typography sx={styles.sectionTitle}>Rating</Typography>

        <Box sx={styles.ratingRow}>
          <Rating
            value={rating}
            onChange={(_, value) => setRating(value ?? 0)}
          />
          <Button size="small" onClick={() => setRating(0)}>
            Clear
          </Button>
        </Box>
      </Box>

      <Box sx={styles.section}>
        <Typography sx={styles.sectionTitle}>Notes / Review</Typography>

        <TextField
          fullWidth
          multiline
          minRows={4}
          placeholder="Add notes, review thoughts, difficulty, recommendations..."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </Box>

      <Box sx={styles.section}>
        <Typography sx={styles.sectionTitle}>Book Details</Typography>

        <Box sx={styles.metaGrid}>
          <TextField
            label="Published"
            value={row.publishedYear ?? '—'}
            size="small"
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />

          <TextField
            label="Pages"
            value={row.pageCount ?? '—'}
            size="small"
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />

          <DatePicker
            label="Date Added"
            value={dateAdded}
            onChange={setDateAdded}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />

          <DatePicker
            label="Started Reading"
            value={startedAt}
            onChange={setStartedAt}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
        </Box>
      </Box>
      </Box>

      <Box sx={styles.footer}>
        <Button color="error" onClick={() => onDelete(row)}>
          Remove
        </Button>

        <Box sx={styles.footerActions}>
          <Button onClick={handleRequestClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Box>

      <Dialog open={discardOpen} onClose={() => setDiscardOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Discard changes?</DialogTitle>
        <DialogContent>
          <Typography>You have unsaved changes. Leave without saving?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDiscardOpen(false)}>Keep editing</Button>
          <Button color="error" variant="contained" onClick={handleDiscard}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}
