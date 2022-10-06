import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import config from '~/config';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';

import './Header.scss';
function Header() {
    const [isShowBurger, setIsShowBurger] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isRoleSuplier, setIsRoleSuplier] = useState(false);

    const handleSignout = () => {
        localStorage.removeItem('fullname');
        localStorage.removeItem('email');
        localStorage.removeItem('roleId');
        localStorage.removeItem('phone');
        localStorage.removeItem('avatar');
        localStorage.removeItem('userId');
        setIsLogin(false);
        toast.success('Đã đăng xuất', { theme: 'colored' });
    };

    const fullname = localStorage.getItem('fullname');
    const avatar = localStorage.getItem('avatar');
    const roleId = localStorage.getItem('roleId');

    const userMenu = [
        {
            title: `Hi, ${fullname}`,
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
            isButton: true,
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
                            <Image className={'user-avatar'} src={avatar} alt={fullname} />{' '}
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
