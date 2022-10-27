import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import coachesAPI from '~/api/employeeAPI/coachesAPI';
import shippingAPI from '~/api/employeeAPI/shippingAPI';
import ticketAPI from '~/api/employeeAPI/ticketAPI';
import Helmet from '~/components/Helmet/Helmet';
import TableCustom from '~/components/TableCustom/TableCustom';
import config from '~/config';
import shippingList from '~/fakedata/shippingList';
import formatDate from '~/utils/formatDate';
import EmployeeTableShippingList from './EmployeeTableShippingList';
import EmployeeTableTicketList from './EmployeeTableTicketList';
function EmployeeCoachesManagement() {
    const [coachesList, setCoachesList] = useState();
    const [coachesId, setCoachesId] = useState();
    const [ticketListByCoachesId, setTicketListBuyCoachesId] = useState();
    const [shippingListByCoachesId, setShippingListByCoachesId] = useState();
    const [dateFilter, setDateFilter] = useState(formatDate.fFullDate(new Date()));
    const columns = [
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
                        <Link to={`/chi-tiet-chuyen-xe/${rowData.id}`}>
                            <button className="btn-handle btn-handle-primary">Xem</button>
                        </Link>
                    </div>
                ),
        },
    ];

    useEffect(() => {
        const fetchCoachesList = async () => {
            try {
                // const response = await coachesAPI.getCoachesByDate(dateFilter);
                const response = await coachesAPI.getCoachesByStartDate(dateFilter);
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
    }, [dateFilter]);

    const handleRowClick = async (e, rowData) => {
        window.scrollTo({
            top: 770,
            left: 0,
            behavior: 'smooth',
        });
        setCoachesId(rowData.id);
        console.log(rowData.id);
        try {
            // const responese1 = await ticketAPI.getTicketByCoachesId(rowData.id);
            const response1 = await ticketAPI.getTicketByCoachesId(rowData.id);
            if (response1.code === 200) {
                console.log('fetch ticket success');
                setTicketListBuyCoachesId(response1.data);
            } else {
                console.log('fetch ticket failed' + response1.message);
                throw new Error(response1.message);
            }
        } catch (err) {
            console.log('fetch ticket failed' + err.message);
        }

        try {
            const response2 = await shippingAPI.getShippingByCoachesId(rowData.id);
            if (response2.code === 200) {
                console.log('fetch shipping success');
                setShippingListByCoachesId(response2.data);
            } else {
                console.log('fetch shipping failed' + response2.message);
                throw new Error(response2.message);
            }
        } catch (err) {
            console.log('fetch shipping failed' + err.message);
        }
    };
    return (
        <Helmet title="Quản lí chuyến xe">
            <div className="coaches-management container">
                <div
                    className="coaches-management__breadcrumb"
                    style={{
                        background: 'white',
                        borderRadius: '5px',
                        padding: '15px',
                    }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.home}>
                        Trang chủ
                    </Link>
                    <span>{` / `}</span>
                    <span>Quản lý chuyến xe</span>
                </div>
                <h2 className="text-center" style={{ color: 'var(--main-color)' }}>
                    Danh sách chuyến xe
                </h2>
                <div className="coaches-management__filter-box" style={{ textAlign: '-webkit-center' }}>
                    <div className="col-md-4 mb-2 pb-2">
                        <div className="form-outline">
                            <input
                                type="date"
                                id="yearFilterByMonth"
                                name="yearFilterByMonth"
                                className="form-control form-control-lg"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="coaches-management__data-table" style={{ marginTop: '10px' }}>
                    <div className="card" style={{ position: 'static' }}>
                        <div className="card__body">
                            {coachesList ? (
                                <TableCustom
                                    isAddButton
                                    title={'Danh sách chuyến xe'}
                                    columns={columns}
                                    data={coachesList}
                                    link={config.routes.addCoaches}
                                    onRowClick={(event, rowData) => handleRowClick(event, rowData)}
                                />
                            ) : (
                                <p>loading...</p>
                            )}
                        </div>
                    </div>
                </div>
                {ticketListByCoachesId && (
                    <div className="ticket-management__data-table" style={{ marginTop: '10px' }}>
                        <h3 style={{ color: 'var(--second-color)' }}>Số vé: {ticketListByCoachesId.length}</h3>
                        <EmployeeTableTicketList
                            ticketListByCoachesId={ticketListByCoachesId}
                            setTicketListByCoachesId={setTicketListBuyCoachesId}
                            coachesId={coachesId}
                        />
                    </div>
                )}
                {shippingListByCoachesId && (
                    <div className="shipping-management__data-table" style={{ marginTop: '10px' }}>
                        <h3 style={{ color: 'var(--second-color)' }}>Số đơn hàng: {shippingListByCoachesId.length}</h3>
                        <EmployeeTableShippingList
                            shippingListByCoachesId={shippingListByCoachesId}
                            setShippingListByCoachesId={setShippingListByCoachesId}
                            coachesId={coachesId}
                        />
                    </div>
                )}
            </div>
        </Helmet>
    );
}

export default EmployeeCoachesManagement;
