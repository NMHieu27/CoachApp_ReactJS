import AdminHeader from '~/layouts/components/Admin/Header/AdminHeader';
import AdminFooter from '~/layouts/components/Admin/Footer/AdminFooter';
import SideBar from '../components/Admin/Sidebar/SideBar';
import { FaHome } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { AiTwotoneFileExclamation } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { Outlet } from 'react-router-dom';
import './GarageLayout.scss';
import config from '~/config';
const routes = [
    {
        path: config.routes.garage,
        name: 'Coach Garage Home',
        icon: <FaHome />,
    },
    {
        name: 'Quản lí thông tin',
        icon: <AiTwotoneFileExclamation />,
        subRoutes: [
            {
                path: config.routes.coachGarageManagement,
                name: 'Nhà xe',
            },
            {
                path: config.routes.coachManagement,
                name: 'Xe',
            },
            {
                path: config.routes.coachesManagement,
                name: 'Chuyến xe',
            },
        ],
    },
    {
        name: 'Thống kê',
        icon: <ImStatsDots />,
        exact: true,
        subRoutes: [
            {
                path: config.routes.revenueStat,
                name: 'Thống kê doanh thu ',
                // icon: <BsCashCoin />,
            },
            {
                path: '/settings/2fa',
                name: 'Thống kê mật độ chuyến',
                // icon: <ImStatsBars2 />,
            },
            {
                path: '/settings/billing',
                name: 'Top ....',
                // icon: <FaMoneyBill />,
            },
        ],
    },
    {
        path: config.routes.home,
        name: 'Về trang chủ',
        icon: <BiLogOut />,
    },
];
function GarageLayout() {
    return (
        <SideBar routes={routes}>
            <div className="garage-layout">
                <div className="garage-layout__header">
                    <AdminHeader />
                </div>
                <div className="garage-layout__content">
                    <div className="garage-layout__content__container">
                        <Outlet />
                    </div>
                </div>
                <div className="garage-layout__footer">
                    <AdminFooter />
                </div>
            </div>
        </SideBar>
    );
}

export default GarageLayout;
