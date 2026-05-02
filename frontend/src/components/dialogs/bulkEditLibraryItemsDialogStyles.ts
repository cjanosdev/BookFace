import type { Theme } from '@mui/material/styles';

export const styles = {
  description: (theme: Theme) => ({
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: 14,
  }),

  section: (theme: Theme) => ({
    padding: theme.spacing(1.5, 0),
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  }),

  sectionHeader: (theme: Theme) => ({
    marginBottom: theme.spacing(1),
  }),

  fieldWrapper: (theme: Theme) => ({
    marginTop: theme.spacing(1),
  }),

  progressRow: (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 80px',
    gap: theme.spacing(1.5),
    alignItems: 'center',
  }),

  ratingRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  }),
};
