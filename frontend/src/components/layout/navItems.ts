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
}

export const primaryNavItems: NavItem[] = [
  { label: 'Home', path: '/home', icon: HomeRoundedIcon },
  { label: 'My Library', path: '/library', icon: MenuBookRoundedIcon },
  {
    label: 'Collections',
    path: '/collections',
    icon: CollectionsBookmarkRoundedIcon,
  },
  { label: 'Groups', path: '/groups', icon: GroupsRoundedIcon },
  { label: 'Search', path: '/search', icon: SearchRoundedIcon },
  { label: 'Profile', path: '/profile', icon: PersonRoundedIcon },
];

export const secondaryNavItems: NavItem[] = [
  { label: 'Settings', path: '/settings', icon: SettingsRoundedIcon },
  { label: 'Log out', path: '/logout', icon: LogoutRoundedIcon },
];
