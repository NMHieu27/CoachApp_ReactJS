import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import coachAPI from '~/api/coachAPI';
import Helmet from '~/components/Helmet/Helmet';
import TableCustom from '~/components/TableCustom/TableCustom';
import config from '~/config';
import './CoachManagement.scss';
function CoachManagement() {
    const [coachList, setCoachList] = useState();
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Biển số', field: 'licensePlates' },
        { title: 'Loại xe', field: 'categoryId' },
        { title: 'Mô tả', field: 'description' },
        { title: 'Nhà xe', field: 'coachGarageId' },
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
        {
            title: 'Action',
            field: 'action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <Link to={`/admin/danh-sach-xe/chinh-sua/${rowData.id}`}>
                            <button className="btn-handle btn-handle-success">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </Link>
                        <button className="btn-handle btn-handle-danger" onClick={() => handleDeleteCoach(rowData)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ),
        },
    ];

    useEffect(() => {
        const fetchCoachList = async () => {
            try {
                const response = await coachAPI.getAll();
                if (response.code === 200) {
                    toast.success('Lấy đữ liệu thành công !', {
                        theme: 'colored',
                    });
                    setCoachList(response.data);
                } else {
                    toast.error('Lấy dữ liệu thất bại !', { theme: 'colored' });
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu' + err.message, {
                    theme: 'colored',
                });
            }
        };
        fetchCoachList();
    }, []);

    const handleDeleteCoach = async (coach) => {
        try {
            if (window.confirm(`Bạn chắc chắn xóa xe có id  ${coach.id}`)) {
                const response = await coachAPI.deleteCoach(coach.id);
                if (response.code === 200) {
                    toast.success('Xóa thành công!', { theme: 'colored' });
                    const index = coachList.findIndex((value) => value.id === coach.id);
                    const arrCopy = [...coachList];
                    arrCopy.splice(index, 1);
                    setCoachList(arrCopy);
                } else {
                    toast.error('Không thể xóa ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            }
        } catch (err) {
            toast.error('Thất bại khi xóa ' + err.message, { theme: 'colored' });
        }
    };
    return (
        <Helmet title="Quản lí xe">
            <div className="coach-management">
                <div
                    className="coach-management__breadcrumb"
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
                    <span>Quản lý xe</span>
                </div>
                <div className="coach-management__data-table" style={{ marginTop: '10px' }}>
                    <div className="card" style={{ position: 'static' }}>
                        <div className="card__body">
                            {coachList ? (
                                <TableCustom
                                    isAddButton
                                    title={'Danh sách xe'}
                                    columns={columns}
                                    data={coachList}
                                    link={config.routes.addCoach}
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

export default CoachManagement;
