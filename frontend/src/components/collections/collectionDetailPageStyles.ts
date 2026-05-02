import type { Theme } from '@mui/material/styles';

export const styles = {
  container: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
  }),

  headerRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    flexShrink: 0,
  }),

  backButton: () => ({
    flexShrink: 0,
    marginTop: 2,
  }),

  headerMeta: () => ({
    minWidth: 0,
    flex: 1,
  }),

  title: () => ({
    fontWeight: 800,
    fontSize: 28,
    lineHeight: 1.1,
  }),

  description: (theme: Theme) => ({
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  }),

  subtitle: (theme: Theme) => ({
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.25),
  }),
};
