import { useState, useEffect } from 'react';
import Helmet from '~/components/Helmet/Helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '~/config';
import TableCustom from '~/components/TableCustom/TableCustom';
import './CoachGarageManagement.scss';
import coachGarageAPI from '~/api/adminAPI/coachGarageAPI';
function CoachGarageManagement() {
    const [coachGarageList, setCoachGarageList] = useState();
    const [isDeleted, setIsDeleted] = useState(false);
    useEffect(() => {
        const fetchCoachGarageList = async () => {
            try {
                const response = await coachGarageAPI.getAll();
                if (response.code === 200) {
                    // toast.success('Lấy đữ liệu thành công !', {
                    //     theme: 'colored',
                    // });
                    setCoachGarageList(response.data);
                } else {
                    toast.error('Lấy dữ liệu thất bại !', { theme: 'colored' });
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu' + err.message, {
                    theme: 'colored',
                });
            }
        };
        fetchCoachGarageList();
    }, [isDeleted]);
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Tên nhà xe', field: 'name' },
        { title: 'Tên chủ nhà xe', field: 'owner' },
        { title: 'Phone', field: 'phone' },
        { title: 'Email', field: 'email' },
        { title: 'Mã quận/ huyện', field: 'districtId' },
        { title: 'Địa chỉ', field: 'address' },
        {
            title: 'Trạng thái',
            field: 'status',
            render: (item) =>
                item.status === 1 ? (
                    <i class="fa-solid fa-circle-check" style={{ color: 'green' }}></i>
                ) : item.status === 0 ? (
                    <i class="fa-sharp fa-solid fa-circle-xmark" style={{ color: 'red' }}></i>
                ) : (
                    item.status
                ),
        },
        {
            title: 'Action',
            field: 'action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <Link to={`/admin/danh-sach-nha-xe/chinh-sua/${rowData.id}`}>
                            <button className="btn-handle btn-handle-success">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </Link>
                        <button
                            className="btn-handle btn-handle-danger"
                            onClick={() => handleDeleteCoachGarage(rowData)}
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ),
        },
    ];

    const handleDeleteCoachGarage = async (coachGarage) => {
        try {
            if (window.confirm(`Bạn chắc chắn xóa nhà xe ${coachGarage.name}`)) {
                const response = await coachGarageAPI.deleteCoachGarage(coachGarage.id);
                if (response.code === 200) {
                    toast.success('Xóa thành công!', { theme: 'colored' });
                    // const index = coachGarageList.findIndex((value) => value.id === coachGarage.id);
                    // const arrCopy = [...coachGarageList];
                    // arrCopy.splice(index, 1);
                    // setCoachGarageList(arrCopy);
                    setIsDeleted(!isDeleted);
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
        <Helmet title="Quản lí nhà xe">
            <div className="coach-garage-management">
                <div
                    className="coach-garage-management__breadcrumb"
                    style={{
                        background: 'white',
                        borderRadius: '5px',
                        padding: '15px',
                    }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <span>Quản lý nhà xe</span>
                </div>
                <div className="coach-garage-management__data-table" style={{ marginTop: '10px' }}>
                    <div className="card" style={{ position: 'static' }}>
                        <div className="card__body">
                            {coachGarageList ? (
                                <TableCustom
                                    isAddButton
                                    title={'Danh sách nhà xe'}
                                    columns={columns}
                                    data={coachGarageList}
                                    link={config.routes.addCoachGarage}
                                />
                            ) : (
                                <p>loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default CoachGarageManagement;
