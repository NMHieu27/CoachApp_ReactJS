import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import Helmet from '~/components/Helmet/Helmet';
import './signin.scss';
function Signin(props) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPass, setIsShowPass] = useState(false);

    const handleLogin = () => {
        console.log(phone);
        console.log(password);
    };
    return (
        <Helmet title="Đăng nhập">
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-login">Đăng nhập</div>

                        <div className="col-12 form-group input-login">
                            <label>Số điện thoại</label>
                            <input
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div className="col-12 form-group input-login">
                            <label>Mật khẩu</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    type={!isShowPass ? 'password' : 'text'}
                                />
                                <span onClick={() => setIsShowPass(!isShowPass)}>
                                    {!isShowPass ? (
                                        <i className="fa-solid fa-eye-slash eye"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye eye"></i>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="col-12">
                            <button className="btn-login" onClick={handleLogin}>
                                Đăng nhập
                            </button>
                        </div>

                        <div className="col-12">
                            <span className="forgot-password" style={{ color: 'blue', cursor: 'pointer' }}>
                                Quên mật khẩu?
                            </span>
                        </div>

                        {/* <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Hoặc đăng nhập với:</span>
                        </div>

                        <div className="col-12 social-login">
                            <i class="fa-brands fa-google-plus-g google"></i>
                            <i class="fa-brands fa-facebook-f facebook"></i>
                        </div> */}

                        <div className="col-12 text-center signup">
                            <div>Bạn chưa có tài khoản?</div>
                            <Link style={{ color: 'blue' }} to={config.routes.signup}>
                                Đăng kí
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Signin;
