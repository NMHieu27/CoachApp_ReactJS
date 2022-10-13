import Helmet from '~/components/Helmet/Helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '~/config';
import './AccountInfoSetting.scss';
import Image from '~/components/Image';
import accountAPI from '~/api/accountAPI';
import userAPI from '~/api/userAPI';
function AccountInfoSetting() {
    const currentUserId = localStorage.getItem('userId');
    const sexs = [
        { id: 0, name: 'male', title: 'Nam' },
        { id: 1, name: 'female', title: 'Nữ' },
    ];
    const [sexChecked, setSexChecked] = useState();
    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
    const navigate = useNavigate();
    const avatar_el = useRef();

    const handleChangeImg = (e) => {
        const image = document.getElementById('img-preview');
        const src = URL.createObjectURL(e.target.files[0]);
        image.src = src;
    };

    const formik = useFormik({
        initialValues: {
            fullname: '',
            gender: '',
            phone: '',
            email: '',
            avatar: '',
            password: '',
            confirmPassword: '',
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
            console.log('eeeee');
            console.log(avatar_el);
            console.log(avatar_el.current.files[0]);
            if (avatar_el.current.files[0]) {
                // values.avatar = avatar_el.current.files[0]; set như thế này khi đã có cloudinary
                values.avatar = avatar_el.current.files[0].toString();
            }
            console.log('tesssss');
            console.log(values.avatar);
            try {
                const params = {
                    id: +currentUserId,
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
                    const response = await accountAPI.postUpdateInfo(params);
                    if (response.code === 200) {
                        toast.success('Cập nhật thông tin thành công !', { theme: 'colored' });
                        localStorage.setItem('fullname', 'A');
                        setTimeout(() => navigate(config.routes.accountinfo), 1000);
                    } else {
                        console.log(response.code);
                        toast.error('Cập nhật thất bại thất bại! ' + response.message, {
                            theme: 'colored',
                        });
                    }
                }
            } catch (error) {
                console.log('Thất bại khi gửi dữ liệu: ', error.message);
                toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await userAPI.getUserById(currentUserId);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu tài khoản thành công !', { theme: 'colored' });
                    formik.values.fullname = response.data.fullname;
                    response.data.gender ? setSexChecked(1) : setSexChecked(0);
                    formik.values.gender = response.data.gender;
                    formik.values.email = response.data.email;
                    formik.values.phone = response.data.phone;
                    // set formik cho avatar nua
                    formik.values.avatar = response.data.avatar;
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
        <Helmet title="Chỉnh sửa thông tin">
            <div className="account-setting-wrapper">
                <div className="account-setting-container container ">
                    <div className="row account-setting-content">
                        {/* upload img */}
                        <div className="col-4 account-setting-content__left">
                            <div class="image-input-container">
                                <div class="preview">
                                    <Image id="img-preview" src="cho-nay-lay-anh-tu-api" alt="" />
                                    <label for="file-input">Tải ảnh lên</label>
                                    <input
                                        ref={avatar_el}
                                        accept="image/*"
                                        type="file"
                                        multiple="multiple"
                                        id="file-input"
                                        onChange={(e) => handleChangeImg(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* form update */}
                        <div className="col-8 account-setting-content__right">
                            <div className="title-update-info">Chỉnh sửa thông tin</div>
                            <div className="form-user-info-update">
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
                                        <div class="col-md-6 mb-2 pb-2">
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
                                        <div class="col-md-6 mb-2 pb-2">
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
                                        <div class="col-md-6 mb-2 pb-2 input-pass">
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
                                        <div class="col-md-6 mb-2 pb-2 input-pass">
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
                                                <p className="signin-signup__errorMsg">
                                                    {formik.errors.confirmPassword}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div class="pt-2" style={{ textAlign: 'right' }}>
                                        <input class=" btn-lg btn-signup" type="submit" value="Lưu" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default AccountInfoSetting;
