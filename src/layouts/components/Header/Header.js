import { Link } from 'react-router-dom';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div>
                    <Link to={config.routes.home} className={cx('logo')}>
                        {/* <img src={images.logo} alt="Coach" /> */}
                    </Link>
                </div>
                <ul className={cx('navbar')}>
                    <li className={cx('nav-item')}>
                        <Link to={config.routes.home} className={cx('home')}>
                            Trang chủ
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to={config.routes.home} className={cx('home')}>
                            Quản lí đơn hàng
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to={config.routes.home} className={cx('home')}>
                            Lịch sử vé xe
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to={config.routes.home} className={cx('home')}>
                            Trở thành đối tác
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
