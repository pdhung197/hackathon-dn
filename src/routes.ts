// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import BubbleChart from '@material-ui/icons/BubbleChart'
import LocationOn from '@material-ui/icons/LocationOn'
import Notifications from '@material-ui/icons/Notifications'
import Unarchive from '@material-ui/icons/Unarchive'
import Language from '@material-ui/icons/Language'
// core components/views for Admin layout
import DashboardPage from './views/Dashboard/Dashboard'
import UserProfile from './views/UserProfile/UserProfile'
import TableList from './views/TableList/TableList'
import DriverList from './views/Driver/List'
import TripList from './views/Trip/List'
import BookingList from './views/Bookings/List'
import VehicleList from './views/Vehicle/List'
import RiderList from './views/Rider/List'
import Typography from './views/Typography/Typography'
import Icons from './views/Icons/Icons'
import Maps from './views/Maps/Maps'
import NotificationsPage from './views/Notifications/Notifications'
import UpgradeToPro from './views/UpgradeToPro/UpgradeToPro'
// core components/views for RTL layout
import RTLPage from './views/RTLPage/RTLPage'
import 'index.css'

const dashboardRoutes = [
  {
    path: '/trips',
    name: 'Trip List',
    rtlName: 'قائمة الجدول',
    icon: 'directions',
    component: TripList,
    layout: '/admin',
  },
  {
    path: '/bookings',
    name: 'Booking List',
    rtlName: 'قائمة الجدول',
    icon: 'event_seat',
    component: BookingList,
    layout: '/admin',
  },
  {
    path: '/vehicles',
    name: 'Vehicle List',
    rtlName: 'قائمة الجدول',
    icon: 'directions_bus',
    component: VehicleList,
    layout: '/admin',
  },
  {
    path: '/drivers',
    name: 'Driver List',
    rtlName: 'قائمة الجدول',
    icon: 'recent_actors',
    component: DriverList,
    layout: '/admin',
  },
  {
    path: '/riders',
    name: 'Passenger List',
    rtlName: 'قائمة الجدول',
    icon: 'supervisor_account',
    component: RiderList,
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    rtlName: 'خرائط',
    icon: LocationOn,
    component: Maps,
    layout: '/admin',
  },

  //////////////////////////////

  // {
  //     path: '/dashboard',
  //     name: 'Dashboard',
  //     rtlName: 'لوحة القيادة',
  //     icon: Dashboard,
  //     component: DashboardPage,
  //     layout: '/admin',
  // },
  // {
  //     path: '/user',
  //     name: 'User Profile',
  //     rtlName: 'ملف تعريفي للمستخدم',
  //     icon: Person,
  //     component: UserProfile,
  //     layout: '/admin',
  // },
  // {
  //     path: '/table',
  //     name: 'Table List',
  //     rtlName: 'قائمة الجدول',
  //     icon: 'content_paste',
  //     component: TableList,
  //     layout: '/admin',
  // },
  // {
  //     path: '/typography',
  //     name: 'Typography',
  //     rtlName: 'طباعة',
  //     icon: LibraryBooks,
  //     component: Typography,
  //     layout: '/admin',
  // },
  // {
  //     path: '/icons',
  //     name: 'Icons',
  //     rtlName: 'الرموز',
  //     icon: BubbleChart,
  //     component: Icons,
  //     layout: '/admin',
  // },
  // {
  //     path: '/notifications',
  //     name: 'Notifications',
  //     rtlName: 'إخطارات',
  //     icon: Notifications,
  //     component: NotificationsPage,
  //     layout: '/admin',
  // },
  // {
  //     path: '/rtl-page',
  //     name: 'RTL Support',
  //     rtlName: 'پشتیبانی از راست به چپ',
  //     icon: Language,
  //     component: RTLPage,
  //     layout: '/rtl',
  // },
  // {
  //     path: '/upgrade-to-pro',
  //     name: 'Upgrade To PRO',
  //     rtlName: 'التطور للاحترافية',
  //     icon: Unarchive,
  //     component: UpgradeToPro,
  //     layout: '/admin',
  // },
]

export default dashboardRoutes
