import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './AdminHeader.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function AdminHeader() {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('navbar-admin')}>
                <li>
                    <Link to={config.routes.accounts}> Tai khoan</Link>
                </li>
                <li>hello</li>
                <li>Hii</li>
                <li>Xin chao</li>
            </ul>
        </div>
    );
}

export default AdminHeader;
