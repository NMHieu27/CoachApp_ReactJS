import { useFormik } from 'formik';
import * as Yup from 'yup';
import './ModalShipping.scss';
import { toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import { useEffect, useState } from 'react';
import shippingAPI from '~/api/employeeAPI/shippingAPI';
function ModalShipping({ userId, coachesId, isShowingShipping, setIsShowingShipping, toggleShipping }) {
    const userRole = localStorage.getItem('role');
    const [isUser, setIsUser] = useState(false);
    useEffect(() => {
        (!userRole || userRole === 'user') && setIsUser(true);
    }, []);
    const formik = useFormik({
        initialValues: {
            userId: 0,
            coachesId: 0,
            name: '',
            senderName: '',
            senderPhone: '',
            senderEmail: '',
            receiverName: '',
            receiverPhone: '',
            receiverEmail: '',
            price: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng điền trường này !'),
            senderName: Yup.string().required('Vui lòng điền trường này !'),
            receiverName: Yup.string().required('Vui lòng điền trường này !'),
            senderPhone: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    'Phải là định dạng số và đủ 10 ký tự !',
                ),
            receiverPhone: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    'Phải là định dạng số và đủ 10 ký tự !',
                ),
            senderEmail: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email !'),
            receiverEmail: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email !'),
            price: Yup.string().required('Vui lòng điền giá'),
        }),
        onSubmit: async (values) => {
            values.coachesId = +coachesId;
            values.userId = +userId;
            try {
                const params = {
                    userId: values.userId,
                    coachesId: values.coachesId,
                    name: values.name,
                    senderName: values.senderName,
                    senderPhone: values.senderPhone,
                    senderEmail: values.senderEmail,
                    receiverName: values.receiverName,
                    receiverPhone: values.receiverPhone,
                    receiverEmail: values.receiverEmail,
                    price: +values.price,
                };

                const response = await shippingAPI.addShipping(params);
                if (response.code === 200) {
                    toast.success('Gửi hàng thành công !', { theme: 'colored' });
                } else {
                    toast.error('Gửi hàng thất bại !' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error('Thất bại khi thêm dữ liệu' + err.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });
    const handleCashPayment = async () => {
        formik.values.coachesId = +coachesId;
        formik.values.userId = +userId;
        try {
            const params = {
                userId: formik.values.userId,
                coachesId: formik.values.coachesId,
                name: formik.values.name,
                senderName: formik.values.senderName,
                senderPhone: formik.values.senderPhone,
                senderEmail: formik.values.senderEmail,
                receiverName: formik.values.receiverName,
                receiverPhone: formik.values.receiverPhone,
                receiverEmail: formik.values.receiverEmail,
                price: formik.values.price,
            };
            console.log('params: ', params);
            // const response = await shippingAPI.postAddShipping(params);
            // if (response.code === 200) {
            //     toast.success('Gửi hàng thành công !', { theme: 'colored' });
            // } else {
            //     toast.error('Gửi hàng thất bại !' + response.message, { theme: 'colored' });
            //     throw new Error(response.message);
            // }
        } catch (err) {
            toast.error('Thất bại khi thêm dữ liệu' + err.message, { theme: 'colored' });
        }
    };
    return (
        <Modal
            isShowing={isShowingShipping}
            setIsShowing={setIsShowingShipping}
            hide={toggleShipping}
            // isFooter={true}
            title="Gửi hàng"
        >
            <div
                className="add-coach__form-add-coach"
                style={{ background: '#fff', borderRadius: '5px', marginTop: '10px', padding: '15px 10%' }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="col-md-12 mb-2 pb-2">
                        <label className="form-label" htmlFor="name">
                            Tên đơn hàng
                        </label>
                        <div className="form-outline">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control form-control-lg"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.name && <p className="signin-signup__errorMsg">{formik.errors.name}</p>}
                    </div>

                    <div className="col-md-12 mb-2 pb-2">
                        <label className="form-label" htmlFor="senderName">
                            Họ tên người gửi
                        </label>
                        <div className="form-outline">
                            <input
                                type="text"
                                id="senderName"
                                name="senderName"
                                className="form-control form-control-lg"
                                value={formik.values.senderName}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.senderName && (
                            <p className="signin-signup__errorMsg">{formik.errors.senderName}</p>
                        )}
                    </div>

                    <div className="col-md-12 mb-2 pb-2">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="senderPhone">
                                Số điện thoại người gửi
                            </label>
                            <input
                                type="tel"
                                name="senderPhone"
                                id="senderPhone"
                                className="form-control form-control-lg"
                                value={formik.values.senderPhone}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.senderPhone && (
                            <p className="signin-signup__errorMsg">{formik.errors.senderPhone}</p>
                        )}
                    </div>

                    <div className="col-md-12 mb-2 pb-2">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="senderEmail">
                                Email người gửi
                            </label>
                            <input
                                type="senderEmail"
                                name="senderEmail"
                                id="senderEmail"
                                className="form-control form-control-lg"
                                value={formik.values.senderEmail}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.senderEmail && (
                            <p className="signin-signup__errorMsg">{formik.errors.senderEmail}</p>
                        )}
                    </div>

                    <div className="col-md-12 mb-2 pb-2">
                        <label className="form-label" htmlFor="receiverName">
                            Họ tên người nhận
                        </label>
                        <div className="form-outline">
                            <input
                                type="text"
                                id="receiverName"
                                name="receiverName"
                                className="form-control form-control-lg"
                                value={formik.values.receiverName}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.receiverName && (
                            <p className="signin-signup__errorMsg">{formik.errors.receiverName}</p>
                        )}
                    </div>

                    <div className="col-md-12 mb-2 pb-2">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="receiverPhone">
                                Số điện thoại người nhận
                            </label>
                            <input
                                type="tel"
                                name="receiverPhone"
                                id="receiverPhone"
                                className="form-control form-control-lg"
                                value={formik.values.receiverPhone}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.receiverPhone && (
                            <p className="signin-signup__errorMsg">{formik.errors.receiverPhone}</p>
                        )}
                    </div>

                    <div className="col-md-12 mb-2 pb-2">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="receiverEmail">
                                Email người nhận
                            </label>
                            <input
                                type="receiverEmail"
                                name="receiverEmail"
                                id="receiverEmail"
                                className="form-control form-control-lg"
                                value={formik.values.receiverEmail}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.receiverEmail && (
                            <p className="signin-signup__errorMsg">{formik.errors.receiverEmail}</p>
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

export default ModalShipping;
