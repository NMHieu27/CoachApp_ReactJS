import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ticketAPI from '~/api/ticketAPI';
import TableCustom from '~/components/TableCustom/TableCustom';

function HistoryTableTicketList({ ticketListByPhone, setTicketListByPhone }) {
    const handleCancelTicket = async (ticket) => {
        try {
            if (window.confirm(`Bạn chắc chắn hủy vé có id  ${ticket.id}`)) {
                // const response = await ticketAPI.cancelTicket(ticket.id);
                // if (response.code === 200) {
                toast.success('Gửi yêu cầu hủy vé thành công!', { theme: 'colored' });
                const index = ticketListByPhone.findIndex((value) => value.id === ticket.id);
                const arrCopy = [...ticketListByPhone];
                arrCopy[index] = { ...arrCopy[index], status: 2 };
                setTicketListByPhone(arrCopy);
                // } else {
                //     toast.error('Không thể hủy vé ! ' + response.message, { theme: 'colored' });
                //     throw new Error(response.message);
                // }
            }
        } catch (err) {
            toast.error('Thất bại khi yêu cầu hủy vé ' + err.message, { theme: 'colored' });
        }
    };
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Họ tên', field: 'fullname' },
        { title: 'SĐT', field: 'phone' },
        { title: 'Email', field: 'email' },
        { title: 'Số ghế', field: 'seat' },
        { title: 'Mã chuyến', field: 'coachesId' },
        {
            title: 'Ngày đặt',
            field: 'createDate',
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy',
            },
        },
        {
            title: 'Ngày khởi hành',
            field: 'startTime',
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy',
            },
        },
        {
            title: 'Trạng thái',
            field: 'status',
            render: (item) => (item.status === 2 ? <i>Đang đợi hủy</i> : <i>Hoàn tất</i>),
        },
        {
            title: 'Action',
            field: 'internal_action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <Link to={`/chi-tiet-chuyen-xe/${rowData.coachesId}`}>
                            <button className="btn-handle btn-handle-primary">Đến chuyến xe</button>
                        </Link>
                        {/* Khi có API sẽ lấy row.startTime để kiểm tra */}
                        {new Date(rowData.createDate).getTime() - new Date().getTime() >= 86400000 &&
                            rowData.status !== 2 &&
                            rowData.status !== 0 && (
                                <button
                                    className="btn-handle btn-handle-danger"
                                    onClick={() => handleCancelTicket(rowData)}
                                >
                                    Yêu cầu hủy
                                </button>
                            )}
                    </div>
                ),
        },
    ];
    return (
        <div className="card" style={{ position: 'static' }}>
            <div className="card__body">
                {ticketListByPhone ? (
                    <TableCustom title={`Danh sách vé`} columns={columns} data={ticketListByPhone} />
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </div>
    );
}

export default HistoryTableTicketList;
