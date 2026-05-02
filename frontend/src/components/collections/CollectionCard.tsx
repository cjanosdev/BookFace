import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useNavigate } from 'react-router-dom';
import type { CollectionSummary } from '../../store/collections/collectionsDataContracts';
import { styles } from './collectionCardStyles';

type Props = {
  collection: CollectionSummary;
  onRename: (id: string, currentName: string) => void;
  onDelete: (id: string) => void;
};

export default function CollectionCard({
  collection,
  onRename,
  onDelete,
}: Props) {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleCardClick = () => {
    navigate(`/collections/${collection.id}`);
  };

  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  const handleRename = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onRename(collection.id, collection.name);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onDelete(collection.id);
  };

  const renderMosaic = () => {
    const covers = collection.coverUrls.filter(Boolean);

    if (covers.length === 0) {
      return (
        <Box sx={styles.mosaicSingle}>
          <AutoStoriesRoundedIcon sx={styles.placeholderIcon} />
        </Box>
      );
    }

    if (covers.length === 1) {
      return (
        <Box sx={styles.mosaicSingle}>
          <Box component="img" src={covers[0]} alt="" sx={styles.mosaicImg} />
        </Box>
      );
    }

    return (
      <Box sx={styles.mosaic}>
        {covers.slice(0, 4).map((url, i) => (
          <Box key={i} component="img" src={url} alt="" sx={styles.mosaicImg} />
        ))}
      </Box>
    );
  };

  return (
    <Box sx={styles.card} onClick={handleCardClick}>
      {renderMosaic()}

      <Box sx={styles.cardBody}>
        <Box sx={styles.cardMeta}>
          <Typography sx={styles.cardName}>{collection.name}</Typography>
          <Typography sx={styles.cardCount}>
            {collection.bookCount}{' '}
            {collection.bookCount === 1 ? 'book' : 'books'}
          </Typography>
        </Box>

        <IconButton
          sx={styles.moreMenuButton}
          onClick={handleMoreMenuClick}
          size="small"
        >
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
