import TableCustom from '~/components/TableCustom/TableCustom';

function GarageTableTicketList({ ticketListByCoachesId, coachesId }) {
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Họ tên', field: 'fullname' },
        { title: 'SĐT', field: 'phone' },
        { title: 'Email', field: 'email' },
        { title: 'Số ghế', field: 'seat' },
        { title: 'Mã chuyến', field: 'coachesId' },
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

export default GarageTableTicketList;
