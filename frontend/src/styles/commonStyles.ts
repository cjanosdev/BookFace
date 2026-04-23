import type { Theme } from '@mui/material/styles';

export const commonStyles = {
  panel: (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 3,
    boxShadow: '0 1px 2px rgba(16, 24, 40, 0.04)',
  }),

  toolbarRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  }),

  row: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  }),

  pageContainer: (theme: Theme) => ({
    padding: theme.spacing(3),
  }),

  sectionTitle: (theme: Theme) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary,
  }),

  sectionSubtitle: (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),
};

export const listHeaderFooterBase = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.background.paper,
});
