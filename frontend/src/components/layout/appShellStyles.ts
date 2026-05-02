import type { Theme } from '@mui/material/styles';

export const styles = {
  root: () => ({
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: 'background.default',
    width: '100%',
  }),

  main: (theme: Theme) => ({
    flex: 1,
    minWidth: 0,
    width: '100%',
    padding: theme.spacing(3),
    overflow: 'hidden',
  }),
};
