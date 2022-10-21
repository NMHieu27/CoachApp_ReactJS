import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import coachesAPI from '~/api/coachesAPI';
import Helmet from '~/components/Helmet/Helmet';
import TableCustom from '~/components/TableCustom/TableCustom';
import config from '~/config';
import './GarageCoachesManagement.scss';
function GarageCoachesManagement() {
    const currentOwnerId = localStorage.getItem('userId');
    const [coachesList, setCoachesList] = useState();
    const [ticketList, setTicketList] = useState();
    const columnsCoaches = [
        { title: 'Id', field: 'id' },
        {
            title: 'Khởi chạy',
            field: 'startTime',
            type: 'datetime',
            dateSetting: {
                format: 'dd/MM/yyyy',
            },
        },
        {
            title: 'Kết thúc',
            field: 'endTime',
            type: 'datetime',
            dateSetting: {
                format: 'dd/MM/yyyy',
            },
        },
        { title: 'Mô tả', field: 'description' },
        { title: 'Giá', field: 'price' },
        { title: 'Ghế trống', field: 'emptySeat' },
        { title: 'Mã xe', field: 'coachId' },
        { title: 'Điểm đi', field: 'startPoint' },
        { title: 'Điểm đến', field: 'endPoint' },
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
        { title: 'Vận chuyển hàng', field: 'shipping', render: (item) => (item.shipping ? 'Có' : 'Không') },
        {
            title: 'Action',
            field: 'action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <Link to={`/garage/danh-sach-chuyen-xe/chinh-sua/${rowData.id}`}>
                            <button className="btn-handle btn-handle-success">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </Link>
                        <button className="btn-handle btn-handle-danger" onClick={() => handleDeleteCoaches(rowData)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ),
        },
    ];

    useEffect(() => {
        // Gọi API khác, api get list by userId, không dùng getAll
        const fetchCoachesList = async () => {
            try {
                const response = await coachesAPI.getAll(0, 20);
                if (response.code === 200) {
                    toast.success('Lấy đữ liệu thành công !', {
                        theme: 'colored',
                    });
                    setCoachesList(response.data);
                } else {
                    toast.error('Lấy dữ liệu thất bại !', { theme: 'colored' });
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu' + err.message, {
                    theme: 'colored',
                });
            }
        };
        fetchCoachesList();
    }, []);

    const handleDeleteCoaches = async (coaches) => {
        try {
            if (window.confirm(`Bạn chắc chắn xóa xe có id  ${coaches.id}`)) {
                const response = await coachesAPI.deleteCoaches(coaches.id);
                if (response.code === 200) {
                    toast.success('Xóa thành công!', { theme: 'colored' });
                    const index = coachesList.findIndex((value) => value.id === coaches.id);
                    const arrCopy = [...coachesList];
                    arrCopy.splice(index, 1);
                    setCoachesList(arrCopy);
                } else {
                    toast.error('Không thể xóa ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            }
        } catch (err) {
            toast.error('Thất bại khi xóa ' + err.message, { theme: 'colored' });
        }
    };
    const handleRowClick = (e, rowData) => {
        console.log(rowData.id);
    };
    return (
        <Helmet title="Quản lí chuyến xe">
            <div className="coaches-management">
                <div
                    className="coaches-management__breadcrumb"
                    style={{
                        background: 'white',
                        borderRadius: '5px',
                        padding: '15px',
                    }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.garage}>
                        Garage home
                    </Link>
                    <span>{` / `}</span>
                    <span>Quản lý chuyến xe</span>
                </div>
                <div className="coaches-management__data-table" style={{ marginTop: '10px' }}>
                    <div className="card" style={{ position: 'static' }}>
                        <div className="card__body">
                            {coachesList ? (
                                <TableCustom
                                    isAddButton
                                    title={'Danh sách chuyến xe'}
                                    columns={columnsCoaches}
                                    data={coachesList}
                                    link={config.routes.garageAddCoaches}
                                    onRowClick={(event, rowData) => handleRowClick(event, rowData)}
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

export default GarageCoachesManagement;
