import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import Dropdown from '~/components/Dropdown/Dropdown';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import coachAPI from '~/api/coachAPI';
import categoryAPI from '~/api/categoryAPI';
import coachGarageAPI from '~/api/coachGarageAPI';
import config from '~/config';

import './AddCoach.scss';

function AddCoach() {
    const nav = useNavigate();
    const list_img_coach = useRef();
    const [coachGarageList, setCoachGarageList] = useState();
    const [categoryList, setCategoryList] = useState();
    const [selectedCoachGarage, setSelectedCoachGarage] = useState();
    const [selectedCoachGarageId, setSelectedCoachGarageId] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const status = [
        { id: 0, name: 'banned', title: 'Vô hiệu' },
        { id: 1, name: 'active', title: 'Hoạt động' },
    ];
    const [statusChecked, setStatusChecked] = useState(1);
    //Get coach garage list
    useEffect(() => {
        const fetchAllCoachGarage = async () => {
            try {
                const response = await coachGarageAPI.getAll();
                if (response.code === 200) {
                    console.log('fetch coach garage success');
                    setCoachGarageList(response.data);
                } else {
                    console.log('fetch coach garage error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch coach garage failed' + err.message);
            }
        };
        fetchAllCoachGarage();
    }, []);

    //Get category list
    useEffect(() => {
        const fetchAllCategory = async () => {
            try {
                const response = await categoryAPI.getAll();
                if (response.code === 200) {
                    console.log('fetch category list success');
                    setCategoryList(response.data);
                } else {
                    console.log('fetch category list error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch coach garage failed' + err.message);
            }
        };
        fetchAllCategory();
    }, []);

    const formik = useFormik({
        initialValues: {
            licensePlates: '',
            description: '',
            coachGarageId: '',
            categoryId: '',
            status: 1,
            files: [],
        },
        validationSchema: Yup.object({
            licensePlates: Yup.string().required('Vui lòng điền trường này !'),
            description: Yup.string().required('Vui lòng điền trường này !'),
            files: Yup.mixed().required('Vui lòng upload file !'),
        }),
        onSubmit: async (values) => {
            values.coachGarageId = selectedCoachGarageId;
            values.categoryId = selectedCategoryId;
            values.status = statusChecked;

            if (list_img_coach.current.files.length > 1) {
                values.files = list_img_coach.current.files;
                console.log(list_img_coach.current.files);
                try {
                    // status của admin đối với nhà xe được phép chỉnh sửa, phải có up files
                    const params = {
                        licensePlates: values.licensePlates,
                        description: values.description,
                        coachGarageId: values.coachGarageId,
                        categoryId: values.categoryId,
                        status: +values.status,
                        files: values.files,
                    };
                    //Đổi APi đúng chức năng
                    const response = await coachAPI.postAddCoach(params);
                    if (response.code === 200) {
                        toast.success('Thêm xe thành công !', { theme: 'colored' });
                        nav(config.routes.coachManagement);
                    } else {
                        toast.error('Thêm xe thất bại! ' + response.message, {
                            theme: 'colored',
                        });
                        throw new Error(response.message);
                    }
                } catch (error) {
                    console.log('Thất bại khi gửi dữ liệu: ', error.message);
                    toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
                }
            } else {
                console.log('Vui long chon ảnh');
                toast.error('Vui lòng upload 2 ảnh trở lên');
            }

            console.log(values);
        },
    });
    return (
        <Helmet title="Thêm nhà xe">
            <div className="add-coach">
                <div
                    className="add-coach__breadcrumb"
                    style={{ background: '#fff', padding: '15px', borderRadius: '5px' }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <Link style={{ color: 'blue' }} to={config.routes.coachManagement}>
                        Quản lý xe
                    </Link>
                    <span>{` / `}</span>
                    <span>Thêm xe</span>
                </div>
                <div
                    className="add-coach__form-add-coach"
                    style={{ background: '#fff', borderRadius: '5px', marginTop: '10px', padding: '15px 20%' }}
                >
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Thêm xe
                    </h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="col-md-12 mb-2 pb-2">
                            <label className="form-label" htmlFor="licensePlates">
                                Biển số xe
                            </label>
                            <div className="form-outline">
                                <input
                                    type="text"
                                    id="licensePlates"
                                    name="licensePlates"
                                    className="form-control form-control-lg"
                                    value={formik.values.licensePlates}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.licensePlates && (
                                <p className="signin-signup__errorMsg">{formik.errors.licensePlates}</p>
                            )}
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
                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label">Loại xe</label>
                                <div style={{ height: '56px' }}>
                                    {categoryList && (
                                        <Dropdown
                                            maxHeight={'150px'}
                                            options={categoryList}
                                            selected={selectedCategory}
                                            setSelected={setSelectedCategory}
                                            selectedId={selectedCategoryId}
                                            setSelectedId={setSelectedCategoryId}
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

                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label">Nhà xe</label>
                                <div style={{ height: '56px' }}>
                                    {coachGarageList && (
                                        <Dropdown
                                            maxHeight={'150px'}
                                            options={coachGarageList}
                                            selected={selectedCoachGarage}
                                            setSelected={setSelectedCoachGarage}
                                            selectedId={selectedCoachGarageId}
                                            setSelectedId={setSelectedCoachGarageId}
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

                        <div class="col-md-12 mb-2">
                            <label class="form-label" htmlFor="file">
                                Chọn ảnh xe (có thể chọn nhiều)
                            </label>
                            <input
                                ref={list_img_coach}
                                class="form-control form-control-lg"
                                id="file"
                                name="files"
                                type="file"
                                multiple="multiple"
                                onChange={formik.handleChange}
                            />
                            {formik.errors.files && <p className="signin-signup__errorMsg">{formik.errors.files}</p>}
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

export default AddCoach;