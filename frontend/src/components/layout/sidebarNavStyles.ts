import type { Theme } from '@mui/material/styles';

export const styles = {
  container: (theme: Theme) => ({
    width: 248,
    minWidth: 248,
    flexShrink: 0,
    height: '100vh',
    position: 'sticky',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.grey[200]}`,
  }),

  topSection: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }),

  brandRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1, 1),
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  }),

  brandIconBox: (theme: Theme) => ({
    width: 40,
    height: 40,
    borderRadius: 2.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }),

  brandTitle: (theme: Theme) => ({
    fontWeight: 700,
    color: theme.palette.text.primary,
  }),

  navList: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  }),

  navButton: (theme: Theme) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1.5),
    borderRadius: 3,
    padding: theme.spacing(1.25, 1.5),
    color: theme.palette.text.secondary,
    textAlign: 'left',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease',

    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },

    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }),

  navButtonDisabled: (theme: Theme) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1.5),
    borderRadius: 3,
    padding: theme.spacing(1.25, 1.5),
    color: theme.palette.text.disabled,
    cursor: 'default',
    userSelect: 'none',
  }),

  navIcon: () => ({
    fontSize: 20,
    flexShrink: 0,
  }),

  navLabel: () => ({
    fontWeight: 600,
  }),

  bottomSection: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }),

  divider: (theme: Theme) => ({
    borderColor: theme.palette.grey[200],
  }),

  profileRow: (theme: Theme) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(0.75),
    padding: theme.spacing(1.25, 0),
    borderRadius: 3,
    border: '2px solid transparent',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '14',
      borderColor: theme.palette.primary.main + '60',
    },
  }),

  profileMeta: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 0,
  }),

  profileName: () => ({
    fontWeight: 600,
    lineHeight: 1.2,
  }),

  profileLink: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
  }),
};
