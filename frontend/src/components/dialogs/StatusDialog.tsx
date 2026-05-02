import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StatusButtonGroup from '../common/StatusButtonGroup';

export type Status = 'Reading' | 'Finished' | 'Dropped' | 'Not Started';

type Props = {
  open: boolean;
  value: Status;
  onChange: (value: Status) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function StatusDialog({
  open,
  value,
  onChange,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Status</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Select a new status for the selected books.
        </Typography>
        <StatusButtonGroup value={value} onChange={onChange} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
