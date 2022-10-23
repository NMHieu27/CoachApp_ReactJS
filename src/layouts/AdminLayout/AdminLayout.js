import AdminHeader from '~/layouts/components/Admin/Header/AdminHeader';
import AdminFooter from '~/layouts/components/Admin/Footer/AdminFooter';
import SideBar from '../components/Admin/Sidebar/SideBar';
import { FaHome, FaUser } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { AiTwotoneFileExclamation } from 'react-icons/ai';
import { BsFilePost } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { Outlet } from 'react-router-dom';
import './AdminLayout.scss';
import config from '~/config';

const routes = [
    {
        path: config.routes.admin,
        name: 'Admin Home',
        icon: <FaHome />,
    },
    {
        path: config.routes.accounts,
        name: 'Quản lý người dùng',
        icon: <FaUser />,
    },
    {
        path: config.routes.registerManagement,
        name: 'Phê duyệt nhà xe',
        icon: <BsFilePost />,
    },
    {
        name: 'Quản lí thông tin',
        icon: <AiTwotoneFileExclamation />,
        subRoutes: [
            {
                path: config.routes.coachGarageManagement,
                name: 'Nhà xe',
                // icon: <BiCategory />,
            },
            {
                path: config.routes.categoryManagement,
                name: 'Phân loại xe',
                // icon: <BiCategory />,
            },
            {
                path: config.routes.coachManagement,
                name: 'Xe',
                // icon: <FaBusAlt />,
            },
            {
                path: config.routes.coachesManagement,
                name: 'Chuyến xe',
                // icon: <FaMoneyBill />,
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
                path: config.routes.coachesStat,
                name: 'Thống kê mật độ chuyến',
                // icon: <ImStatsBars2 />,
            },
        ],
    },
    {
        path: config.routes.home,
        name: 'Về trang chủ',
        icon: <BiLogOut />,
    },
];
function AdminLayout() {
    return (
        <SideBar routes={routes}>
            <div className="admin-layout">
                <div className="admin-layout__header">
                    <AdminHeader />
                </div>
                <div className="admin-layout__content">
                    <div className="admin-layout__content__container">
                        <Outlet />
                    </div>
                </div>
                <div className="admin-layout__footer">
                    <AdminFooter />
                </div>
            </div>
        </SideBar>
    );
}

export default AdminLayout;
