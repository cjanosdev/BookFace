import Box from '@mui/material/Box';
import { styles } from './libraryStyles';

export default function LibraryContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box sx={styles.libraryContainer}>{children}</Box>;
}
