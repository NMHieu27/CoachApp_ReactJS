import config from '~/config';

// Layouts
import { AdminLayout } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Admin from '~/pages/Admin';
import Accounts from '~/pages/Admin/Accounts';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.admin, component: Admin, layout: AdminLayout },
    { path: config.routes.accounts, component: Accounts, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
