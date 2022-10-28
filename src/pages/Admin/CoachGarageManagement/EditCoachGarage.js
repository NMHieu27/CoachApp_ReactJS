import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import Dropdown from '~/components/Dropdown/Dropdown';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '~/config';

import './AddCoachGarage.scss';
import coachGarageAPI from '~/api/adminAPI/coachGarageAPI';
import commonDistrictAPI from '~/api/commonAPI/commonDistrictAPI';

function EditCoachGarage() {
    const [district, setDistrict] = useState();
    const currentUserId = localStorage.getItem('userId');
    const { id } = useParams();
    useEffect(() => {
        const fetchAllDistrict = async () => {
            try {
                const response = await commonDistrictAPI.getAll();
                if (response.code === 200) {
                    console.log('fetch district success');
                    setDistrict(response.data);
                } else {
                    console.log('fetchDistrict error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch district failed' + err.message);
            }
        };
        fetchAllDistrict();
    }, []);
    const nav = useNavigate();
    useEffect(() => {
        if (!currentUserId) {
            nav(config.routes.signin);
        }
    }, [currentUserId, nav]);
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [selectedDistrictId, setSelectedDistrictId] = useState();
    const status = [
        { id: 0, name: 'banned', title: 'Vô hiệu' },
        { id: 1, name: 'active', title: 'Hoạt động' },
    ];
    const [statusChecked, setStatusChecked] = useState(1);

    const formik = useFormik({
        initialValues: {
            garageId: '',
            fullname: '',
            name_garage: '',
            phone: '',
            email: '',
            address: '',
            districtId: '',
            userId: '',
            status: 1,
            contract: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng điền trường này !'),
            phone: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    'Phải là định dạng số và đủ 10 ký tự !',
                ),
            email: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email !'),
            name_garage: Yup.string().required('Vui lòng điền trường này !'),
            address: Yup.string().required('Vui lòng điền trường này !'),
            contract: Yup.string().required('Vui lòng điền trường này !'),
        }),
        onSubmit: async (values) => {
            console.log(currentUserId, selectedDistrictId);
            values.userId = +currentUserId;
            values.districtId = selectedDistrictId;
            values.status = statusChecked;
            if (!values.userId) {
                toast.error('Vui lòng đăng nhập để thực hiện đăng kí ', {
                    theme: 'colored',
                });
            } else {
                try {
                    // status của admin đối với nhà xe được phép chỉnh sửa
                    const params = {
                        id: +values.garageId,
                        name: values.name_garage,
                        owner: values.fullname,
                        phone: values.phone,
                        address: values.address,
                        districtId: values.districtId,
                        userId: values.userId,
                        email: values.email,
                        status: values.status,
                        contract: values.contract,
                    };
                    const response = await coachGarageAPI.updateCoachGarage(params);
                    if (response.code === 200) {
                        toast.success('Sửa nhà xe thành công !', { theme: 'colored' });
                        nav(config.routes.coachGarageManagement);
                    } else {
                        toast.error('Sửa nhà xe thất bại! ' + response.message, {
                            theme: 'colored',
                        });
                        throw new Error(response.message);
                    }
                } catch (error) {
                    console.log('Thất bại khi sửa dữ liệu: ', error.message);
                    toast.error('Thất bại khi sửa dữ liệu ! ' + error.message, { theme: 'colored' });
                }
                console.log(values);
            }
        },
    });

    useEffect(() => {
        const fetchCoachGarageById = async (id) => {
            try {
                const response = await coachGarageAPI.getCoachGarageById(id);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu thành công !', { theme: 'colored' });
                    formik.values.garageId = id;
                    formik.values.name_garage = response.data.name;
                    formik.values.fullname = response.data.owner;
                    formik.values.phone = response.data.phone;
                    formik.values.email = response.data.email;
                    formik.values.address = response.data.address;
                    +response.data.districtId !== +selectedDistrictId &&
                        setSelectedDistrictId(response.data.districtId);
                    formik.values.districtId = +selectedDistrictId;
                    formik.values.userId = response.data.userId;
                    formik.values.contract = response.data.contract;
                    response.data.status ? setStatusChecked(1) : setStatusChecked(0);
                    formik.values.status = statusChecked;
                } else {
                    toast.error('Lấy dữ liệu thất bại ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu ! ' + err.message, { theme: 'colored' });
            }
        };
        fetchCoachGarageById(id);
    }, []);

    return (
        <Helmet title="Thêm nhà xe">
            <div className="edit-coach-garage">
                <div
                    className="edit-coach-garage__breadcrumb"
                    style={{ background: '#fff', padding: '15px', borderRadius: '5px' }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <Link style={{ color: 'blue' }} to={config.routes.coachGarageManagement}>
                        Quản lý nhà xe
                    </Link>
                    <span>{` / `}</span>
                    <span>Sửa nhà xe</span>
                </div>
                <div
                    className="edit-coach-garage__form-edit-coach-garage"
                    style={{ background: '#fff', borderRadius: '5px', marginTop: '10px', padding: '15px 20%' }}
                >
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Sửa nhà xe
                    </h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="col-md-12 mb-2 pb-2">
                            <label className="form-label" htmlFor="fullname">
                                Họ và tên
                            </label>
                            <div className="form-outline">
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    className="form-control form-control-lg"
                                    value={formik.values.fullname}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.fullname && (
                                <p className="signin-signup__errorMsg">{formik.errors.fullname}</p>
                            )}
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <label className="form-label" htmlFor="name_garage">
                                Tên nhà xe
                            </label>
                            <div className="form-outline">
                                <input
                                    type="text"
                                    id="name_garage"
                                    name="name_garage"
                                    className="form-control form-control-lg"
                                    value={formik.values.name_garage}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.name_garage && (
                                <p className="signin-signup__errorMsg">{formik.errors.name_garage}</p>
                            )}
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label">Tỉnh, thành phố</label>
                                <div style={{ height: '56px' }}>
                                    {district && selectedDistrictId && (
                                        <Dropdown
                                            maxHeight={'150px'}
                                            options={district}
                                            // onChange={({ selected, selectedId }) => {
                                            //     selectedDistrict = selected;
                                            //     selectedDistrictId = selectedId;
                                            // }}
                                            selected={selectedDistrict}
                                            setSelected={setSelectedDistrict}
                                            selectedId={selectedDistrictId}
                                            setSelectedId={setSelectedDistrictId}
                                            isEdit
                                            placeholder="Chọn điểm đón"
                                            top={'100%'}
                                            paddingDropDown="0px 20px"
                                            borderDropDown="1px solid #ccc"
                                            borderRadiusDropDown="5px"
                                            borderContentDropDown="1px solid #ccc"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <label className="form-label" htmlFor="address">
                                Địa chỉ cụ thể
                            </label>
                            <div className="form-outline">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="form-control form-control-lg"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.address && (
                                <p className="signin-signup__errorMsg">{formik.errors.address}</p>
                            )}
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="emailAddress">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="emailAddress"
                                    className="form-control form-control-lg"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.email && <p className="signin-signup__errorMsg">{formik.errors.email}</p>}
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="phoneNumber">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phoneNumber"
                                    className="form-control form-control-lg"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.phone && <p className="signin-signup__errorMsg">{formik.errors.phone}</p>}
                        </div>

                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="contract">
                                    Hợp đồng
                                </label>
                                <textarea
                                    name="contract"
                                    id="contract"
                                    className="form-control form-control-lg"
                                    rows={5}
                                    value={formik.values.contract}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.contract && (
                                <p className="signin-signup__errorMsg">{formik.errors.contract}</p>
                            )}
                        </div>

                        <div class="col-md-12 mb-2">
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
                        <div className="col-md-12 pt-2" style={{ textAlign: 'center' }}>
                            <input className=" btn-lg btn-handle-primary text-light" type="submit" value="Thêm" />
                        </div>
                    </form>
                </div>
            </div>
        </Helmet>
    );
}

export default EditCoachGarage;
