import { Link } from 'react-router-dom';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                <div className={cx('nav-header')}>
                    <Image
                        className={cx('logo-link')}
                        src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FZLONnx6jkGY%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DZLONnx6jkGY&tbnid=b6ZGXLSII1e_JM&vet=12ahUKEwj3hJqk-_L5AhUBNqYKHXPkDJgQMygVegUIARDdAQ..i&docid=BKdb9lGrzZfCbM&w=1280&h=720&q=xe%20bus&ved=2ahUKEwj3hJqk-_L5AhUBNqYKHXPkDJgQMygVegUIARDdAQ"
                        alt="Nguyen Van A"
                    />
                </div>
                <ul className={cx('nav')}>
                    <li className={cx('nav-item')}>
                        <Link to={config.routes.home}>Trang chủ</Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to={config.routes.admin}>Admin</Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to={config.routes.home}>Trang chủ</Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to={config.routes.signin}>Đăng nhập</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
