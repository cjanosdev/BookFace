import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import type { SvgIconComponent } from '@mui/icons-material';

export interface NavItem {
  label: string;
  path: string;
  icon: SvgIconComponent;
  disabled?: boolean;
}

export const primaryNavItems: NavItem[] = [
  { label: 'Home', path: '/home', icon: HomeRoundedIcon, disabled: true },
  { label: 'My Library', path: '/library', icon: MenuBookRoundedIcon },
  {
    label: 'Collections',
    path: '/collections',
    icon: CollectionsBookmarkRoundedIcon,
  },

  // groups, search, profile, settings, logout disabled since these are not implemented at all
  { label: 'Groups', path: '/groups', icon: GroupsRoundedIcon, disabled: true },
  { label: 'Search', path: '/search', icon: SearchRoundedIcon, disabled: true },
  {
    label: 'Profile',
    path: '/profile',
    icon: PersonRoundedIcon,
    disabled: true,
  },
];

export const secondaryNavItems: NavItem[] = [
  {
    label: 'Settings',
    path: '/settings',
    icon: SettingsRoundedIcon,
    disabled: true,
  },
  {
    label: 'Log out',
    path: '/logout',
    icon: LogoutRoundedIcon,
    disabled: true,
  },
];
