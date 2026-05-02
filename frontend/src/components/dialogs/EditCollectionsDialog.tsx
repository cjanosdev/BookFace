import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CollectionEditor, {
  type CollectionAddMode,
} from '../common/CollectionEditor';

type EditCollectionsDialogProps = {
  open: boolean;
  selectedCollections: string[];
  availableCollections: string[];
  addMode: CollectionAddMode;
  value: string;
  onAddModeChange: (mode: CollectionAddMode) => void;
  onValueChange: (value: string) => void;
  onRemoveCollection: (collectionName: string) => void;
  onAddCollection: () => void;
  onClose: () => void;
};

export default function EditCollectionsDialog({
  open,
  selectedCollections,
  availableCollections,
  addMode,
  value,
  onAddModeChange,
  onValueChange,
  onRemoveCollection,
  onAddCollection,
  onClose,
}: EditCollectionsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Collections</DialogTitle>

      <DialogContent>
        <CollectionEditor
          title="Collections on selected books"
          helperText="Click the x on a collection to remove it from all selected books that currently have it."
          emptyText="None of the selected books are currently in any collections."
          collections={selectedCollections}
          availableCollections={availableCollections}
          addMode={addMode}
          value={value}
          onAddModeChange={onAddModeChange}
          onValueChange={onValueChange}
          onRemoveCollection={onRemoveCollection}
          onAddCollection={onAddCollection}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}
