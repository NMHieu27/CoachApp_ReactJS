import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Helmet from '~/components/Helmet/Helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import config from '~/config';
import Dropdown from '~/components/Dropdown/Dropdown';
import ticketAPI from '~/api/employeeAPI/ticketAPI';
import commonStopByAPI from '~/api/commonAPI/commonStopByAPI';
function EmployeeEditTicket() {
    const nav = useNavigate();
    const { ticketId, coachesId } = useParams();
    const [pickUpList, setPickUpList] = useState();
    const [dropOffList, setDropOffList] = useState();
    const [selectedPickUp, setSelectedPickUp] = useState();
    const [selectedPickUpId, setSelectedPickUpId] = useState();
    const [selectedDropOff, setSelectedDropOff] = useState();
    const [selectedDropOffId, setSelectedDropOffId] = useState();

    const [statusChecked, setStatusChecked] = useState();

    const status = [
        { id: 0, name: 'banned', title: 'Vô hiệu' },
        { id: 1, name: 'active', title: 'Hoạt động' },
    ];

    // fetch list pick up
    useEffect(() => {
        const fetchAllPickUpByCoachesId = async (coachesId) => {
            try {
                const response = await commonStopByAPI.getPickUpByCoachesId(coachesId);
                if (response.code === 200) {
                    console.log('fetch pickup success');
                    console.log(response.data);
                    setPickUpList([...response.data]);
                } else {
                    console.log('fetch pickup error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch pickup failed' + err.message);
            }
        };
        fetchAllPickUpByCoachesId(coachesId);
    }, []);

    // fetch list drop off
    useEffect(() => {
        const fetchAllDropOffByCoachesId = async (coachesId) => {
            try {
                const response = await commonStopByAPI.getDropOffByCoachesId(coachesId);
                if (response.code === 200) {
                    console.log('fetch dropoff success');
                    console.log(response.data);
                    setDropOffList([...response.data]);
                } else {
                    console.log('fetch dropoff error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch dropoff failed' + err.message);
            }
        };
        fetchAllDropOffByCoachesId(coachesId);
    }, []);

    const formik = useFormik({
        initialValues: {
            id: 0,
            fullname: '',
            phone: '',
            email: '',
            pickUpId: 1,
            dropOffId: 1,
            seatNum: 1,
            status: 1,
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
            seatNum: Yup.string().required('Số ghế không bỏ trống !'),
        }),
        onSubmit: async (values) => {
            values.id = +ticketId;
            values.pickUpId = +selectedPickUpId;
            values.dropOffId = +selectedDropOffId;
            values.status = +statusChecked;
            try {
                const params = {
                    id: values.id,
                    fullname: values.fullname,
                    email: values.email,
                    phone: values.phone,
                    pickUpId: values.pickUpId,
                    dropOffId: values.dropOffId,
                    seatNum: values.seatNum,
                    status: values.status,
                };

                const response = await ticketAPI.updateTicket(params);
                if (response.code === 200) {
                    toast.success('Sửa vé thành công !', { theme: 'colored' });
                    nav(-1);
                } else {
                    toast.error('Sửa vé thất bại !' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error('Thất bại khi sửa dữ liệu' + err.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });

    useEffect(() => {
        const fetchTicketById = async (ticketId) => {
            try {
                const response = await ticketAPI.getTicketById(ticketId);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu thành công !', { theme: 'colored' });
                    formik.values.id = response.data.id;
                    formik.values.fullname = response.data?.fullname;
                    formik.values.phone = response.data.phone;
                    formik.values.email = response.data.email;

                    +response.data.pickUpId !== +selectedPickUpId && setSelectedPickUpId(response.data.pickUpId);
                    formik.values.pickUpId = +selectedPickUpId;

                    +response.data.dropOffId !== +selectedDropOffId && setSelectedDropOffId(response.data.dropOffId);
                    formik.values.dropOffId = +selectedDropOffId;

                    formik.values.seatNum = +response.data.seatNum;

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
        fetchTicketById(ticketId);
    }, []);
    return (
        <Helmet title="Sửa vé xe">
            <div className="employee-edit-ticket container">
                <div
                    className="employee-edit-ticket__breadcrumb"
                    style={{ background: '#fff', padding: '15px', borderRadius: '5px' }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.home}>
                        Trang chủ
                    </Link>
                    <span>{` / `}</span>
                    <Link style={{ color: 'blue' }} to={config.routes.employeeManageCoaches}>
                        Quản lý chuyến xe
                    </Link>
                    <span>{` / `}</span>
                    <span>Sửa vé xe</span>
                </div>
                <div
                    className="employee-edit-ticket__form-edit-ticket"
                    style={{ background: '#fff', borderRadius: '5px', marginTop: '10px', padding: '15px 10%' }}
                >
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Sửa vé xe
                    </h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="col-md-12 mb-2 pb-2">
                            <label className="form-label" htmlFor="fullname">
                                Họ tên
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
                                <label className="form-label">Chọn điểm đón</label>
                                <div style={{ height: '56px' }}>
                                    {pickUpList && (
                                        <Dropdown
                                            maxHeight={'150px'}
                                            options={pickUpList}
                                            selected={selectedPickUp}
                                            setSelected={setSelectedPickUp}
                                            selectedId={selectedPickUpId}
                                            setSelectedId={setSelectedPickUpId}
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
                            <div className="form-outline">
                                <label className="form-label">Chọn điểm trả</label>
                                <div style={{ height: '56px' }}>
                                    {dropOffList && (
                                        <Dropdown
                                            maxHeight={'150px'}
                                            options={dropOffList}
                                            selected={selectedDropOff}
                                            setSelected={setSelectedDropOff}
                                            selectedId={selectedDropOffId}
                                            setSelectedId={setSelectedDropOffId}
                                            isEdit
                                            placeholder="Chọn điểm trả"
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
                        <div class="col-md-12 mb-2 pb-2">
                            <div class="form-outline">
                                <label class="form-label" for="seatNum">
                                    Số ghế
                                </label>
                                <input
                                    min={1}
                                    max={100}
                                    type="number"
                                    name="seatNum"
                                    id="seatNum"
                                    class="form-control form-control-lg"
                                    value={formik.values.seatNum}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.seatNum && (
                                <p className="signin-signup__errorMsg">{formik.errors.seatNum}</p>
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
                            <input className=" btn-lg btn-handle-primary text-light" type="submit" value="Sửa" />
                        </div>
                    </form>
                </div>
            </div>
        </Helmet>
    );
}

export default EmployeeEditTicket;
