import { useState } from 'react';
import './signin.scss';
function Signin(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPass, setIsShowPass] = useState(false);

    const handleLogin = () => {
        console.log(username);
        console.log(password);
    };
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content">
                    <div className="col-12  text-login">Đăng nhập</div>

                    <div className="col-12 form-group input-login">
                        <label>Tên đăng nhập:</label>
                        <input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>

                    <div className="col-12 form-group input-login">
                        <label>Mật khẩu:</label>
                        <div className="custom-input-password">
                            <input
                                className="form-control"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type={!isShowPass ? 'password' : 'text'}
                                placeholder="Nhập mật khẩu"
                            />
                            <span onClick={() => setIsShowPass(!isShowPass)}>
                                {!isShowPass ? (
                                    <i class="fa-solid fa-eye eye"></i>
                                ) : (
                                    <i class="fa-solid fa-eye-slash eye"></i>
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
                        <span className="forgot-password">Quên mật khẩu?</span>
                    </div>

                    <div className="col-12 text-center mt-3">
                        <span className="text-other-login">Hoặc đăng nhập với:</span>
                    </div>

                    <div className="col-12 social-login">
                        <i class="fa-brands fa-google-plus-g google"></i>
                        <i class="fa-brands fa-facebook-f facebook"></i>
                    </div>

                    <div className="col-12 text-center signup">
                        <div>Bạn chưa có tài khoản?</div>
                        <div>Đăng kí</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
