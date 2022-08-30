import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Admin from '~/pages/Admin';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.admin, component: Admin },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
