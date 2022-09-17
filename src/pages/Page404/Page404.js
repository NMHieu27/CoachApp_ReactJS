import React from 'react';
import { Helmet } from '~/components/Helmet';

function Page404() {
    return (
        <Helmet title="Trang không tồn tại">
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textAlign: 'center',
                }}
            >
                <p>Xin lỗi ! Trang không tìm thấy</p>
                <p>Page not found!</p>
            </div>
        </Helmet>
    );
}

export default Page404;
