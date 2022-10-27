import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import shippingList from '~/fakedata/shippingList';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import HistoryTableTicketList from './HistoryTableTicketList';
import HistoryTableShippingList from './HistoryTableShippingList';
function History() {
    const accessToken = localStorage.getItem('accessToken');
    const [ticketListByPhone, setTicketListByPhone] = useState();
    const [shippingListByPhone, setShippingListByPhone] = useState();
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchTicketByUserId = async (currentUserId) => {
            // try {
            //     const responseTicket = await ticketAPI.getTicketByUserId(currentUserId);
            //     if (responseTicket.code === 200) {
            //         setTicketListByPhone(responseTicket.data);
            //         console.log('Lấy vé xe thành công');
            //     } else {
            //         console.log('Lấy vé thất bại' + responseTicket.message);
            //         throw new Error(responseTicket.message);
            //     }
            // } catch (error) {
            //     console.log('Thất bại khi lấy dữ liệu: ', error.message);
            // }
        };
        fetchTicketByUserId(currentUserId);
    }, []);

    useEffect(() => {
        const fetchShippingByUserId = async (currentUserId) => {
            try {
                // const responseShipping = await shippingAPI.getShippingByUserId(currentUserId);
                // if (responseShipping.code === 200) {
                //     setShippingListByPhone(responseShipping.data);
                //     console.log('Lấy đơn hàng thành công');
                // } else {
                //     console.log('Lấy đơn hàng thất bại' + responseShipping.message);
                //     throw new Error(responseShipping.message);
                // }
                setShippingListByPhone(shippingList);
            } catch (error) {
                console.log('Thất bại khi lấy dữ liệu: ', error.message);
            }
        };
        fetchShippingByUserId(currentUserId);
    }, []);
    return (
        <Helmet title="Lịch sử giao dịch">
            <div className="history-management container mb-4">
                <div
                    className="history-management__breadcrumb"
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
                    <span>Lịch sử giao dịch</span>
                </div>
                <h2 className="text-center" style={{ color: 'var(--main-color)' }}>
                    Lịch sử giao dịch
                </h2>
                {accessToken ? (
                    <div className="history-management__data-table">
                        {ticketListByPhone && (
                            <div className="ticket-management__data-table" style={{ marginTop: '10px' }}>
                                <h3 style={{ color: 'var(--second-color)' }}>Số vé: {ticketListByPhone.length}</h3>
                                <HistoryTableTicketList
                                    ticketListByPhone={ticketListByPhone}
                                    setTicketListByPhone={setTicketListByPhone}
                                />
                            </div>
                        )}
                        {shippingListByPhone && (
                            <div className="shipping-management__data-table" style={{ marginTop: '10px' }}>
                                <h3 style={{ color: 'var(--second-color)' }}>
                                    Số đơn hàng: {shippingListByPhone.length}
                                </h3>
                                <HistoryTableShippingList
                                    shippingListByPhone={shippingListByPhone}
                                    setShippingListByPhone={setShippingListByPhone}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center mt-4">Vui lòng đăng nhập để xem lịch sử giao dịch</div>
                )}
            </div>
        </Helmet>
    );
}

export default History;
