import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import './PageUnauthorized.scss';
function PageUnauthorized() {
    return (
        <Helmet title="Từ chối truy cập">
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
                    <div className="error mx-auto" data-text="403">
                        403
                    </div>
                    <p className="lead text-gray-800 mb-5">Quyền truy cập bị từ chối</p>
                    <p className="text-gray-500 mb-0">Xin lỗi vì bạn không thể truy cập vào trang web này!</p>
                    <Link to={config.routes.home}>
                        <p style={{ color: 'blue' }}>← Quay trở về trang chủ</p>
                    </Link>
                </div>
            </div>
        </Helmet>
    );
}

export default PageUnauthorized;
