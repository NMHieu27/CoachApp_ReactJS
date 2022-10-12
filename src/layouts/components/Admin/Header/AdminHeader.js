import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import images from '~/assets/images';
import config from '~/config';
import './AdminHeader.scss';
import Menu from '~/components/Popper/Menu';
function AdminHeader() {
    const nav = useNavigate();
    const handleSignout = () => {
        localStorage.removeItem('fullname');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('phone');
        localStorage.removeItem('avatar');
        localStorage.removeItem('userId');
        toast.success('Đã đăng xuất', { theme: 'colored' });
        nav(config.routes.home);
    };
    const fullname = localStorage.getItem('fullname');
    const avatar = localStorage.getItem('avatar');
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!role || role !== 'admin') {
            nav(config.routes.signin);
        }
    });
    const userMenu = [
        {
            title: `Hi, ${fullname}`,
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Thông tin cá nhân',
            to: config.routes.accountinfo,
            separate: true,
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Sửa thông tin',
            to: config.routes.accountinfosetting,
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            isButton: true,
            separate: true,
        },
    ];
    return (
        <div className="admin-header">
            {/* <div class="admin-header__img">
                <Menu items={userMenu} onChange={handleSignout}>
                    <Image className="admin-avatar" src={avatar} />
                </Menu>
            </div> */}

            <div className="admin-header__container">
                <div className="admin-header__container__search-box">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            // style={{ border: 'none' }}
                            placeholder="Tìm kiếm"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="admin-header__container__right-box">
                    <div>
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div>
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                        <Menu items={userMenu} onChange={handleSignout}>
                            <img
                                src={images.noImage}
                                class="rounded-circle"
                                alt="Cinque Terre"
                                width="32"
                                height="32"
                            />
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;
