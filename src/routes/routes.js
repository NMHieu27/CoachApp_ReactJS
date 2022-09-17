import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Admin from '~/pages/Admin';
import Accounts from '~/pages/Admin/Accounts';
import { Signin } from '~/pages/Auth/Signin';

// Public routes
const publicRoutes = [{ path: config.routes.home, component: Home, layout: DefaultLayout }];

//Admin routes
const privateRoutes = [
    { path: config.routes.admin, component: Admin, layout: AdminLayout },
    { path: config.routes.accounts, component: Accounts, layout: AdminLayout },
];

//Auth Routes
const authRoutes = [{ path: config.routes.signin, component: Signin, layout: null }];

export { publicRoutes, privateRoutes, authRoutes };
