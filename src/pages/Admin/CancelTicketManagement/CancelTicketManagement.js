import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ticketAPI from '~/api/adminAPI/ticketAPI';
import Helmet from '~/components/Helmet/Helmet';
import TableCustom from '~/components/TableCustom/TableCustom';
import config from '~/config';

function CancelTicketManagement() {
    const [cancelTicketList, setCancelTicketList] = useState();
    useEffect(() => {
        const fetchRegisterList = async () => {
            try {
                const response = await ticketAPI.getRequestCancelTicket();
                if (response.code === 200) {
                    // toast.success('Lấy đữ liệu thành công !', {
                    //     theme: 'colored',
                    // });
                    setCancelTicketList(response.data);
                } else {
                    toast.error('Lấy dữ liệu thất bại !', { theme: 'colored' });
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu' + err.message, {
                    theme: 'colored',
                });
            }
        };
        fetchRegisterList();
    }, []);

    const handleAcceptRequest = async (ticket) => {
        try {
            if (window.confirm(`Xác nhận hủy vé có id là ${ticket.id} ?`)) {
                const response = await ticketAPI.acceptRequestCancel(ticket.id);
                if (response.code === 200) {
                    const index = cancelTicketList.findIndex((value) => value.id === ticket.id);
                    const arrCopy = [...cancelTicketList];
                    arrCopy.splice(index, 1);
                    setCancelTicketList(arrCopy);
                    toast.success(`Hủy vé ${ticket.id} thành công`, {
                        theme: 'colored',
                    });
                    console.log(`Hủy vé ${ticket.id} thành công`);
                } else {
                    toast.error('Hủy vé thất bại !' + response.message, {
                        theme: 'colored',
                    });
                    throw new Error('Error: ' + response.message);
                }
            }
        } catch (err) {
            toast.error('Hủy vé thất bại !' + err.message, {
                theme: 'colored',
            });
        }
    };
    const handleDenyRequest = async (ticket) => {
        try {
            if (window.confirm(`Từ chối yêu cầu hủy vé có id là ${ticket.id} ?`)) {
                const response = await ticketAPI.rejectRefundTicket(ticket.id);
                if (response.code === 200) {
                    const index = cancelTicketList.findIndex((value) => value.id === ticket.id);
                    const arrCopy = [...cancelTicketList];
                    arrCopy.splice(index, 1);
                    setCancelTicketList(arrCopy);
                    toast.success(`Đã từ chối yêu cầu hủy vé ${ticket.id}`, {
                        theme: 'colored',
                    });
                    console.log(`Đã từ chối yêu cầu hủy vé ${ticket.id}`);
                } else {
                    toast.error('Từ chối yêu cầu hủy vé thất bại !' + response.message, {
                        theme: 'colored',
                    });
                    throw new Error('Error: ' + response.message);
                }
            }
        } catch (err) {
            toast.error('Từ chối thất bại !' + err.message, {
                theme: 'colored',
            });
        }
    };
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Họ tên', field: 'name' },
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
            field: 'startDate',
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy',
            },
        },
        {
            title: 'Trạng thái',
            field: 'status',
            render: (item) => item.status === 2 && <div>Đang đợi hủy</div>,
        },
        {
            title: 'Action',
            field: 'internal_action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <button className="btn-handle btn-handle-success" onClick={() => handleAcceptRequest(rowData)}>
                            <i class="fa-solid fa-check"></i>
                        </button>

                        <button className="btn-handle btn-handle-danger" onClick={() => handleDenyRequest(rowData)}>
                            <i class="fa-solid fa-x"></i>
                        </button>
                    </div>
                ),
        },
    ];
    return (
        <Helmet title="Danh sách yêu cầu hủy vé">
            <div className="cancel-ticket-management">
                <div
                    className="cancel-ticket-management__breadcrumb"
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
                    <span>Danh sách yêu cầu hủy vé</span>
                </div>
                <div className="cancel-ticket-management__data-table" style={{ marginTop: '10px' }}>
                    <div className="card" style={{ position: 'static' }}>
                        <div className="card__body">
                            {cancelTicketList ? (
                                <TableCustom
                                    title={'Danh sách yêu cầu hủy vé'}
                                    columns={columns}
                                    data={cancelTicketList}
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

export default CancelTicketManagement;
