import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ticketAPI from '~/api/adminAPI/ticketAPI';
import TableCustom from '~/components/TableCustom/TableCustom';

function TableTicketList({ ticketListByCoachesId, setTicketListByCoachesId, coachesId }) {
    const handleDeleteTicket = async (ticket) => {
        try {
            if (window.confirm(`Bạn chắc chắn xóa vé có id  ${ticket.id}`)) {
                const response = await ticketAPI.deleteTicket(ticket.id);
                if (response.code === 200) {
                    toast.success('Xóa thành công!', { theme: 'colored' });
                    const index = ticketListByCoachesId.findIndex((value) => value.id === ticket.id);
                    const arrCopy = [...ticketListByCoachesId];
                    arrCopy.splice(index, 1);
                    setTicketListByCoachesId(arrCopy);
                } else {
                    toast.error('Không thể xóa ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            }
        } catch (err) {
            toast.error('Thất bại khi xóa ' + err.message, { theme: 'colored' });
        }
    };
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Họ tên', field: 'name' },
        { title: 'SĐT', field: 'phone' },
        { title: 'Email', field: 'email' },
        { title: 'Số ghế', field: 'amount' },
        { title: 'Mã chuyến', field: 'coachesId' },
        {
            title: 'Action',
            field: 'internal_action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <Link to={`/admin/ve-xe/chinh-sua/${rowData.id}/${rowData.coachesId}`}>
                            <button className="btn-handle btn-handle-success">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </Link>
                        <button className="btn-handle btn-handle-danger" onClick={() => handleDeleteTicket(rowData)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ),
        },
    ];
    return (
        <div className="card" style={{ position: 'static' }}>
            <div className="card__body">
                {ticketListByCoachesId ? (
                    <TableCustom
                        title={`Danh sách vé thuộc chuyến ${coachesId}`}
                        columns={columns}
                        data={ticketListByCoachesId}
                    />
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </div>
    );
}

export default TableTicketList;
