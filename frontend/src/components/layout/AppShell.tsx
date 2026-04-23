import Box from '@mui/material/Box';
import type { PropsWithChildren } from 'react';
import SidebarNav from './SidebarNav';
import { styles } from './appShellStyles';

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <Box sx={styles.root}>
      <SidebarNav />
      <Box component="main" sx={styles.main}>
        {children}
      </Box>
    </Box>
  );
}
