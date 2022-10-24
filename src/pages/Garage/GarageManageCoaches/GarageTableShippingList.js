import TableCustom from '~/components/TableCustom/TableCustom';

function GarageTableShippingList({ shippingListByCoachesId, coachesId }) {
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Tên đơn hàng', field: 'namename' },
        { title: 'Họ tên người gửi', field: 'senderName' },
        { title: 'SĐT người gửi', field: 'senderPhone' },
        { title: 'Họ tên người nhận', field: 'receiverName' },
        { title: 'SĐT người gửi', field: 'receiverPhone' },
        { title: 'Giá', field: 'price' },
        { title: 'Mã chuyến', field: 'coachesId' },
    ];
    return (
        <div className="card" style={{ position: 'static' }}>
            <div className="card__body">
                {shippingListByCoachesId ? (
                    <TableCustom
                        title={`Danh đơn hàng thuộc chuyến ${coachesId}`}
                        columns={columns}
                        data={shippingListByCoachesId}
                    />
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </div>
    );
}

export default GarageTableShippingList;
