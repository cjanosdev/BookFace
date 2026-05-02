import type { Theme } from '@mui/material/styles';

export const styles = {
  root: () => ({
    width: '100%',
  }),

  section: (theme: Theme) => ({
    marginBottom: theme.spacing(2.5),
  }),

  sectionTitle: (theme: Theme) => ({
    fontSize: 13,
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  }),

  sectionHelper: (theme: Theme) => ({
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.25),
    lineHeight: 1.4,
  }),

  chipRow: (theme: Theme) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    minHeight: 36,
  }),

  collectionChip: () => ({
    borderRadius: 999,
  }),

  emptyState: (theme: Theme) => ({
    fontSize: 13,
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  }),

  addModeGroup: () => ({
    marginBottom: 0,
  }),

  fieldWrapper: (theme: Theme) => ({
    marginTop: theme.spacing(1.25),
  }),

  addButtonRow: (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1.25),
  }),
};
