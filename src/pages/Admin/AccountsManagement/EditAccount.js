import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '~/config';
import Helmet from '~/components/Helmet/Helmet';
import './EditAccount.scss';
import Image from '~/components/Image';
import accountAPI from '~/api/accountAPI';
import userAPI from '~/api/adminAPI/userAPI';

function EditAccount() {
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

    const [userNeedEdit, setUserNeedEdit] = useState([]);
    const [sexChecked, setSexChecked] = useState(0);
    const [statusChecked, setStatusChecked] = useState();
    const [roleSelected, setRoleSelected] = useState();
    const nav = useNavigate();
    const avatar_el = useRef();
    const { id } = useParams();

    const handleChangeImg = (e) => {
        const image = document.getElementById('img-preview');
        const src = URL.createObjectURL(e.target.files[0]);
        image.src = src;
    };
    const formik = useFormik({
        initialValues: {
            id: 0,
            fullname: '',
            gender: true,
            phone: '',
            email: '',
            avatar: '',
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
            values.id = +id;

            // console.log(avatar_el.current.files[0]);
            if (avatar_el.current.files[0]) {
                // values.avatar = avatar_el.current.files[0]; set như thế này khi đã có cloudinary
                // values.avatar = avatar_el.current.files[0].toString();
                values.avatar = avatar_el.current.files[0];
            }
            try {
                const params = {
                    id: values.id,
                    fullname: values.fullname,
                    password: values.password,
                    email: values.email,
                    phone: values.phone,
                    gender: values.gender,
                    avatar: values.avatar,
                    status: values.status,
                    roleId: values.roleId,
                };
                const response = await userAPI.updateUser(params);
                if (response.code === 200) {
                    toast.success('Sửa tài khoản thành công !', { theme: 'colored' });
                    nav(config.routes.accounts);
                } else {
                    toast.error('Không thể sửa tài khoản !' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (error) {
                console.log('Thất bại khi gửi dữ liệu: ', error.message);
                toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });

    useEffect(() => {
        const fetchAccount = async (id) => {
            try {
                const response = await userAPI.getUserById(id);
                if (response.code === 200) {
                    setUserNeedEdit(response.data);
                    toast.success('Lấy dữ liệu tài khoản thành công !', { theme: 'colored' });
                    formik.values.fullname = response.data.fullname;
                    response.data.gender ? setSexChecked(1) : setSexChecked(0);
                    formik.values.gender = response.data.gender;
                    formik.values.email = response.data.email;
                    formik.values.phone = response.data.phone;
                    // set formik cho avatar nua
                    formik.values.avatar = response.data.avatar;
                    response.data.role === 'admin'
                        ? setRoleSelected(2)
                        : response.data.role === 'user'
                        ? setRoleSelected(1)
                        : response.data.role === 'coachGarage'
                        ? setRoleSelected(3)
                        : setRoleSelected(4);
                    formik.values.roleId = roleSelected;
                    response.data.status ? setStatusChecked(1) : setStatusChecked(0);
                    formik.values.status = response.data.status;
                } else {
                    toast.error('Thất bại khi lấy dữ liệu ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error('Thất bại khi lấy thông tin tài khoản ! ' + error.message, { theme: 'colored' });
                console.log('Thất bại khi lấy thông tin tài khoản: ', error);
            }
        };

        fetchAccount(id);
    }, []);

    return (
        <Helmet title="Sửa người dùng">
            <div className="edit-account">
                <div
                    className="edit-account__breadcrumb"
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
                    <span>Sửa người dùng</span>
                </div>

                <div className="edit-account__form-edit-account" style={{ background: '#fff', borderRadius: '5px' }}>
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Sửa tài khoản
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
                        <div class="col-md-12 mb-2 image-input-container">
                            <div class="preview">
                                <Image id="img-preview" src={userNeedEdit.avatar} alt="" />
                                <label for="file-input">Tải ảnh lên</label>
                                <input
                                    name="avatar"
                                    ref={avatar_el}
                                    accept="image/*"
                                    type="file"
                                    multiple="multiple"
                                    id="file-input"
                                    onChange={(e) => handleChangeImg(e)}
                                />
                            </div>
                        </div>

                        <div class="pt-2" style={{ textAlign: 'center' }}>
                            <input class=" btn-lg btn btn-handle-primary text-light" type="submit" value="Cập nhật" />
                        </div>
                    </form>
                </div>
            </div>
        </Helmet>
    );
}

export default EditAccount;
