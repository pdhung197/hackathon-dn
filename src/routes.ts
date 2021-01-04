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
  {
    path: '/logs',
    name: 'Vaccination Log',
    rtlName: 'Vaccination Log',
    icon: 'event_seat',
    component: VaccinationLog,
    layout: '/admin',
  },
  {
    path: '/scan_qr_code',
    name: 'Scan QR Code',
    rtlName: 'Scan QR Code',
    icon: 'qr_code_scanner',
    component: ScanQRCode,
    layout: '/admin',
  },
];

export default dashboardRoutes;
