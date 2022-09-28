import { Link } from 'react-router-dom';
import { useState } from 'react';
import config from '~/config';
import Helmet from '~/components/Helmet/Helmet';
import './signup.scss';

function Signup() {
    const sexs = [
        { id: 0, name: 'male', title: 'Nam' },
        { id: 1, name: 'female', title: 'Nữ' },
    ];
    const [sexChecked, setSexChecked] = useState();
    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
    return (
        <Helmet title="Đăng kí">
            <section class="vh-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                                <div class="card-body p-2 p-md-5">
                                    <h3
                                        style={{ fontWeight: 'bold', color: '#2c3e50' }}
                                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                                    >
                                        Đăng kí tài khoản
                                    </h3>
                                    <form>
                                        <div class="row">
                                            <div class="col-md-6 mb-2">
                                                <label class="form-label" for="fullname">
                                                    Họ và tên
                                                </label>
                                                <div class="form-outline">
                                                    <input
                                                        type="text"
                                                        id="fullname"
                                                        class="form-control form-control-lg"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-2">
                                                <label class="form-label" for="gender">
                                                    Giới tính
                                                </label>

                                                <div className="gender-group mt-2">
                                                    {sexs.map((sex) => (
                                                        <div key={sex.id} class="form-check form-check-inline">
                                                            <input
                                                                class="form-check-input"
                                                                type="radio"
                                                                name="inlineRadioOptions"
                                                                id={sex.name}
                                                                value="option1"
                                                                checked={sexChecked === sex.id}
                                                                onChange={() => setSexChecked(sex.id)}
                                                            />
                                                            <label class="form-check-label" for={sex.name}>
                                                                {sex.title}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-2 pb-2">
                                                <div class="form-outline">
                                                    <label class="form-label" for="emailAddress">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="emailAddress"
                                                        class="form-control form-control-lg"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-2 pb-2">
                                                <div class="form-outline">
                                                    <label class="form-label" for="phoneNumber">
                                                        Số điện thoại
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phoneNumber"
                                                        class="form-control form-control-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-2 pb-2 input-pass">
                                                <div class="form-outline">
                                                    <label class="form-label" for="password">
                                                        Mật khẩu
                                                    </label>
                                                    <input
                                                        type={!isShowPass ? 'password' : 'text'}
                                                        id="password"
                                                        class="form-control form-control-lg"
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
                                            <div class="col-md-6 mb-2 pb-2 input-pass">
                                                <div class="form-outline ">
                                                    <label class="form-label" for="confirmpass">
                                                        Nhập lại mật khẩu
                                                    </label>
                                                    <input
                                                        type={!isShowConfirmPass ? 'password' : 'text'}
                                                        id="confirmpass"
                                                        class="form-control form-control-lg"
                                                    />
                                                    <span onClick={() => setIsShowConfirmPass(!isShowConfirmPass)}>
                                                        {!isShowConfirmPass ? (
                                                            <i className="fa-solid fa-eye-slash eye"></i>
                                                        ) : (
                                                            <i className="fa-solid fa-eye eye"></i>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <label class="form-label" for="formFileLg">
                                                Chọn ảnh đại diện
                                            </label>
                                            <input class="form-control form-control-lg" id="formFileLg" type="file" />
                                        </div>

                                        <div class="pt-2">
                                            <input class=" btn-lg btn-signup" type="submit" value="Đăng kí" />
                                        </div>

                                        <div class="col-md-12 mt-4 ">
                                            <p>
                                                {' '}
                                                Đã có tài khoản ?{' '}
                                                <Link style={{ color: 'blue' }} to={config.routes.signin}>
                                                    Đăng nhập
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
}

export default Signup;
