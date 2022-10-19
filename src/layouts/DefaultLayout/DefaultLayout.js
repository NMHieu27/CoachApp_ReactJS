import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Client/Header';
import Footer from '~/layouts/components/Client/Footer';
import { Outlet } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
