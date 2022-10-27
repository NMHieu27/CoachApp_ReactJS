import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dropdown from '../Dropdown/Dropdown';
import './ModalBooking.scss';
import { toast } from 'react-toastify';
import numberWithCommas from '~/utils/numberWithCommas';
import Modal from '../Modal/Modal';
import ticketAPI from '~/api/userAPI/ticketAPI';
function ModalBooking({
    userId,
    coachesId,
    pickUpList,
    dropOffList,
    maxSeat,
    price = 100000,
    isShowingBooking,
    setIsShowingBooking,
    toggleBooking,
}) {
    const userRole = localStorage.getItem('role');
    const [isUser, setIsUser] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const [selectedPickUp, setSelectedPickUp] = useState();
    const [selectedPickUpId, setSelectedPickUpId] = useState();
    const [selectedDropOff, setSelectedDropOff] = useState();
    const [selectedDropOffId, setSelectedDropOffId] = useState();

    useEffect(() => {
        (!userRole || userRole === 'user') && setIsUser(true);
    }, []);

    const formik = useFormik({
        initialValues: {
            userId: 0,
            coachesId: 0,
            fullname: '',
            phone: '',
            email: '',
            pickUpId: 1,
            dropOffId: 1,
            seatNum: 1,
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
            values.coachesId = +coachesId;
            values.userId = +userId;
            values.pickUpId = +selectedPickUpId;
            values.dropOffId = +selectedDropOffId;
            try {
                const params = {
                    fullname: values.fullname,
                    email: values.email,
                    phone: values.phone,
                    coachesId: values.coachesId,
                    userId: values.userId,
                    pickUpId: values.pickUpId,
                    dropOffId: values.dropOffId,
                    seatNum: values.seatNum,
                };

                // Dung api thanh toan momo
                // const response = await ticketAPI.postAddTicket(params);
                // if (response.code === 200) {
                //     toast.success('Đặt vé thành công !', { theme: 'colored' });
                // } else {
                //     toast.error('Đặt vé thất bại !' + response.message, { theme: 'colored' });
                //     throw new Error(response.message);
                // }
            } catch (err) {
                toast.error('Thất bại khi thêm dữ liệu' + err.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });
    const handleCashPayment = async () => {
        formik.values.coachesId = +coachesId;
        formik.values.userId = +userId;
        formik.pickUpId = +selectedPickUpId;
        formik.dropOffId = +selectedDropOffId;
        try {
            const params = {
                fullname: formik.values.fullname,
                email: formik.values.email,
                phone: formik.values.phone,
                coachesId: formik.values.coachesId,
                userId: formik.values.userId,
                pickUpId: formik.values.pickUpId,
                dropOffId: formik.values.dropOffId,
                seatNum: formik.values.seatNum,
            };
            console.log(params);
            const response = await ticketAPI.addTicket(params);
            if (response.code === 200) {
                toast.success('Đặt vé thành công !', { theme: 'colored' });
            } else {
                toast.error('Đặt vé thất bại !' + response.message, { theme: 'colored' });
                throw new Error(response.message);
            }
        } catch (err) {
            toast.error('Thất bại khi thêm dữ liệu' + err.message, { theme: 'colored' });
        }
    };
    return (
        <Modal
            isShowing={isShowingBooking}
            setIsShowing={setIsShowingBooking}
            hide={toggleBooking}
            // isFooter={true}
            title="Đặt vé"
        >
            <div
                className="add-coach__form-add-coach"
                style={{ background: '#fff', borderRadius: '5px', marginTop: '10px', padding: '15px 10%' }}
            >
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
                        {formik.errors.fullname && <p className="signin-signup__errorMsg">{formik.errors.fullname}</p>}
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
                                max={maxSeat}
                                type="number"
                                name="seatNum"
                                id="seatNum"
                                class="form-control form-control-lg"
                                value={formik.values.seatNum}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.seatNum && <p className="signin-signup__errorMsg">{formik.errors.seatNum}</p>}
                    </div>
                    <div className="modal-booking__input-field__label" style={{ textAlign: 'right' }}>
                        Tổng tiền: {numberWithCommas(+formik.values.seatNum * price)}đ
                    </div>
                    {isUser ? (
                        <div className="col-md-12 pt-2" style={{ textAlign: 'center' }}>
                            <input
                                className=" btn-lg btn-handle-primary text-light"
                                type="submit"
                                value="Thanh toán online"
                            />
                        </div>
                    ) : (
                        <div className="modal-booking__button">
                            <div className="modal-booking__button__left" onClick={handleCashPayment}>
                                Thanh toán tiền mặt
                            </div>
                            <div className="modal-booking__button__right">
                                <input
                                    className=" btn-lg btn-handle-primary text-light"
                                    type="submit"
                                    value="Thanh toán online"
                                />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </Modal>
    );
}

export default ModalBooking;
