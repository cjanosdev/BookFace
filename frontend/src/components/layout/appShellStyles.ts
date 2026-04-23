import type { Theme } from '@mui/material/styles';

export const styles = {
  root: (_theme: Theme) => ({
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: 'background.default',
  }),

  main: (theme: Theme) => ({
    flex: 1,
    minWidth: 0,
    padding: theme.spacing(3),
  }),
};
