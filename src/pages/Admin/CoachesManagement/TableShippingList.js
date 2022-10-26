import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import shippingAPI from '~/api/shippingAPI';
import TableCustom from '~/components/TableCustom/TableCustom';

function TableShippingList({ shippingListByCoachesId, setShippingListByCoachesId, coachesId }) {
    const handleDeleteShipping = async (shipping) => {
        try {
            if (window.confirm(`Bạn chắc chắn xóa đơn hàng có id  ${shipping.id}`)) {
                const response = await shippingAPI.deleteShipping(shipping.id);
                if (response.code === 200) {
                    toast.success('Xóa thành công!', { theme: 'colored' });
                    const index = shippingListByCoachesId.findIndex((value) => value.id === shipping.id);
                    const arrCopy = [...shippingListByCoachesId];
                    arrCopy.splice(index, 1);
                    setShippingListByCoachesId(arrCopy);
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
        { title: 'Tên đơn hàng', field: 'namename' },
        { title: 'Họ tên người gửi', field: 'senderName' },
        { title: 'SĐT người gửi', field: 'senderPhone' },
        { title: 'Họ tên người nhận', field: 'receiverName' },
        { title: 'SĐT người gửi', field: 'receiverPhone' },
        { title: 'Giá', field: 'price' },
        { title: 'Mã chuyến', field: 'coachesId' },
        {
            title: 'Action',
            field: 'internal_action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <Link to={`/admin/don-hang/chinh-sua/${rowData.id}`}>
                            <button className="btn-handle btn-handle-success">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </Link>
                        <button className="btn-handle btn-handle-danger" onClick={() => handleDeleteShipping(rowData)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ),
        },
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

export default TableShippingList;
