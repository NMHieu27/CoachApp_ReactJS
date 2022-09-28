import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import config from '~/config';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import images from '~/assets/images';
import './Header.scss';
function Header() {
    const [isShowBurger, setIsShowBurger] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isRoleSuplier, setIsRoleSuplier] = useState(false);

    const handleSignout = () => {
        setIsLogin(false);
        toast.success('Đã đăng xuất', { theme: 'colored' });
    };

    const name = 'Nguyễn Minh Hiếu';

    const userMenu = [
        {
            title: `Hi, ${name}`,
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Thông tin cá nhân',
            to: '/@hoaa',
            separate: true,
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Sửa thông tin',
            to: '/settings',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            separate: true,
        },
    ];
    return (
        <nav>
            <NavLink className="logo" to={config.routes.home}>
                H & L
            </NavLink>
            <ul className={isShowBurger ? 'show' : ''}>
                <li>
                    <NavLink className="nav-item" to={config.routes.home}>
                        Trang chủ
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink className="nav-item" to={config.routes.admin}>
                        Amin
                    </NavLink>
                </li> */}
                <li>
                    <NavLink className="nav-item" to={config.routes.goodsmanagement}>
                        Quản lí kiện hàng
                    </NavLink>
                </li>
                {!isRoleSuplier ? (
                    <li>
                        <NavLink className="nav-item" to={config.routes.contract}>
                            Mở bán vé
                        </NavLink>
                    </li>
                ) : (
                    <li>
                        <NavLink className="nav-item" to={config.routes.home}>
                            Quản lí bán vé
                        </NavLink>
                    </li>
                )}

                {!isLogin ? (
                    <li>
                        <NavLink className="nav-item" to={config.routes.signin}>
                            Đăng nhập
                        </NavLink>
                    </li>
                ) : (
                    <Menu items={userMenu} onChange={handleSignout}>
                        <li>
                            <Image className={'user-avatar'} src={images.noImage} alt="Nguyen Van A" />{' '}
                        </li>
                    </Menu>
                )}
            </ul>
            <span
                id="icon"
                onClick={() => {
                    setIsShowBurger(!isShowBurger);
                }}
            >
                <i className="fas fa-bars"></i>
            </span>
        </nav>
    );
}

export default Header;
