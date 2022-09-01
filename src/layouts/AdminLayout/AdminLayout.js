import classNames from 'classnames/bind';
import { AdminFooter, AdminHeader } from '../components/Admin';
import styles from './Admin.module.scss';
const cx = classNames.bind(styles);
function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <AdminHeader />
                <div className={cx('content')}>{children}</div>
                <AdminFooter />
            </div>
        </div>
    );
}

export default AdminLayout;
