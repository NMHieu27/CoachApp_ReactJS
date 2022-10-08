import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Admin from '~/pages/Admin';
import Accounts from '~/pages/Admin/Accounts';
import Signup from '~/pages/Auth/Signup/Signup';
import Booking from '~/pages/Booking/Booking';
import { Signin } from '~/pages/Auth/Signin';
import { Contract } from '~/pages/Contract';
import { GoodsManagement } from '~/pages/GoodsManagement';
import CoachesDetail from '~/pages/CoachesDetail/CoachesDetail';
import AccountInfo from '~/pages/AccountInfo/AccountInfo';
import AccountInfoSetting from '~/pages/AccountInfoSetting/AccountInfoSetting';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.contract, component: Contract, layout: DefaultLayout },
    { path: config.routes.goodsmanagement, component: GoodsManagement, layout: DefaultLayout },
    { path: config.routes.booking, component: Booking, layout: DefaultLayout },
    { path: config.routes.coachesdetail, component: CoachesDetail, layout: DefaultLayout },
    { path: config.routes.accountinfo, component: AccountInfo, layout: DefaultLayout },
    { path: config.routes.accountinfosetting, component: AccountInfoSetting, layout: DefaultLayout },
];

//Admin routes
const privateRoutes = [
    { path: config.routes.admin, component: Admin, layout: AdminLayout },
    { path: config.routes.accounts, component: Accounts, layout: AdminLayout },
];

//Auth Routes
const authRoutes = [
    { path: config.routes.signin, component: Signin, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
];

export { publicRoutes, privateRoutes, authRoutes };
