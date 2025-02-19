import Routes from '@common/defs/routes';
import { CRUD_ACTION, NavGroup } from '@common/defs/types';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import Namespaces from '@common/defs/namespaces';
import { Category, Event, Group } from '@mui/icons-material';

export const menuItems: NavGroup[] = [
  {
    text: 'leftbar:management',
    items: [
      {
        text: 'leftbar:dashboard',
        icon: <DashboardCustomizeRoundedIcon />,
        link: Routes.Common.Home,
      },
      {
        text: 'leftbar:users',
        icon: <Group />,
        link: Routes.Users.ReadAll,
        namespace: Namespaces.Users,
        permission: CRUD_ACTION.READ,
        routes: Routes.Users,
      },
      {
        text: 'leftbar:categories',
        icon: <Category />,
        link: Routes.Categories.ReadAll,
        namespace: Namespaces.Categories,
        permission: CRUD_ACTION.READ,
        routes: Routes.Categories,
      },
      {
        text: 'leftbar:events',
        icon: <Event />,
        link: Routes.Events.ReadAll,
        namespace: Namespaces.Events,
        permission: CRUD_ACTION.READ,
        routes: Routes.Events,
      },
    ],
  },
];
