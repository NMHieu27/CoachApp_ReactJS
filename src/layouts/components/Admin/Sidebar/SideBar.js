import { NavLink } from 'react-router-dom';
import { FaBars, FaHome, FaUser } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { AiTwotoneFileExclamation } from 'react-icons/ai';
import { BsFilePost } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import './SidebarNavActive.scss';
import config from '~/config';

const cx = classNames.bind(styles);

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
        path: '/file-manager',
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
                path: '/settings/2fa',
                name: 'Xe',
                // icon: <FaBusAlt />,
            },
            {
                path: '/settings/billing',
                name: 'Chuyến xe',
                // icon: <FaMoneyBill />,
            },
        ],
    },
    {
        path: '/settings',
        name: 'Thống kê',
        icon: <ImStatsDots />,
        exact: true,
        subRoutes: [
            {
                path: '/settings/profile',
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

const SideBar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.2,
            },
        },
        show: {
            width: '140px',
            padding: '5px 15px',
            transition: {
                duration: 0.2,
            },
        },
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: 'auto',
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <>
            <div className={cx('main-container')}>
                <motion.div
                    animate={{
                        width: isOpen ? '300px' : '45px',

                        transition: {
                            duration: 0.5,
                            type: 'spring',
                            damping: 10,
                        },
                    }}
                    className={cx('sidebar')}
                >
                    <div className={cx('top_section')}>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.h1
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className={cx('logo')}
                                >
                                    H&L
                                </motion.h1>
                            )}
                        </AnimatePresence>

                        <div className={cx('bars')}>
                            <FaBars onClick={toggle} />
                        </div>
                    </div>

                    <section className={cx('routes')}>
                        {routes.map((route, index) => {
                            if (route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        key={index}
                                        setIsOpen={setIsOpen}
                                        route={route}
                                        showAnimation={showAnimation}
                                        isOpen={isOpen}
                                    />
                                );
                            }

                            return (
                                <NavLink to={route.path} key={index} className={cx('link')}>
                                    <div className={cx('icon')}>{route.icon}</div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                                className={cx('link_text')}
                                            >
                                                {route.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </NavLink>
                            );
                        })}
                    </section>
                    <section className={cx('btn-logout')}></section>
                </motion.div>

                <main>{children}</main>
            </div>
        </>
    );
};

export default SideBar;
