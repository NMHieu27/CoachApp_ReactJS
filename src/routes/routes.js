import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Admin from '~/pages/Admin';
import Accounts from '~/pages/Admin/Accounts';
import Signup from '~/pages/Auth/Signup/Signup';
import SearchPage from '~/pages/SearchPage/SearchPage';
import { Signin } from '~/pages/Auth/Signin';
import { Contract } from '~/pages/Contract';
import { GoodsManagement } from '~/pages/GoodsManagement';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.contract, component: Contract, layout: DefaultLayout },
    { path: config.routes.goodsmanagement, component: GoodsManagement, layout: DefaultLayout },
    { path: config.routes.searchpage, component: SearchPage, layout: DefaultLayout },
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
