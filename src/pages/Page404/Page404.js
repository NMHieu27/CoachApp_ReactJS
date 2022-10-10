import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import './Page404.scss';
function Page404() {
    return (
        <Helmet title="Trang không tồn tại">
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    // fontWeight: 'bold',
                    // fontSize: '20px',
                    // textAlign: 'center',
                }}
            >
                <div className="text-center">
                    <div className="error mx-auto" data-text="404">
                        404
                    </div>
                    <p className="lead text-gray-800 mb-5">Page Not Found</p>
                    <p className="text-gray-500 mb-0">Xin lỗi trang không tìm thấy!</p>
                    <Link to={config.routes.home}>
                        <p style={{ color: 'blue' }}>← Quay trở về trang chủ</p>
                    </Link>
                </div>
            </div>
        </Helmet>
    );
}

export default Page404;
