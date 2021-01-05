import { VaccinationLog } from './views/VaccinationLog/VaccinationLog';
import { AccountVerify } from './views/AccountVerify/AccountVerify';

/* eslint-disable @typescript-eslint/no-unused-vars */
// @material-ui/icons
import TableList from './views/TableList/TableList';

import 'index.css';
import { ScanQRCode } from './views/ScanQRCode/ScanQRCode';

const dashboardRoutes = [
  {
    path: '/verify',
    name: 'Account Verify',
    rtlName: 'Account Verify',
    icon: 'event_seat',
    component: AccountVerify,
    layout: '/admin',
  },
];

export default dashboardRoutes;
