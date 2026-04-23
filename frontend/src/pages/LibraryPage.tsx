import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppShell from '../components/layout/AppShell';
import { styles } from './libraryPageStyles';

export default function LibraryPage() {
  return (
    <AppShell>
      <Box sx={styles.pageContainer}>
        {/* Header */}
        <Box sx={styles.headerRow}>
          <Box sx={styles.titleBlock}>
            <Typography variant="h4" sx={styles.title}>
              My Library
            </Typography>

            <Typography variant="body2" sx={styles.subtitle}>
              132 books
            </Typography>
          </Box>

          <Box sx={styles.actionsRow}>
            <Button variant="contained">Add Book</Button>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={styles.contentPanel}>
          {/* Toolbar */}
          <Box sx={styles.toolbar}>
            <Box sx={styles.leftToolbar}>
              <Typography variant="body2">Search</Typography>
            </Box>

            <Box sx={styles.rightToolbar}>
              <Button size="small">Filter</Button>
              <Button size="small">Sort</Button>
            </Box>
          </Box>

          {/* Placeholder */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              Library content will go here (table/grid)
            </Typography>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}
