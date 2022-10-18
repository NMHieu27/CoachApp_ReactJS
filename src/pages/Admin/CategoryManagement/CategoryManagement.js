import Helmet from '~/components/Helmet/Helmet';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryAPI from '~/api/categoryAPI';
import { toast } from 'react-toastify';
import config from '~/config';
import './CategoryManagement.scss';
import TableCustom from '~/components/TableCustom/TableCustom';
function CategoryManagement() {
    const [categoryList, setCategoryList] = useState();
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Tên loại', field: 'name' },
        {
            title: 'Trạng thái',
            field: 'status',
            render: (item) =>
                item.status === 1 ? (
                    <i class="fa-solid fa-circle-check" style={{ color: 'green' }}></i>
                ) : (
                    <i class="fa-sharp fa-solid fa-circle-xmark" style={{ color: 'red' }}></i>
                ),
        },
        { title: 'Số ghế', field: 'seat' },
        {
            title: 'Action',
            field: 'internal_action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <Link to={`/admin/phan-loai-xe/chinh-sua/${rowData.id}`}>
                            <button className="btn-handle btn-handle-success">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </Link>
                        <button className="btn-handle btn-handle-danger" onClick={() => handleDeleteCate(rowData)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ),
        },
    ];

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const response = await categoryAPI.getAll();
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu thành công ! ', { theme: 'colored' });
                    setCategoryList(response.data);
                } else {
                    toast.error('Thất bại khi lấy dữ liệu !' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error('Thật bại khi lấy dữ liệu !' + error.message, { theme: 'colored' });
            }
        };
        fetchCategoryList();
    }, []);

    const handleDeleteCate = async (category) => {
        try {
            if (window.confirm(`Bạn chắc chắn xóa ${category.name}`)) {
                const response = await categoryAPI.deleteCategoryById(category.id);
                if (response.code === 200) {
                    toast.success('Xóa thành công!', { theme: 'colored' });
                    const index = categoryList.findIndex((value) => value.id === category.id);
                    const arrCopy = [...categoryList];
                    arrCopy.splice(index, 1);
                    setCategoryList(arrCopy);
                } else {
                    toast.error('Không thể xóa !' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            }
        } catch (err) {
            toast.error('Thất bại khi xóa' + err.message, { theme: 'colored' });
        }
    };
    return (
        <Helmet title="Quản lí loại xe">
            <div className="category-management">
                <div className="category-management__breadcrumb">
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <span>Quản lý loại xe</span>
                </div>
            </div>

            <div className="category-management__data-table" style={{ marginTop: '10px' }}>
                <div className="card" style={{ position: 'static' }}>
                    <div className="card__body">
                        {categoryList ? (
                            <TableCustom
                                isAddButton
                                title={'Loại xe'}
                                columns={columns}
                                data={categoryList}
                                link={config.routes.addCategory}
                            />
                        ) : (
                            <p>loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default CategoryManagement;
