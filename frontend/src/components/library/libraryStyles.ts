import type { Theme } from '@mui/material/styles';
import { commonStyles } from '../styles/commonStyles';

export const styles = {
  libraryContainer: (theme: Theme) => ({
    ...commonStyles.pageContainer(theme),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
  }),

  headerRow: (theme: Theme) => ({
    ...commonStyles.toolbarRow(theme),
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  }),

  titleBlock: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  }),

  title: (theme: Theme) => ({
    ...commonStyles.sectionTitle(theme),
  }),

  subtitle: (theme: Theme) => ({
    ...commonStyles.sectionSubtitle(theme),
  }),

  headerActions: (theme: Theme) => ({
    ...commonStyles.row(theme),
    gap: theme.spacing(1),
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
  }),

  searchField: (theme: Theme) => ({
    width: 280,
    '& .MuiOutlinedInput-root': {
      height: 40,
      borderRadius: 12,
      backgroundColor: theme.palette.background.paper,
    },
    '& .MuiInputBase-input': {
      fontSize: 14,
    },
  }),

  actionButton: (theme: Theme) => ({
    textTransform: 'none',
    borderRadius: 10,
    height: 40,
    minWidth: 72,
    fontSize: 14,
    fontWeight: 500,
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  }),

  primaryButton: () => ({
    textTransform: 'none',
    borderRadius: 10,
    height: 40,
    minWidth: 132,
    fontSize: 14,
    fontWeight: 600,
  }),

  contentPanel: (theme: Theme) => ({
    ...commonStyles.panel(theme),
    display: 'flex',
    flexDirection: 'column',
  }),

  tabsRow: (theme: Theme) => ({
    ...commonStyles.row(theme),
    gap: theme.spacing(3),
    padding: theme.spacing(2, 2, 0, 2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  }),

  tab: (theme: Theme) => ({
    paddingBottom: theme.spacing(1.5),
    fontWeight: 500,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    borderBottom: '2px solid transparent',

    '&.active': {
      color: theme.palette.primary.main,
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  }),

  bulkBar: (theme: Theme) => ({
    ...commonStyles.toolbarRow(theme),
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    gap: theme.spacing(2),
    minHeight: 58,
    backgroundColor: '#FAFBFC',
  }),

  bulkLeft: (theme: Theme) => ({
    ...commonStyles.row(theme),
    gap: theme.spacing(2),
    flexWrap: 'wrap',
  }),

  bulkRight: (theme: Theme) => ({
    ...commonStyles.row(theme),
    gap: theme.spacing(1),
  }),

  bulkMetaText: (theme: Theme) => ({
    fontSize: 14,
    color: theme.palette.text.primary,
  }),

  bulkButton: (theme: Theme) => ({
    textTransform: 'none',
    borderRadius: 10,
    minWidth: 0,
    height: 36,
    fontSize: 14,
    fontWeight: 500,
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  }),

  bulkButtonDisabled: (theme: Theme) => ({
    textTransform: 'none',
    borderRadius: 10,
    minWidth: 0,
    height: 36,
    fontSize: 14,
    fontWeight: 500,
    borderColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[100],
  }),

  addBookButtonGroup: () => ({
    borderRadius: 10,
    overflow: 'hidden',
  }),

  bookCell: (theme: Theme) => ({
    ...commonStyles.row(theme),
    gap: theme.spacing(1.5),
  }),

  bookCover: () => ({
    width: 40,
    height: 60,
    borderRadius: 6,
    objectFit: 'cover',
    display: 'block',
  }),

  bookMeta: () => ({
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    flex: 1,
  }),

  rowEditHint: (theme: Theme) => ({
    fontSize: 15,
    color: theme.palette.primary.main,
    opacity: 0,
    flexShrink: 0,
    transition: 'opacity 0.15s ease',
    '.MuiDataGrid-row:hover &': {
      opacity: 1,
    },
  }),

  bookTitle: () => ({
    fontWeight: 600,
    whiteSpace: 'normal',
    lineHeight: 1.3,
  }),

  bookAuthor: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
  }),

  statusChip: () => ({
    ...commonStyles.chipBase(),

    '&.reading': {
      backgroundColor: '#E8EDFF',
      color: '#4F6EF7',
    },

    '&.finished': {
      backgroundColor: '#E6F4EA',
      color: '#1E7A3E',
    },

    '&.dropped': {
      backgroundColor: '#FDE8E8',
      color: '#D92D20',
    },

    '&.notstarted': {
      backgroundColor: '#f5e8fd',
      color: '#8920d9',
    },
  }),

  progressCell: (theme: Theme) => ({
    ...commonStyles.row(theme),
    gap: theme.spacing(1),
    width: '100%',
    minWidth: 0,
  }),

  progressBar: (theme: Theme) => ({
    ...commonStyles.progressBarBase(),
    flex: 1,
    backgroundColor: '#E5E7EB',
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.primary.main,
    },
  }),

  progressText: (theme: Theme) => ({
    fontSize: 12,
    color: theme.palette.text.secondary,
    minWidth: 40,
    textAlign: 'right',
  }),

  collectionsCell: (theme: Theme) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    minWidth: 0,
    overflow: 'hidden',
  }),

  collectionChip: () => ({
    ...commonStyles.chipBase(),
    backgroundColor: '#F2F4F7',
    maxWidth: '100%',
  }),

  rating: () => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: '#F59E0B',
    fontSize: 14,
  }),

  dataGrid: (theme: Theme) => ({
    border: 'none',

    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'transparent',
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      fontSize: 12,
      fontWeight: 600,
      color: theme.palette.text.secondary,
      minHeight: 56,
    },

    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
      fontSize: 12,
      color: theme.palette.text.secondary,
    },

    '& .MuiDataGrid-cell': {
      ...commonStyles.tableCell(theme),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },

    '& .MuiDataGrid-row': {
      minHeight: 82,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },

    '& .MuiDataGrid-footerContainer': {
      borderTop: `1px solid ${theme.palette.grey[200]}`,
    },

    '& .MuiCheckbox-root': {
      color: theme.palette.grey[400],
    },

    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },

    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  }),

  dateText: (theme: Theme) => ({
    fontSize: 12,
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  }),
};
