import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { styles } from './libraryStyles';
import { Checkbox } from '@mui/material';
import type { LibraryTab } from '../../store/library/libraryDataContracts';

type Props = {
  activeTab: LibraryTab;
  onTabChange: (tab: LibraryTab) => void;
  selectedCount: number;
  onOpenEditStatus: () => void;
  onBulkRemove: () => void;
  onOpenEditCollections: () => void;
  onOpenBulkEdit: () => void;
  onRemoveFromCollection?: () => void;
};

export default function LibraryToolbar({
  activeTab,
  onTabChange,
  selectedCount,
  onOpenEditStatus,
  onBulkRemove,
  onOpenEditCollections,
  onOpenBulkEdit,
  onRemoveFromCollection,
}: Props) {
  const hasSelection = selectedCount > 0;
  const tabs: LibraryTab[] = [
    'All Books',
    'Currently Reading',
    'Want to Read',
    'Finished',
    'Dropped',
  ];

  return (
    <>
      {/* Tabs */}
      <Box sx={styles.tabsRow}>
        {tabs.map((tab) => (
          <Box
            key={tab}
            sx={styles.tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </Box>
        ))}
      </Box>

      {/* Bulk actions */}
      <Box sx={styles.bulkBar}>
        <Box sx={styles.bulkLeft}>
          <Checkbox size="small" />
          <Typography sx={styles.bulkMetaText}>
            {selectedCount} selected
          </Typography>

          <Button
            size="small"
            variant="outlined"
            disabled={!hasSelection}
            sx={hasSelection ? styles.bulkButton : styles.bulkButtonDisabled}
            startIcon={<EditOutlinedIcon />}
            onClick={onOpenEditStatus}
          >
            Edit Status
          </Button>

          <Button
            size="small"
            variant="outlined"
            disabled={!hasSelection}
            sx={hasSelection ? styles.bulkButton : styles.bulkButtonDisabled}
            startIcon={<CollectionsBookmarkOutlinedIcon />}
            onClick={onOpenEditCollections}
          >
            Edit Collections
          </Button>

          {onRemoveFromCollection && (
            <Button
              size="small"
              variant="outlined"
              disabled={!hasSelection}
              sx={hasSelection ? styles.bulkButton : styles.bulkButtonDisabled}
              startIcon={<CollectionsBookmarkOutlinedIcon />}
              onClick={onRemoveFromCollection}
            >
              Remove from Collection
            </Button>
          )}

          <Button
            size="small"
            variant="outlined"
            disabled={!hasSelection}
            sx={hasSelection ? styles.bulkButton : styles.bulkButtonDisabled}
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={onBulkRemove}
          >
            Remove
          </Button>
        </Box>

        <Box sx={styles.bulkRight}>
          <Button
            variant="outlined"
            size="small"
            sx={styles.bulkButton}
            startIcon={<TuneRoundedIcon />}
            disabled={!hasSelection}
            onClick={onOpenBulkEdit}
          >
            Bulk Edit
          </Button>
        </Box>
      </Box>
    </>
  );
}
