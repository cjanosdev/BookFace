import type { Theme } from '@mui/material/styles';

export const styles = {
  card: (theme: Theme) => ({
    borderRadius: 3,
    border: `1px solid ${theme.palette.grey[200]}`,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'box-shadow 0.15s ease',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
    display: 'flex',
    flexDirection: 'column',
  }),

  mosaic: () => ({
    width: '100%',
    aspectRatio: '16 / 9',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  }),

  mosaicSingle: () => ({
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  mosaicImg: () => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    display: 'block',
  }),

  placeholderIcon: (theme: Theme) => ({
    fontSize: 56,
    color: theme.palette.grey[400],
  }),

  cardBody: (theme: Theme) => ({
    padding: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
  }),

  cardMeta: () => ({
    minWidth: 0,
    flex: 1,
  }),

  cardName: () => ({
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  }),

  cardCount: (theme: Theme) => ({
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginTop: 2,
  }),

  moreMenuButton: () => ({
    flexShrink: 0,
    padding: 4,
  }),
};
