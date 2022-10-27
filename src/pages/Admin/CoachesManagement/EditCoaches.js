import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import Dropdown from '~/components/Dropdown/Dropdown';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '~/config';

import './EditCoaches.scss';
import countryAPI from '~/api/countryAPI';
import StopByBox from '~/components/StopByBox/StopByBox';
import stopByAPI from '~/api/stopByAPI';
import coachesAPI from '~/api/adminAPI/coachesAPI';

function EditCoaches() {
    const nav = useNavigate();
    const { id } = useParams();
    //Líst danh sách điểm xuất phát và kết thúc
    const [startPointList, setStartPointList] = useState();
    const [endPointList, setEndPointList] = useState();

    //
    const [selectedStartPoint, setSelectedStartPoint] = useState();
    const [selectedStartPointId, setSelectedStartPointId] = useState(1);
    const [selectedEndPoint, setSelectedEndPoint] = useState();
    const [selectedEndPointId, setSelectedEndPointId] = useState(1);

    const [pickUpList, setPickUpList] = useState([]);
    const [dropOffList, setDropOffList] = useState([]);
    const [selectedPickUp, setSelectedPickUp] = useState();
    const [selectedPickUpId, setSelectedPickUpId] = useState(1);
    const [selectedDropOff, setSelectedDropOff] = useState();
    const [selectedDropOffId, setSelectedDropOffId] = useState(1);

    //Danh sách điểm đón trả về server
    const [pickUpListReq, setPickUpListReq] = useState([]);
    // Danh sách điểm trả trả về server
    const [dropOffListReq, setDropOffListReq] = useState([]);

    const status = [
        { id: 0, name: 'banned', title: 'Vô hiệu' },
        { id: 1, name: 'active', title: 'Hoạt động' },
    ];
    const isShipping = [
        { id: 0, name: 'noShip', title: 'Không nhận giao hàng' },
        { id: 1, name: 'ship', title: 'Nhận giao hàng' },
    ];
    const [shippingChecked, setShippingChecked] = useState();
    const [statusChecked, setStatusChecked] = useState();
    //Get start point list
    useEffect(() => {
        const fetchAllStartPoint = async () => {
            try {
                const response = await countryAPI.getAll();
                if (response.code === 200) {
                    console.log('fetch start point success');
                    setStartPointList(response.data);
                } else {
                    console.log('fetch start point error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch start point failed' + err.message);
            }
        };
        fetchAllStartPoint();
    }, []);

    //Get end point list
    useEffect(() => {
        const fetchAllEndPoint = async () => {
            try {
                const response = await countryAPI.getAll();
                if (response.code === 200) {
                    console.log('fetch end point success');
                    setEndPointList(response.data);
                } else {
                    console.log('fetch end point error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch end point failed' + err.message);
            }
        };
        fetchAllEndPoint();
    }, []);

    // fetch list pick up
    useEffect(() => {
        const fetchAllPickUpByStartPoint = async (selectedStartPointId) => {
            try {
                // setPickUpListReq([]);
                const response = await stopByAPI.getStopByCountryId(selectedStartPointId);
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
        fetchAllPickUpByStartPoint(selectedStartPointId);
    }, [selectedStartPointId]);

    // fetch list drop off
    useEffect(() => {
        const fetchAllDropOffByEndPoint = async (selectedEndPointId) => {
            try {
                // setDropOffListReq([]);
                const response = await stopByAPI.getStopByCountryId(selectedEndPointId);
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
        fetchAllDropOffByEndPoint(selectedEndPointId);
    }, [selectedEndPointId]);

    // fetch list pickup request by coaches id
    useEffect(() => {
        const fetchAllPickUpByCoachesID = async (id) => {
            try {
                const response = await stopByAPI.getPickUpByCoachesId(id);
                if (response.code === 200) {
                    console.log('fetch pickup req success');
                    console.log(response.data);
                    setPickUpListReq([...response.data]);
                } else {
                    console.log('fetch pickup req error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch pickup req failed' + err.message);
            }
        };
        fetchAllPickUpByCoachesID(id);
    }, []);

    // fetch list dropoff request by coaches id
    useEffect(() => {
        const fetchAllDropOffByCoachesID = async (id) => {
            try {
                const response = await stopByAPI.getDropOffByCoachesId(id);
                if (response.code === 200) {
                    console.log('fetch dropoff req success');
                    console.log(response.data);
                    setDropOffListReq([...response.data]);
                } else {
                    console.log('fetch dropoff req error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch dropoff req failed' + err.message);
            }
        };
        fetchAllDropOffByCoachesID(id);
    }, []);

    const formik = useFormik({
        initialValues: {
            id: 0,
            emptySeat: 1,
            startTime: '',
            endTime: '',
            description: '',
            price: '',
            coachId: '',
            startPoint: '',
            endPoint: '',
            shipping: true,
            status: 1,
            pick_up: [],
            drop_off: [],
        },
        validationSchema: Yup.object({
            startTime: Yup.date().required('Vui lòng chọn ngày giờ đi !'),
            endTime: Yup.date().required('Vui lòng chọn ngày giờ đến !'),
            description: Yup.string().required('Vui lòng điền trường này !'),
            price: Yup.string().required('Vui lòng điền trường này'),
            coachId: Yup.string().required('Vui lòng điền trường này'),
            emptySeat: Yup.string().required('Vui lòng điền trường này'),
        }),
        onSubmit: async (values) => {
            values.startPoint = selectedStartPointId;
            values.endPoint = selectedEndPointId;
            values.status = +statusChecked;
            +shippingChecked === 1 ? (values.shipping = true) : (values.shipping = false);
            values.pick_up = pickUpListReq;
            values.drop_off = dropOffListReq;
            try {
                // status của admin đối với nhà xe được phép chỉnh sửa
                const params = {
                    id: values.id,
                    startTime: values.startTime,
                    endTime: values.endTime,
                    description: values.description,
                    price: +values.price,
                    coachId: +values.coachId,
                    startPoint: +values.startPoint,
                    endPoint: +values.endPoint,
                    emptySeat: +values.emptySeat,
                    shipping: values.shipping,
                    status: values.status,
                    pick_up: values.pick_up,
                    drop_off: values.drop_off,
                };
                //Đổi APi đúng chức năng
                const response = await coachesAPI.updateCoaches(params);
                if (response.code === 200) {
                    toast.success('Sửa chuyến xe thành công !', { theme: 'colored' });
                    nav(config.routes.coachesManagement);
                } else {
                    toast.error('Sửa chuyến xe thất bại! ' + response.message, {
                        theme: 'colored',
                    });
                    throw new Error(response.message);
                }
            } catch (error) {
                console.log('Thất bại khi gửi dữ liệu: ', error.message);
                toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
            }

            console.log(pickUpListReq);
            console.log(dropOffListReq);
            console.log(values);
        },
    });

    useEffect(() => {
        const fetchCoachesById = async (id) => {
            try {
                const response = await coachesAPI.getCoachesById(id);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu thành công !', { theme: 'colored' });
                    formik.values.id = response.data.id;
                    formik.values.startTime = response.data.startTime;
                    formik.values.endTime = response.data.endTime;
                    formik.values.description = response.data.description;
                    formik.values.price = response.data.price;
                    formik.values.emptySeat = +response.data.emptySeat;
                    formik.values.coachId = response.data.coachId;

                    +response.data.startPoint !== +selectedStartPointId &&
                        setSelectedStartPointId(response.data.startPoint);
                    formik.values.startPoint = +selectedStartPointId;

                    +response.data.endPoint !== +selectedEndPointId && setSelectedEndPointId(response.data.endPoint);
                    formik.values.endPoint = +selectedEndPointId;

                    response.data.shipping ? setShippingChecked(1) : setShippingChecked(0);
                    formik.values.shipping = response.data.shipping;
                    response.data.status ? setStatusChecked(1) : setStatusChecked(0);
                    formik.values.status = statusChecked;
                    response.data.pick_up &&
                        response.data.pick_up.length > 0 &&
                        setPickUpList([...response.data.pick_up]);
                    response.data.drop_off &&
                        response.data.drop_off.length > 0 &&
                        setDropOffList([...response.data.drop_off]);
                } else {
                    toast.error('Lấy dữ liệu thất bại ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu ! ' + err.message, { theme: 'colored' });
            }
        };
        fetchCoachesById(id);
    }, []);
    return (
        <Helmet title="Sửa chuyến xe">
            <div className="add-coach">
                <div
                    className="add-coach__breadcrumb"
                    style={{ background: '#fff', padding: '15px', borderRadius: '5px' }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <Link style={{ color: 'blue' }} to={config.routes.coachesManagement}>
                        Quản lý chuyến xe
                    </Link>
                    <span>{` / `}</span>
                    <span>Sửa chuyến xe</span>
                </div>
                <div
                    className="add-coach__form-add-coach"
                    style={{ background: '#fff', borderRadius: '5px', marginTop: '10px', padding: '15px 20%' }}
                >
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Sửa chuyến xe
                    </h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="col-md-12 mb-2 pb-2">
                            <label className="form-label" htmlFor="coachId">
                                Mã xe
                            </label>
                            <div className="form-outline">
                                <input
                                    type="text"
                                    id="coachId"
                                    name="coachId"
                                    className="form-control form-control-lg"
                                    value={formik.values.coachId}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.coachId && (
                                <p className="signin-signup__errorMsg">{formik.errors.coachId}</p>
                            )}
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2 pb-2">
                                <div className="form-outline">
                                    <label className="form-label">Nơi đi</label>
                                    <div style={{ height: '56px' }}>
                                        {startPointList && (
                                            <Dropdown
                                                maxHeight={'150px'}
                                                options={startPointList}
                                                selected={selectedStartPoint}
                                                setSelected={setSelectedStartPoint}
                                                selectedId={selectedStartPointId}
                                                setSelectedId={setSelectedStartPointId}
                                                isEdit
                                                placeholder="Chọn nhà xe"
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

                            <div className="col-md-6 mb-2 pb-2">
                                <div className="form-outline">
                                    <label className="form-label">Nơi trả</label>
                                    <div style={{ height: '56px' }}>
                                        {endPointList && (
                                            <Dropdown
                                                maxHeight={'150px'}
                                                options={endPointList}
                                                selected={selectedEndPoint}
                                                setSelected={setSelectedEndPoint}
                                                selectedId={selectedEndPointId}
                                                setSelectedId={setSelectedEndPointId}
                                                isEdit
                                                placeholder="Chọn loại xe"
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
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2 pb-2">
                                <label className="form-label" htmlFor="startTime">
                                    Thời gian bắt đầu
                                </label>
                                <div className="form-outline">
                                    <input
                                        type="datetime-local"
                                        id="startTime"
                                        name="startTime"
                                        className="form-control form-control-lg"
                                        value={formik.values.startTime}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {formik.errors.startTime && (
                                    <p className="signin-signup__errorMsg">{formik.errors.startTime}</p>
                                )}
                            </div>
                            <div className="col-md-6 mb-2 pb-2">
                                <label className="form-label" htmlFor="endTime">
                                    Thời gian dự tính kết thúc
                                </label>
                                <div className="form-outline">
                                    <input
                                        type="datetime-local"
                                        id="endTime"
                                        name="endTime"
                                        className="form-control form-control-lg"
                                        value={formik.values.endTime}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {formik.errors.endTime && (
                                    <p className="signin-signup__errorMsg">{formik.errors.endTime}</p>
                                )}
                            </div>
                        </div>

                        {/* set up stop by for your coaches */}
                        <div className="row stop-by-container">
                            {/* Điểm đón */}
                            <div className="col-md-6 mb-2 pb-2 ">
                                <label className="form-label">Chọn điểm đón</label>
                                {pickUpList.length > 0 && (
                                    <StopByBox
                                        stopByList={pickUpListReq}
                                        setStopByList={setPickUpListReq}
                                        pointList={pickUpList}
                                        selectedPoint={selectedPickUp}
                                        setSelectedPoint={setSelectedPickUp}
                                        selectedPointId={selectedPickUpId}
                                        setSelectedPointId={setSelectedPickUpId}
                                    />
                                )}
                            </div>

                            {/* Điểm trả */}
                            <div className="col-md-6 mb-2 pb-2 ">
                                <label className="form-label">Chọn điểm trả</label>
                                {dropOffList.length > 0 && (
                                    <StopByBox
                                        stopByList={dropOffListReq}
                                        setStopByList={setDropOffListReq}
                                        pointList={dropOffList}
                                        selectedPoint={selectedDropOff}
                                        setSelectedPoint={setSelectedDropOff}
                                        selectedPointId={selectedDropOffId}
                                        setSelectedPointId={setSelectedDropOffId}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="description">
                                    Mô tả
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="form-control form-control-lg"
                                    rows={5}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.description && (
                                <p className="signin-signup__errorMsg">{formik.errors.description}</p>
                            )}
                        </div>
                        <div class="col-md-12 mb-2 pb-2">
                            <div class="form-outline">
                                <label class="form-label" for="emptySeat">
                                    Số ghế trống
                                </label>
                                <input
                                    min={1}
                                    max={100}
                                    type="number"
                                    name="emptySeat"
                                    id="emptySeat"
                                    class="form-control form-control-lg"
                                    value={formik.values.emptySeat}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.emptySeat && (
                                <p className="signin-signup__errorMsg">{formik.errors.emptySeat}</p>
                            )}
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <label className="form-label" htmlFor="price">
                                Giá
                            </label>
                            <div className="form-outline">
                                <input
                                    type="number"
                                    min={0}
                                    max={5000000}
                                    id="price"
                                    name="price"
                                    className="form-control form-control-lg"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.price && <p className="signin-signup__errorMsg">{formik.errors.price}</p>}
                        </div>
                        <div className="row">
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

                            <div class="col-md-6 mb-2">
                                <label class="form-label" for="ship">
                                    Giao hàng
                                </label>
                                <div className="ship-group mt-2">
                                    {isShipping.map((ship) => (
                                        <div key={ship.id} class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="ship"
                                                id={ship.name}
                                                value="option1"
                                                checked={shippingChecked === ship.id}
                                                onChange={() => setShippingChecked(ship.id)}
                                            />
                                            <label class="form-check-label" for={ship.name}>
                                                {ship.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
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

export default EditCoaches;
