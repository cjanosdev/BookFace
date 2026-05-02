import Box from '@mui/material/Box';
import { styles } from './libraryStyles';

export default function LibraryContentPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box sx={styles.contentPanel}>{children}</Box>;
}
