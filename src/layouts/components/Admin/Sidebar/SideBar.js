import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import './SidebarNavActive.scss';

const cx = classNames.bind(styles);

const SideBar = ({ children, routes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

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
