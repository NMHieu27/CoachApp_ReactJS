import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Helmet from '~/components/Helmet/Helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import config from '~/config';
import shippingAPI from '~/api/shippingAPI';
function EditShipping() {
    const nav = useNavigate();
    const { shippingId } = useParams();
    const [statusChecked, setStatusChecked] = useState();

    const status = [
        { id: 0, name: 'banned', title: 'Vô hiệu' },
        { id: 1, name: 'active', title: 'Hoạt động' },
    ];

    const formik = useFormik({
        initialValues: {
            id: 0,
            coachesId: 0,
            name: '',
            senderName: '',
            senderPhone: '',
            senderEmail: '',
            receiverName: '',
            receiverPhone: '',
            receiverEmail: '',
            price: 0,
            status: 1,
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
            values.id = +shippingId;
            values.status = +statusChecked;
            try {
                const params = {
                    id: +values.id,
                    coachesId: +values.coachesId,
                    name: values.name,
                    senderName: values.senderName,
                    senderPhone: values.senderPhone,
                    senderEmail: values.senderEmail,
                    receiverName: values.receiverName,
                    receiverPhone: values.receiverPhone,
                    receiverEmail: values.receiverEmail,
                    price: +values.price,
                    status: +values.status,
                };

                // const response = await shippingAPI.updateShipping(params);
                // if (response.code === 200) {
                //     toast.success('Sửa đơn hàng thành công !', { theme: 'colored' });
                // nav(-1);
                // } else {
                //     toast.error('Sửa đơn hàng thất bại !' + response.message, { theme: 'colored' });
                //     throw new Error(response.message);
                // }
            } catch (err) {
                toast.error('Thất bại khi sửa dữ liệu' + err.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });

    useEffect(() => {
        const fetchShippingById = async (shippingId) => {
            try {
                const response = await shippingAPI.getShippingById(shippingId);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu thành công !', { theme: 'colored' });
                    formik.values.id = response.data.id;
                    formik.values.coachesId = response.data.coachesId;
                    formik.values.name = response.data.name;
                    formik.values.senderName = response.data.senderName;
                    formik.values.senderPhone = response.data.senderPhone;
                    formik.values.senderEmail = response.data.senderEmail;
                    formik.values.receiverName = response.data.receiverName;
                    formik.values.receiverPhone = response.data.receiverPhone;
                    formik.values.receiverEmail = response.data.receiverEmail;

                    formik.values.price = response.data.price;

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
        fetchShippingById(shippingId);
    }, []);
    return (
        <Helmet title="Sửa đơn hàng">
            <div className="edit-shipping">
                <div
                    className="edit-shipping__breadcrumb"
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
                    <span>Sửa đơn hàng</span>
                </div>
                <div
                    className="edit-shipping__form-edit-shipping"
                    style={{ background: '#fff', borderRadius: '5px', marginTop: '10px', padding: '15px 20%' }}
                >
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Sửa đơn hàng
                    </h3>
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

export default EditShipping;
