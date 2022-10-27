import config from '~/config';

// Layouts
// import { AdminLayout, DefaultLayout } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import AdminHome from '~/pages/Admin/AdminHome/AdminHome';
import AccountsManagement from '~/pages/Admin/AccountsManagement/AccountsManagement';
import AddAccount from '~/pages/Admin/AccountsManagement/AddAccount';
import EditAccount from '~/pages/Admin/AccountsManagement/EditAccount';
import RegisterManagement from '~/pages/Admin/RegisterManagement/RegisterManagement';
import CategoryManagement from '~/pages/Admin/CategoryManagement/CategoryManagement';
import AddCategory from '~/pages/Admin/CategoryManagement/AddCategory';
import EditCategory from '~/pages/Admin/CategoryManagement/EditCategory';
import CoachGarageManagement from '~/pages/Admin/CoachGarageManagement/CoachGarageManagement';
import AddCoachGarage from '~/pages/Admin/CoachGarageManagement/AddCoachGarage';
import EditCoachGarage from '~/pages/Admin/CoachGarageManagement/EditCoachGarage';
import CoachManagement from '~/pages/Admin/CoachManagement/CoachManagement';
import AddCoach from '~/pages/Admin/CoachManagement/AddCoach';
import RevenueStat from '~/pages/Admin/RevenueStat/RevenueStat';
import CoachesStat from '~/pages/Admin/CoachesStat/CoachesStat';
import EditShipping from '~/pages/Admin/ShippingManagement/EditShipping';

import Signup from '~/pages/Auth/Signup/Signup';
import Booking from '~/pages/Booking/Booking';
import { Signin } from '~/pages/Auth/Signin';
import { Contract } from '~/pages/Contract';
import CoachesDetail from '~/pages/CoachesDetail/CoachesDetail';
import AccountInfo from '~/pages/AccountInfo/AccountInfo';
import AccountInfoSetting from '~/pages/AccountInfoSetting/AccountInfoSetting';
import EditCoach from '~/pages/Admin/CoachManagement/EditCoach';
import CoachesManagement from '~/pages/Admin/CoachesManagement/CoachesManagement';
import AddCoaches from '~/pages/Admin/CoachesManagement/AddCoaches';
import EditCoaches from '~/pages/Admin/CoachesManagement/EditCoaches';
import GarageHome from '~/pages/Garage/GarageHome/GarageHome';
import GarageCoachManagement from '~/pages/Garage/GarageManageCoach/GarageCoachManagement';
import GarageAddCoach from '~/pages/Garage/GarageManageCoach/GarageAddCoach';
import GarageEditCoach from '~/pages/Garage/GarageManageCoach/GarageEditCoach';
import GarageCoachesManagement from '~/pages/Garage/GarageManageCoaches/GarageCoachesManagement';
import GarageAddCoaches from '~/pages/Garage/GarageManageCoaches/GarageAddCoaches';
import GarageEditCoaches from '~/pages/Garage/GarageManageCoaches/GarageEditCoaches';
import GarageRevenueStat from '~/pages/Garage/GarageRevenueStat/GarageRevenueStat';
import GarageCoachesStat from '~/pages/Garage/GarageCoachesStat/GarageCoachesStat';
import EmployeeCoachesManagement from '~/pages/Employee/EmployeeCoachesManagement/EmployeeCoachesManagement';
import EmployeeEditShipping from '~/pages/Employee/EmployeeShippingManagement/EmployeeEditShipping';
import History from '~/pages/History/History';
import CancelTicketManagement from '~/pages/Admin/CancelTicketManagement/CancelTicketManagement';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.contract, component: Contract },
    { path: config.routes.coachesdetail, component: CoachesDetail },
    { path: config.routes.accountinfo, component: AccountInfo },
    { path: config.routes.accountinfosetting, component: AccountInfoSetting },
    { path: config.routes.history, component: History },
];

//Admin routes
const privateRoutes = [
    // Admin home
    { path: config.routes.admin, component: AdminHome },
    // Admin account
    { path: config.routes.accounts, component: AccountsManagement },
    { path: config.routes.addNewAccount, component: AddAccount },
    { path: config.routes.editAccount, component: EditAccount },
    //  Admin register coach garage
    { path: config.routes.registerManagement, component: RegisterManagement },
    // Admin category
    { path: config.routes.categoryManagement, component: CategoryManagement },
    { path: config.routes.addCategory, component: AddCategory },
    { path: config.routes.editCategory, component: EditCategory },
    // Admin coach garage
    { path: config.routes.coachGarageManagement, component: CoachGarageManagement },
    { path: config.routes.addCoachGarage, component: AddCoachGarage },
    { path: config.routes.editCoachGarage, component: EditCoachGarage },
    // Admin coach
    { path: config.routes.coachManagement, component: CoachManagement },
    { path: config.routes.addCoach, component: AddCoach },
    { path: config.routes.editCoach, component: EditCoach },
    //Admin coaches
    { path: config.routes.coachesManagement, component: CoachesManagement },
    { path: config.routes.addCoaches, component: AddCoaches },
    { path: config.routes.editCoaches, component: EditCoaches },
    // Admin Revenue Stat
    { path: config.routes.revenueStat, component: RevenueStat },
    { path: config.routes.coachesStat, component: CoachesStat },
    // Admin Shipping
    { path: config.routes.editShipping, component: EditShipping },
    //Admin Cancel Ticket
    { path: config.routes.requestCancelTicket, component: CancelTicketManagement },
];
// Garage Routes
const garageRoutes = [
    // Garage Home
    { path: config.routes.garage, component: GarageHome },
    // Garage coach
    { path: config.routes.garageManageCoach, component: GarageCoachManagement },
    { path: config.routes.garageAddCoach, component: GarageAddCoach },
    { path: config.routes.garageEditCoach, component: GarageEditCoach },
    //Garage coaches
    { path: config.routes.garageManageCoaches, component: GarageCoachesManagement },
    { path: config.routes.garageAddCoaches, component: GarageAddCoaches },
    { path: config.routes.garageEditCoaches, component: GarageEditCoaches },
    // Garage Stats
    { path: config.routes.garageRevenueStat, component: GarageRevenueStat },
    { path: config.routes.garageCoachesStat, component: GarageCoachesStat },
];
const employeeRoutes = [
    { path: config.routes.employeeManageCoaches, component: EmployeeCoachesManagement },
    { path: config.routes.employeeEditShipping, component: EmployeeEditShipping },
];
//Auth Routes
const authRoutes = [
    { path: config.routes.signin, component: Signin, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
];

export { publicRoutes, privateRoutes, authRoutes, garageRoutes, employeeRoutes };
