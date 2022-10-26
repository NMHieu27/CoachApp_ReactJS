import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '~/config';
import Helmet from '~/components/Helmet/Helmet';
import './EditCategory.scss';
import categoryAPI from '~/api/adminAPI/categoryAPI';
function EditCategory() {
    const { id } = useParams();
    const status = [
        { id: 0, name: 'banned', title: 'Vô hiệu' },
        { id: 1, name: 'active', title: 'Hoạt động' },
    ];
    const [statusChecked, setStatusChecked] = useState();
    const nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            status: 1,
            seat: 1,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng điền trường này !').min(8, 'Tối thiểu 8 kí tự !'),
            seat: Yup.string().required('Vui lòng điền trường này !'),
        }),
        onSubmit: async (values) => {
            values.status = statusChecked;

            try {
                const params = {
                    id: +id,
                    name: values.name,
                    seat: +values.seat,
                    status: +values.status,
                };
                const response = await categoryAPI.updateCategory(params);
                if (response.code === 200) {
                    toast.success('Sửa dữ liệu thành công !', { theme: 'colored' });
                    nav(config.routes.categoryManagement);
                } else {
                    toast.error('Sửa dữ liệu thất bại !' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error('Thất bại khi Sửa dữ liệu' + err.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });

    useEffect(() => {
        const fetchCategoryById = async (id) => {
            try {
                const response = await categoryAPI.getCategoryById(id);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu tài khoản thành công !', { theme: 'colored' });
                    formik.values.name = response.data.name;
                    formik.values.seat = response.data.seat;
                    response.data.status ? setStatusChecked(1) : setStatusChecked(0);
                    formik.values.status = response.data.status;
                } else {
                    toast.error('Thất bại khi lấy dữ liệu ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu !' + err.message, { theme: 'colored' });
            }
        };
        fetchCategoryById(id);
    }, []);
    return (
        <Helmet title="Sửa loại xe">
            <div className="edit-category">
                <div
                    className="edit-category__breadcrumb"
                    style={{ background: '#fff', padding: '15px', borderRadius: '5px' }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <Link style={{ color: 'blue' }} to={config.routes.categoryManagement}>
                        Quản lý loại xe
                    </Link>
                    <span>{` / `}</span>
                    <span>Sửa loại xe</span>
                </div>
                <div className="edit-category__form-edit-category" style={{ background: '#fff', borderRadius: '5px' }}>
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Sửa loại xe
                    </h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div class="col-md-12 mb-2 pb-2">
                            <div class="form-outline">
                                <label class="form-label" for="nameGarage">
                                    Tên loại xe
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="nameGarage"
                                    class="form-control form-control-lg"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.name && <p className="signin-signup__errorMsg">{formik.errors.name}</p>}
                        </div>
                        <div class="col-md-12 mb-2 pb-2">
                            <div class="form-outline">
                                <label class="form-label" for="seat">
                                    Số ghế
                                </label>
                                <input
                                    min={1}
                                    max={100}
                                    type="number"
                                    name="seat"
                                    id="seat"
                                    class="form-control form-control-lg"
                                    value={formik.values.seat}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.seat && <p className="signin-signup__errorMsg">{formik.errors.seat}</p>}
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
                        <div class="pt-2" style={{ textAlign: 'center' }}>
                            <input class=" btn-lg btn btn-handle-primary text-light" type="submit" value="Sửa" />
                        </div>
                    </form>
                </div>
            </div>
        </Helmet>
    );
}

export default EditCategory;
