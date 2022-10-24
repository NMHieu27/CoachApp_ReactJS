import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '~/config';
import Helmet from '~/components/Helmet/Helmet';
import './AddAccount.scss';
function AddAccount() {
    const nav = useNavigate();
    const avatar_el = useRef();
    const formik = useFormik({
        initialValues: {
            fullname: '',
            gender: true,
            phone: '',
            email: '',
            avatar: '',
            password: '',
            confirmPassword: '',
            roleId: 1,
            status: 1,
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng điền trường này !').min(8, 'Tối thiểu 8 kí tự !'),
            phone: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    'Phải là định dạng số và đủ 10 ký tự !',
                ),
            email: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email !'),
            password: Yup.string().required('Vui lòng điền trường này !').min(6, 'Tối thiểu 6 ký tự !'),
            confirmPassword: Yup.string().required('Vui lòng điền trường này !').min(6, 'Tối thiểu 6 ký tự !'),
        }),
        onSubmit: async (values) => {
            if (sexChecked === 0) {
                values.gender = false;
                console.log(values.gender);
            } else {
                values.gender = true;
                console.log(values.gender);
            }

            values.roleId = +roleSelected;
            values.status = statusChecked;

            console.log(avatar_el.current.files[0]);
            if (avatar_el.current.files[0]) {
                // values.avatar = avatar_el.current.files[0]; set như thế này khi đã có cloudinary
                values.avatar = avatar_el.current.files[0].toString();
            }
            try {
                const params = {
                    fullname: values.fullname,
                    password: values.password,
                    email: values.email,
                    phone: values.phone,
                    gender: values.gender,
                    avatar: values.avatar,
                };
                if (!values.password.includes(values.confirmPassword)) {
                    toast.error('Password xác nhận không chính xác', {
                        theme: 'colored',
                    });
                } else {
                    // handle API
                    nav(config.routes.accounts);
                }
            } catch (error) {
                console.log('Thất bại khi gửi dữ liệu: ', error.message);
                toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });
    const sexs = [
        { id: 0, name: 'male', title: 'Nam' },
        { id: 1, name: 'female', title: 'Nữ' },
    ];
    const status = [
        { id: 0, name: 'banned', title: 'Vô hiệu' },
        { id: 1, name: 'active', title: 'Hoạt động' },
    ];

    const roles = [
        { id: 1, name: 'user', title: 'Người dùng' },
        { id: 2, name: 'admin', title: 'Quản trị viên' },
        { id: 3, name: 'coachGarage', title: 'Nhà xe' },
        { id: 4, name: 'employee', title: 'Nhân viên' },
    ];
    const [sexChecked, setSexChecked] = useState(0);
    const [statusChecked, setStatusChecked] = useState(1);
    const [roleSelected, setRoleSelected] = useState(1);
    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
    return (
        <Helmet title="Thêm người dùng">
            <div className="add-account">
                <div
                    className="add-account__breadcrumb"
                    style={{ background: '#fff', padding: '15px', borderRadius: '5px' }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <Link style={{ color: 'blue' }} to={config.routes.accounts}>
                        Quản lý người dùng
                    </Link>
                    <span>{` / `}</span>
                    <span>Thêm người dùng</span>
                </div>

                <div className="add-account__form-add-account" style={{ background: '#fff', borderRadius: '5px' }}>
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Thêm tài khoản
                    </h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <label class="form-label" for="fullname">
                                    Họ và tên
                                </label>
                                <div class="form-outline">
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        class="form-control form-control-lg"
                                        value={formik.values.fullname}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {formik.errors.fullname && (
                                    <p className="signin-signup__errorMsg">{formik.errors.fullname}</p>
                                )}
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
                            <div class="col-md-12 mb-2 pb-2">
                                <div class="form-outline">
                                    <label class="form-label" for="emailAddress">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="emailAddress"
                                        class="form-control form-control-lg"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {formik.errors.email && (
                                    <p className="signin-signup__errorMsg">{formik.errors.email}</p>
                                )}
                            </div>
                            <div class="col-md-12 mb-2 pb-2">
                                <div class="form-outline">
                                    <label class="form-label" for="phoneNumber">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phoneNumber"
                                        class="form-control form-control-lg"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {formik.errors.phone && (
                                    <p className="signin-signup__errorMsg">{formik.errors.phone}</p>
                                )}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mb-2 pb-2 input-pass">
                                <div class="form-outline">
                                    <label class="form-label" for="password">
                                        Mật khẩu
                                    </label>
                                    <div class="form-input-password">
                                        <input
                                            type={!isShowPass ? 'password' : 'text'}
                                            id="password"
                                            name="password"
                                            class="form-control form-control-lg"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
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
                                {formik.errors.password && (
                                    <p className="signin-signup__errorMsg">{formik.errors.password}</p>
                                )}
                            </div>
                            <div class="col-md-12 mb-2 pb-2 input-pass">
                                <div class="form-outline ">
                                    <label class="form-label" for="confirmpass">
                                        Nhập lại mật khẩu
                                    </label>
                                    <div class="form-input-password">
                                        <input
                                            type={!isShowConfirmPass ? 'password' : 'text'}
                                            name="confirmPassword"
                                            id="confirmpass"
                                            class="form-control form-control-lg"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
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
                                {formik.errors.confirmPassword && (
                                    <p className="signin-signup__errorMsg">{formik.errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <label class="form-label" for="role">
                                    Phân quyền
                                </label>
                                <select
                                    id="role"
                                    class="form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example"
                                    onChange={(e) => setRoleSelected(e.target.value)}
                                >
                                    {roles.map((role) => (
                                        <option selected={roleSelected === role.id} value={role.id}>
                                            {role.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label class="form-label" for="status">
                                    Trạng thái
                                </label>
                                <div className="status-group mt-2">
                                    {status.map((status) => (
                                        <div key={status.id} class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="status"
                                                id={status.name}
                                                value="option1"
                                                checked={statusChecked === status.id}
                                                onChange={() => setStatusChecked(status.id)}
                                            />
                                            <label class="form-check-label" for={status.name}>
                                                {status.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 mb-2">
                            <label class="form-label" for="formFileLg">
                                Chọn ảnh đại diện
                            </label>
                            <input
                                ref={avatar_el}
                                class="form-control form-control-lg"
                                id="formFileLg"
                                type="file"
                                name="file"
                                multiple="multiple"
                            />
                        </div>

                        <div class="pt-2" style={{ textAlign: 'center' }}>
                            <input class=" btn-lg btn btn-handle-primary text-light" type="submit" value="Thêm" />
                        </div>
                    </form>
                </div>
            </div>
        </Helmet>
    );
}

export default AddAccount;
