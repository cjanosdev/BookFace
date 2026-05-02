import type { Theme } from '@mui/material/styles';

export const styles = {
  drawerPaper: () => ({
    width: 460,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }),

  scrollableContent: (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(3),
    paddingBottom: 0,
  }),

  headerRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  }),

  bookRow: (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(3),
  }),

  cover: () => ({
    width: 52,
    height: 78,
    borderRadius: 8,
    objectFit: 'cover',
    display: 'block',
  }),

  titleBlock: () => ({
    minWidth: 0,
  }),

  title: () => ({
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.2,
  }),

  author: (theme: Theme) => ({
    fontSize: 13,
    color: theme.palette.text.secondary,
    marginTop: 4,
  }),

  section: (theme: Theme) => ({
    marginBottom: theme.spacing(3),
  }),

  sectionTitle: (theme: Theme) => ({
    fontSize: 13,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  }),

  statusGrid: (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(1),
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

  metaGrid: (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(1.5),
    alignItems: 'start',
  }),


  footer: (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.background.paper,
    flexShrink: 0,
  }),

  footerActions: (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(1),
  }),

};
