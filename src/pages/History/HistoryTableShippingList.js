import { Link } from 'react-router-dom';
import TableCustom from '~/components/TableCustom/TableCustom';

function HistoryTableShippingList({ shippingListByPhone, setShippingListByPhone }) {
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Tên đơn hàng', field: 'namename' },
        { title: 'Họ tên người gửi', field: 'senderName' },
        { title: 'SĐT người gửi', field: 'senderPhone' },
        { title: 'Email người gửi', field: 'senderEmail' },
        { title: 'Họ tên người nhận', field: 'receiverName' },
        { title: 'SĐT người gửi', field: 'receiverPhone' },
        { title: 'Email người gửi', field: 'receiverEmail' },
        { title: 'Ngày gửi', field: 'sendTime' },
        { title: 'Giá', field: 'price' },
        { title: 'Mã chuyến', field: 'coachesId' },
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
                    </div>
                ),
        },
    ];
    return (
        <div className="card" style={{ position: 'static' }}>
            <div className="card__body">
                {shippingListByPhone ? (
                    <TableCustom title={`Danh đơn hàng`} columns={columns} data={shippingListByPhone} />
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </div>
    );
}

export default HistoryTableShippingList;
