import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import Dropdown from '~/components/Dropdown/Dropdown';
import { toast } from 'react-toastify';
import config from '~/config';

import './EditCoach.scss';
import commonCategoryAPI from '~/api/commonAPI/commonCategoryAPI';
import commonCoachGarageAPI from '~/api/commonAPI/commonCoachGarageAPI';
import coachAPI from '~/api/adminAPI/coachAPI';

function EditCoach() {
    const { id } = useParams();
    const currentOwnerId = localStorage.getItem('userId');
    const nav = useNavigate();
    const input_el_licensePlates = useRef();
    const input_el_description = useRef();
    const list_img_coach = useRef();
    const [coachGarageList, setCoachGarageList] = useState();
    const [categoryList, setCategoryList] = useState();
    const [selectedCoachGarage, setSelectedCoachGarage] = useState();
    const [selectedCoachGarageId, setSelectedCoachGarageId] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const status = [
        { id: 0, name: 'banned', title: 'Vô hiệu' },
        { id: 1, name: 'active', title: 'Hoạt động' },
    ];
    const [statusChecked, setStatusChecked] = useState(1);
    //Get coach garage list
    useEffect(() => {
        const fetchAllCoachGarage = async () => {
            try {
                const response = await commonCoachGarageAPI.getAll();
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
                const response = await commonCategoryAPI.getAll();
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

    useEffect(() => {
        const fetchCoachById = async (id) => {
            try {
                const response = await coachAPI.getCoachById(id);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu thành công !', { theme: 'colored' });
                    input_el_licensePlates.current.value = response.data.licensePlates;
                    input_el_description.current.value = response.data.description;
                    setSelectedCoachGarageId(response.data.coachGarageId);
                    setSelectedCategoryId(response.data.categoryId);
                    response.data.status ? setStatusChecked(1) : setStatusChecked(0);
                } else {
                    toast.error('Lấy dữ liệu thất bại ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu ! ' + err.message, { theme: 'colored' });
            }
        };
        fetchCoachById(id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const info = new FormData(e.currentTarget);
        info.append('id', +id);
        info.append('coachGarageId', +selectedCoachGarageId);
        info.append('categoryId', +selectedCategoryId);
        info.append('status', +statusChecked);
        try {
            const response = await coachAPI.updateCoach(info);
            if (response.code === 200) {
                toast.success('Sửa xe thành công! ', { theme: 'colored' });
                nav(-1);
            } else {
                toast.error('Sửa xe thất bại! ' + response.message, { theme: 'colored' });
                throw new Error(response.message);
            }
        } catch (err) {
            toast.error('Thất bại khi truyền dữ liệu! ' + err.message, { theme: 'colored' });
        }
    };
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
                    <span>Sửa thông tin xe</span>
                </div>
                <div
                    className="add-coach__form-add-coach "
                    style={{ background: '#fff', borderRadius: '5px', marginTop: '10px', padding: '15px 20%' }}
                >
                    <h3
                        style={{ fontWeight: 'bold', color: 'var(--second-color)' }}
                        class="mb-4 pb-2 pb-md-0 mb-md-4 text-center"
                    >
                        Sửa thông tin xe
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="col-md-12 mb-2 pb-2">
                            <label className="form-label" htmlFor="licensePlates">
                                Biển số xe
                            </label>
                            <div className="form-outline">
                                <input
                                    ref={input_el_licensePlates}
                                    type="text"
                                    id="licensePlates"
                                    name="licensePlates"
                                    className="form-control form-control-lg"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="description">
                                    Mô tả
                                </label>
                                <textarea
                                    ref={input_el_description}
                                    name="description"
                                    id="description"
                                    className="form-control form-control-lg"
                                    rows={5}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12 mb-2 pb-2">
                            <div className="form-outline">
                                <label className="form-label">Loại xe</label>
                                <div style={{ height: '56px' }}>
                                    {selectedCategoryId && (
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
                                    {selectedCoachGarageId && (
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
                                name="pictures"
                                type="file"
                                multiple="multiple"
                            />
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
                                            name="status1"
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

export default EditCoach;
