/* eslint-disable @typescript-eslint/no-unused-vars */
// @material-ui/icons
import TableList from './views/TableList/TableList';

import 'index.css';

const dashboardRoutes = [
  {
    path: '/tables',
    name: 'Table List',
    rtlName: 'Animal Manager',
    icon: 'event_seat',
    component: TableList,
    layout: '/admin',
  },
];

export default dashboardRoutes;
