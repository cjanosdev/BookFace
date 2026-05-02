import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
} from '@mui/x-data-grid';
import { styles } from './libraryStyles';
import type { LibraryRow } from '../../store/library/libraryDataContracts';

type LibraryContentAreaProps = {
  rows: LibraryRow[];
  loading: boolean;
  rowSelectionModel: GridRowSelectionModel;
  onSelectionChange: (model: GridRowSelectionModel) => void;
  onOpenEditItem: (row: LibraryRow) => void;
};

function getStatusClassName(status: LibraryRow['status']) {
  switch (status) {
    case 'Reading':
      return 'reading';
    case 'Finished':
      return 'finished';
    case 'Dropped':
      return 'dropped';
    case 'Not Started':
      return 'notstarted';
    default:
      return '';
  }
}

function renderStars(rating: number) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

export default function LibraryContentArea({
  rows,
  loading,
  rowSelectionModel,
  onSelectionChange,
  onOpenEditItem,
}: LibraryContentAreaProps) {
  const columns = useMemo<GridColDef<LibraryRow>[]>(() => [
    {
      field: 'title',
      headerName: 'BOOK',
      flex: 1.6,
      minWidth: 260,
      sortable: false,
      renderCell: (params) => (
        <Box sx={styles.bookCell}>
          {params.row.cover && (
            <Box
              component="img"
              src={params.row.cover}
              alt={params.row.title}
              sx={styles.bookCover}
            />
          )}

          <Box sx={styles.bookMeta}>
            <Typography sx={styles.bookTitle}>{params.row.title}</Typography>
            <Typography sx={styles.bookAuthor}>{params.row.author}</Typography>
          </Box>

          <EditRoundedIcon sx={styles.rowEditHint} />
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 0.75,
      minWidth: 110,
      sortable: false,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          className={getStatusClassName(params.row.status)}
          sx={styles.statusChip}
          size="small"
        />
      ),
    },
    {
      field: 'progress',
      headerName: 'PROGRESS',
      flex: 0.9,
      minWidth: 140,
      renderCell: (params) => (
        <Box sx={styles.progressCell}>
          <LinearProgress
            variant="determinate"
            value={params.row.progress}
            sx={styles.progressBar}
          />
          <Typography sx={styles.progressText}>
            {params.row.progress}%
          </Typography>
        </Box>
      ),
    },
    {
      field: 'collections',
      headerName: 'COLLECTIONS',
      flex: 1.3,
      minWidth: 190,
      sortable: false,
      renderCell: (params) => (
        <Box sx={styles.collectionsCell}>
          {params.row.collections.slice(0, 2).map((collection) => (
            <Chip
              key={collection}
              label={collection}
              size="small"
              sx={styles.collectionChip}
            />
          ))}

          {params.row.collections.length > 2 && (
            <Chip
              label={`+${params.row.collections.length - 2}`}
              size="small"
              sx={styles.collectionChip}
            />
          )}
        </Box>
      ),
    },
    {
      field: 'rating',
      headerName: 'RATING',
      flex: 0.65,
      minWidth: 100,
      renderCell: (params) => (
        <Typography sx={styles.rating}>
          {renderStars(params.row.rating)}
        </Typography>
      ),
    },
    {
      field: 'added',
      headerName: 'ADDED',
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) => (
        <Typography sx={styles.dateText}>
          {params.row.added
            ? new Date(params.row.added).toLocaleDateString()
            : '—'}
        </Typography>
      ),
    },
  ], []);

  return (
    <Box>
      <DataGrid
        rows={rows}
        loading={loading}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowClick={(params) => onOpenEditItem(params.row)}
        pageSizeOptions={[8, 16, 32]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8, page: 0 },
          },
        }}
        rowHeight={96}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={onSelectionChange}
        sx={styles.dataGrid}
      />
    </Box>
  );
}
