import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { NavLink } from 'react-router-dom';
import { primaryNavItems, secondaryNavItems } from './navItems';
import { styles } from './sidebarNavStyles';

export default function SidebarNav() {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.topSection}>
        <Box sx={styles.brandRow}>
          <Box sx={styles.brandIconBox}>
            <AutoStoriesRoundedIcon />
          </Box>
          <Typography variant="h6" sx={styles.brandTitle}>
            BookFace
          </Typography>
        </Box>

        <Box sx={styles.navList}>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <ButtonBase
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={styles.navButton}
              >
                <Icon sx={styles.navIcon} />
                <Typography variant="body2" sx={styles.navLabel}>
                  {item.label}
                </Typography>
              </ButtonBase>
            );
          })}
        </Box>
      </Box>

      <Box sx={styles.bottomSection}>
        <Divider sx={styles.divider} />

        <Box sx={styles.profileRow}>
          <Avatar
            src="https://i.pravatar.cc/100?img=12"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={styles.profileMeta}>
            <Typography variant="body2" sx={styles.profileName}>
              Jane Doe
            </Typography>
            <Typography variant="caption" sx={styles.profileLink}>
              View profile
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.navList}>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <ButtonBase
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={styles.navButton}
              >
                <Icon sx={styles.navIcon} />
                <Typography variant="body2" sx={styles.navLabel}>
                  {item.label}
                </Typography>
              </ButtonBase>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
