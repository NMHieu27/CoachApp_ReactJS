import AdminHeader from '~/layouts/components/Admin/Header/AdminHeader';
import AdminFooter from '~/layouts/components/Admin/Footer/AdminFooter';
import SideBar from '../components/Admin/Sidebar/SideBar';
import './AdminLayout.scss';
function AdminLayout({ children }) {
    return (
        <SideBar>
            <div className="admin-layout">
                <div className="admin-layout__header">
                    <AdminHeader />
                </div>
                <div className="admin-layout__content">
                    <div className="admin-layout__content__container container">{children}</div>
                </div>
                <div className="admin-layout__footer">
                    <AdminFooter />
                </div>
            </div>
        </SideBar>
    );
}

export default AdminLayout;
