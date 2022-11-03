import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '~/config';
import Helmet from '~/components/Helmet/Helmet';
import { toast } from 'react-toastify';
import './signin.scss';
import authAPI from '~/api/authAPI/authAPI';
// import useAuth from '~/hooks/useAuth';
function Signin(props) {
    // const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPass, setIsShowPass] = useState(false);

    let handleLogin = async (e) => {
        e.preventDefault();
        try {
            const params = {
                phone: phone,
                password: password,
            };
            const response = await authAPI.signIn(params);
            if (response.code === 200) {
                toast.success('Đăng nhập thành công!', { theme: 'colored' });
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('fullname', response.data.fullname);
                localStorage.setItem('phone', response.data.phone);
                localStorage.setItem('avatar', response.data.avatar);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('accessToken', response?.data?.accessToken);
                localStorage.setItem('expiredTime', response?.data?.expiredTime);

                // const accessToken = response?.data?.accessToken;
                // const role = response?.data?.role;
                // setAuth({ phone, password, role, accessToken });

                setPhone('');
                setPassword('');
                // navigate(from, { replace: true });
                if (response.data.role === 'admin') {
                    navigate(config.routes.admin);
                } else if (response.data.role === 'user' || response.data.role === 'employee') {
                    navigate(config.routes.home);
                } else if (response.data.role === 'coachGarage') {
                    navigate(config.routes.garage);
                } else navigate(config.routes.unauthorized);
            } else {
                toast.error('Đăng nhập thất bại ' + response.message, { theme: 'colored' });
            }
        } catch (error) {
            console.log('Thất bại khi gửi dữ liệu: ', error.message);
            toast.error('Thất bại khi gửi dữ liệu', { theme: 'colored' });
        }
    };

    return (
        <Helmet title="Đăng nhập">
            <div className="login-background">
                <div className="login-container">
                    <form className="login-content" onSubmit={handleLogin}>
                        <div className="col-12 text-login">Đăng nhập</div>

                        <div className="col-12 form-group input-login">
                            <label for="phone">Số điện thoại</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                className="form-control"
                                id="phone"
                            />
                        </div>

                        <div className="col-12 form-group input-login">
                            <label for="pass">Mật khẩu</label>
                            <div className="custom-input-password">
                                <input
                                    id="pass"
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
                            <button type="submit" className="btn-login">
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
                    </form>
                </div>
            </div>
        </Helmet>
    );
}

export default Signin;
