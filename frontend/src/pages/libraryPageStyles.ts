import type { Theme } from '@mui/material/styles';
import { commonStyles } from '../styles/commonStyles';

export const styles = {
  pageContainer: (theme: Theme) => ({
    ...commonStyles.pageContainer(theme),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
  }),

  headerRow: (theme: Theme) => ({
    ...commonStyles.toolbarRow(theme),
  }),

  titleBlock: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.25),
  }),

  title: (theme: Theme) => ({
    ...commonStyles.sectionTitle(theme),
  }),

  subtitle: (theme: Theme) => ({
    ...commonStyles.sectionSubtitle(theme),
  }),

  actionsRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  }),

  contentPanel: (theme: Theme) => ({
    ...commonStyles.panel(theme),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    minHeight: 400,
  }),

  toolbar: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  }),

  leftToolbar: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  }),

  rightToolbar: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  }),
};
