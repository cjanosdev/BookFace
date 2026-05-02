import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import dogImage from '../../assets/dog_icon.jpeg';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { Link, NavLink } from 'react-router-dom';
import { primaryNavItems, secondaryNavItems } from './navItems';
import { styles } from './sidebarNavStyles';
import DogProfileDialog from './DogProfileDialog';

// Main sidebar navigation for entire app used in appshell which gets used in all major components
export default function SidebarNav() {
  const [dogDialogOpen, setDogDialogOpen] = useState(false);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.topSection}>
        <Box component={Link} to="/library" sx={styles.brandRow}>
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

            if (item.disabled) {
              return (
                <Box key={item.path} sx={styles.navButtonDisabled}>
                  <Icon sx={styles.navIcon} />
                  <Typography variant="body2" sx={styles.navLabel}>
                    {item.label}
                  </Typography>
                </Box>
              );
            }

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

        <ButtonBase
          sx={styles.profileRow}
          onClick={() => setDogDialogOpen(true)}
        >
          <Avatar src={dogImage} sx={{ width: 44, height: 44 }} />
          <Box sx={styles.profileMeta}>
            <Typography variant="body2" sx={styles.profileName}>
              Big Dawg
            </Typography>
            <Typography variant="caption" sx={styles.profileLink}>
              View profile
            </Typography>
          </Box>
        </ButtonBase>

        <Box sx={styles.navList}>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;

            if (item.disabled) {
              return (
                <Box key={item.path} sx={styles.navButtonDisabled}>
                  <Icon sx={styles.navIcon} />
                  <Typography variant="body2" sx={styles.navLabel}>
                    {item.label}
                  </Typography>
                </Box>
              );
            }

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

      <DogProfileDialog
        open={dogDialogOpen}
        onClose={() => setDogDialogOpen(false)}
      />
    </Box>
  );
}
