import type { Theme } from '@mui/material/styles';

export const styles = {
  statusGrid: (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(1),
  }),

  statusButton: () => ({
    textTransform: 'none',
    borderRadius: 10,
  }),
};
