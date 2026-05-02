import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { LibraryRow } from '../../store/library/libraryDataContracts';
import { styles } from './statusButtonGroupStyles';

type Props = {
  value: LibraryRow['status'];
  onChange: (value: LibraryRow['status']) => void;
};

const STATUSES: LibraryRow['status'][] = [
  'Not Started',
  'Reading',
  'Finished',
  'Dropped',
];

export default function StatusButtonGroup({ value, onChange }: Props) {
  return (
    <Box sx={styles.statusGrid}>
      {STATUSES.map((status) => (
        <Button
          key={status}
          variant={value === status ? 'contained' : 'outlined'}
          sx={styles.statusButton}
          onClick={() => onChange(status)}
        >
          {status}
        </Button>
      ))}
    </Box>
  );
}
