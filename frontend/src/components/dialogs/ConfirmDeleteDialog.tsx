import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

type Props = {
  open: boolean;
  count: number;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteDialog({
  open,
  count,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Remove books?</DialogTitle>

      <DialogContent>
        <Typography>
          Remove {count} {count === 1 ? 'book' : 'books'} from your library?
        </Typography>

        <Typography sx={{ mt: 1 }} color="text.secondary">
          This will also remove them from any collections. You can undo for a
          few seconds after removing.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}
