import type { Theme } from '@mui/material/styles';

export const styles = {
  container: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(3),
    overflowY: 'auto',
  }),

  headerRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
  }),

  titleBlock: () => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  }),

  title: () => ({
    fontWeight: 800,
    fontSize: 28,
    lineHeight: 1.1,
  }),

  subtitle: (theme: Theme) => ({
    fontSize: 14,
    color: theme.palette.text.secondary,
  }),

  grid: (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: theme.spacing(2),
  }),

  emptyState: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(8),
    color: theme.palette.text.secondary,
  }),

  emptyIcon: () => ({
    fontSize: 64,
    opacity: 0.3,
  }),
};
