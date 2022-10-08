import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import config from '~/config';
import Image from '~/components/Image';
import userAPI from '~/api/userAPI';
import { toast } from 'react-toastify';

import './AccountInfo.scss';
import Helmet from '~/components/Helmet/Helmet';
function AccountInfo() {
    // const avatar = localStorage.getItem('avatar');
    const fullname = localStorage.getItem('fullname');
    const currentUserId = localStorage.getItem('userId');
    console.log(currentUserId);
    const nav = useNavigate();
    const [accountInfo, setAccountInfo] = useState({});

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await userAPI.getUserById(currentUserId);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu tài khoản thành công !', { theme: 'colored' });
                    setAccountInfo({ ...response.data });
                } else {
                    toast.error('Thất bại khi lấy dữ liệu ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error('Thất bại khi lấy thông tin tài khoản ! ' + error.message, { theme: 'colored' });
                console.log('Thất bại khi lấy thông tin tài khoản: ', error);
            }
        };

        fetchAccount();
    }, []);
    return (
        <Helmet title="Thông tin người dùng">
            <div className="account-info-wrapper">
                <div className="account-info container">
                    <div className="account-info__content">
                        <div className="account-info__header">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="account-info__header__img">
                                        <Image className="user-info-avatar" src={accountInfo.avatar} alt={fullname} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account-info__header__name-and-role">
                                        <p style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: '30px' }}>Tên</p>
                                        <p style={{ color: 'blue' }}>Phân quyền: {accountInfo.roleId}</p>
                                        <span>Ngày tạo: {accountInfo.createdDate}</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-0">
                                    <button
                                        className="account-info__header__btn-setting"
                                        onClick={() => nav(config.routes.accountinfosetting)}
                                    >
                                        Sửa thông tin
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="account-info__detail">
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-8">
                                    <div className="account-info__detail__info">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{accountInfo.id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Họ tên</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{accountInfo.fullname}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Giới tính</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{accountInfo.gender ? 'Nữ' : 'Nam'}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{accountInfo.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{accountInfo.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Trạng thái</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{accountInfo.status ? 'Không khóa' : 'Khóa'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default AccountInfo;
