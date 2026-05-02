import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styles } from './libraryStyles';

export type LibraryFilter = 'all' | 'rated' | 'unrated' | 'inCollection';
export type LibrarySort =
  | 'titleAsc'
  | 'titleDesc'
  | 'dateNewest'
  | 'dateOldest'
  | 'ratingHigh'
  | 'ratingLow';

type LibraryHeaderProps = {
  totalBooks: number;
  searchValue: string;
  filterValue: LibraryFilter;
  sortValue: LibrarySort;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: LibraryFilter) => void;
  onSortChange: (value: LibrarySort) => void;
};

export default function LibraryHeader({
  totalBooks,
  searchValue,
  filterValue,
  sortValue,
  onSearchChange,
  onFilterChange,
  onSortChange,
}: LibraryHeaderProps) {
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box sx={styles.headerRow}>
      <Box sx={styles.titleBlock}>
        <Typography variant="h4" sx={styles.title}>
          My Library
        </Typography>

        <Typography variant="body2" sx={styles.subtitle}>
          {totalBooks} books
        </Typography>
      </Box>

      <Box sx={styles.headerActions}>
        <TextField
          size="small"
          placeholder="Search your library..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          sx={styles.searchField}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          variant="outlined"
          sx={styles.actionButton}
          startIcon={<FilterListRoundedIcon />}
          onClick={(event) => setFilterAnchorEl(event.currentTarget)}
        >
          Filter
        </Button>

        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={() => setFilterAnchorEl(null)}
        >
          <MenuItem
            selected={filterValue === 'all'}
            onClick={() => {
              onFilterChange('all');
              setFilterAnchorEl(null);
            }}
          >
            All books
          </MenuItem>

          <MenuItem
            selected={filterValue === 'rated'}
            onClick={() => {
              onFilterChange('rated');
              setFilterAnchorEl(null);
            }}
          >
            Rated
          </MenuItem>

          <MenuItem
            selected={filterValue === 'unrated'}
            onClick={() => {
              onFilterChange('unrated');
              setFilterAnchorEl(null);
            }}
          >
            Unrated
          </MenuItem>

          <Divider />

          <MenuItem
            selected={filterValue === 'inCollection'}
            onClick={() => {
              onFilterChange('inCollection');
              setFilterAnchorEl(null);
            }}
          >
            In a collection
          </MenuItem>
        </Menu>

        <Button
          variant="outlined"
          sx={styles.actionButton}
          startIcon={<SwapVertRoundedIcon />}
          onClick={(event) => setSortAnchorEl(event.currentTarget)}
        >
          Sort
        </Button>

        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={() => setSortAnchorEl(null)}
        >
          <MenuItem
            selected={sortValue === 'titleAsc'}
            onClick={() => {
              onSortChange('titleAsc');
              setSortAnchorEl(null);
            }}
          >
            Title A-Z
          </MenuItem>

          <MenuItem
            selected={sortValue === 'titleDesc'}
            onClick={() => {
              onSortChange('titleDesc');
              setSortAnchorEl(null);
            }}
          >
            Title Z-A
          </MenuItem>

          <Divider />

          <MenuItem
            selected={sortValue === 'dateNewest'}
            onClick={() => {
              onSortChange('dateNewest');
              setSortAnchorEl(null);
            }}
          >
            Newest added
          </MenuItem>

          <MenuItem
            selected={sortValue === 'dateOldest'}
            onClick={() => {
              onSortChange('dateOldest');
              setSortAnchorEl(null);
            }}
          >
            Oldest added
          </MenuItem>

          <Divider />

          <MenuItem
            selected={sortValue === 'ratingHigh'}
            onClick={() => {
              onSortChange('ratingHigh');
              setSortAnchorEl(null);
            }}
          >
            Highest rating
          </MenuItem>

          <MenuItem
            selected={sortValue === 'ratingLow'}
            onClick={() => {
              onSortChange('ratingLow');
              setSortAnchorEl(null);
            }}
          >
            Lowest rating
          </MenuItem>
        </Menu>

        <ButtonGroup variant="contained" sx={styles.addBookButtonGroup}>
          <Button sx={styles.primaryButton}>Add Book</Button>
          <Button sx={styles.primaryButton}>
            <KeyboardArrowDownRoundedIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
