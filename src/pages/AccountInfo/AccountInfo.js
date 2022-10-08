import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Image from '~/components/Image';
import './AccountInfo.scss';
import Helmet from '~/components/Helmet/Helmet';
function AccountInfo() {
    const avatar = localStorage.getItem('avatar');
    const fullname = localStorage.getItem('fullname');
    const nav = useNavigate();
    return (
        <Helmet title="Thông tin người dùng">
            <div className="account-info-wrapper">
                <div className="account-info container">
                    <div className="account-info__content">
                        <div className="account-info__header">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="account-info__header__img">
                                        <Image className="user-info-avatar" src={avatar} alt={fullname} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account-info__header__name-and-role">
                                        <p style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: '30px' }}>Tên</p>
                                        <p style={{ color: 'blue' }}>Phân quyền:</p>
                                        <span>Ngày tạo: </span>
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
                                                <p>Kshiti123</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Họ tên</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Kshiti Ghelani</p>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Giới tính</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Web Developer and Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>kshitighelani@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>123 456 7890</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Trạng thái</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Không khóa</p>
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
