import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styles } from './collectionEditorStyles';

export type CollectionAddMode = 'existing' | 'new';

type Props = {
  title?: string;
  helperText?: string;
  emptyText?: string;
  collections: string[];
  availableCollections: string[];
  addMode: CollectionAddMode;
  value: string;
  onAddModeChange: (mode: CollectionAddMode) => void;
  onValueChange: (value: string) => void;
  onRemoveCollection: (collectionName: string) => void;
  onAddCollection: () => void;
};

export default function CollectionEditor({
  title = 'Collections',
  helperText = 'Click the x on a collection to remove it.',
  emptyText = 'No collections yet.',
  collections,
  availableCollections,
  addMode,
  value,
  onAddModeChange,
  onValueChange,
  onRemoveCollection,
  onAddCollection,
}: Props) {
  const sortedCollections = useMemo(
    () => [...collections].sort((a, b) => a.localeCompare(b)),
    [collections],
  );

  const sortedAvailableCollections = useMemo(
    () => [...availableCollections].sort((a, b) => a.localeCompare(b)),
    [availableCollections],
  );

  const canAdd =
    addMode === 'existing' ? Boolean(value) : Boolean(value.trim());

  return (
    <Box sx={styles.root}>
      <Box sx={styles.section}>
        <Typography sx={styles.sectionTitle}>{title}</Typography>
        <Typography sx={styles.sectionHelper}>{helperText}</Typography>

        <Box sx={styles.chipRow}>
          {sortedCollections.length > 0 ? (
            sortedCollections.map((collection) => (
              <Chip
                key={collection}
                label={collection}
                onDelete={() => onRemoveCollection(collection)}
                sx={styles.collectionChip}
              />
            ))
          ) : (
            <Typography sx={styles.emptyState}>{emptyText}</Typography>
          )}
        </Box>
      </Box>

      <Box sx={styles.section}>
        <Typography sx={styles.sectionTitle}>Add collection</Typography>

        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            value={addMode}
            onChange={(event) =>
              onAddModeChange(event.target.value as CollectionAddMode)
            }
            sx={styles.addModeGroup}
          >
            <FormControlLabel
              value="existing"
              control={<Radio />}
              label="Add an existing collection"
              disabled={sortedAvailableCollections.length === 0}
            />

            <FormControlLabel
              value="new"
              control={<Radio />}
              label="Create a new collection"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={styles.fieldWrapper}>
          {addMode === 'existing' ? (
            <FormControl
              fullWidth
              disabled={sortedAvailableCollections.length === 0}
            >
              <InputLabel id="collection-editor-existing-label">
                Collection
              </InputLabel>
              <Select
                labelId="collection-editor-existing-label"
                value={value}
                label="Collection"
                onChange={(event) => onValueChange(event.target.value)}
              >
                {sortedAvailableCollections.map((collection) => (
                  <MenuItem key={collection} value={collection}>
                    {collection}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              label="New collection name"
              value={value}
              onChange={(event) => onValueChange(event.target.value)}
            />
          )}
        </Box>

        <Box sx={styles.addButtonRow}>
          <Button
            variant="outlined"
            onClick={onAddCollection}
            disabled={!canAdd}
          >
            Add Collection
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
