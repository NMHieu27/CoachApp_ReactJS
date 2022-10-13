import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout } from '~/layouts';

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
    // Admin home
    { path: config.routes.admin, component: AdminHome, layout: AdminLayout },
    // Admin account
    { path: config.routes.accounts, component: AccountsManagement, layout: AdminLayout },
    { path: config.routes.addNewAccount, component: AddAccount, layout: AdminLayout },
    { path: config.routes.editAccount, component: EditAccount, layout: AdminLayout },
    //  Admin register coach garage
    { path: config.routes.registerManagement, component: RegisterManagement, layout: AdminLayout },
    // Admin category
    { path: config.routes.categoryManagement, component: CategoryManagement, layout: AdminLayout },
    { path: config.routes.addCategory, component: AddCategory, layout: AdminLayout },
    { path: config.routes.editCategory, component: EditCategory, layout: AdminLayout },
];

//Auth Routes
const authRoutes = [
    { path: config.routes.signin, component: Signin, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
];

export { publicRoutes, privateRoutes, authRoutes };
