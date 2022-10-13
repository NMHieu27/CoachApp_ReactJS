import { useState, useEffect } from 'react';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import { Link } from 'react-router-dom';
import coachGarageAPI from '~/api/coachGarageAPI';
import { toast } from 'react-toastify';
import './RegisterManagement.scss';
import TableCustom from '~/components/TableCustom/TableCustom';
function RegisterManagement() {
    const [registerList, setRegisterList] = useState();
    useEffect(() => {
        const fetchRegisterList = async () => {
            try {
                // Chua co api nen lay tam get all coach garage
                const response = await coachGarageAPI.getAll();
                if (response.code === 200) {
                    toast.success('Lấy đữ liệu thành công !', { theme: 'colored' });
                    setRegisterList(response.data);
                } else {
                    toast.error('Lấy dữ liệu thất bại !', { theme: 'colored' });
                }
            } catch (err) {
                toast.error('Thất bại khi lấy dữ liệu' + err.message, { theme: 'colored' });
            }
        };
        fetchRegisterList();
    }, []);
    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Tên nhà xe', field: 'name' },
        { title: 'Tên chủ nhà xe', field: 'owner' },
        { title: 'Phone', field: 'phone' },
        { title: 'Email', field: 'email' },
        { title: 'Địa chỉ', field: 'address' },
        { title: 'Trạng thái', field: 'status', render: (item) => (item.status === 2 ? 'Chờ xét duyệt' : item.status) },
        {
            title: 'Action',
            field: 'action',
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

    const handleAcceptRequest = async (coachGarage) => {
        try {
            if (window.confirm(`Chấp nhận nhà xe ${coachGarage.name} ?`)) {
                const response = await coachGarageAPI.acceptRequest(coachGarage.id);
                if (response.code === 200) {
                    const index = registerList.findIndex((value) => value.id === coachGarage.id);
                    const arrCopy = [...registerList];
                    arrCopy.splice(index, 1);
                    setRegisterList(arrCopy);
                    toast.success(`Đã chấp nhận nhà xe ${coachGarage.name}`, { theme: 'colored' });
                    console.log(`Đã chấp nhận nhà xe ${coachGarage.name}`);
                } else {
                    toast.error('Chấp nhận thất bại !' + response.message, { theme: 'colored' });
                    throw new Error('Error: ' + response.message);
                }
            }
        } catch (err) {
            toast.error('Chấp nhận thất bại !' + err.message, { theme: 'colored' });
        }
    };
    const handleDenyRequest = async (coachGarage) => {
        try {
            if (window.confirm(`Từ chối nhà xe ${coachGarage.name} ?`)) {
                const response = await coachGarageAPI.denyRequest(coachGarage.id);
                if (response.code === 200) {
                    const index = registerList.findIndex((value) => value.id === coachGarage.id);
                    const arrCopy = [...registerList];
                    arrCopy.splice(index, 1);
                    setRegisterList(arrCopy);
                    toast.success(`Đã từ chối nhà xe ${coachGarage.name}`, { theme: 'colored' });
                    console.log(`Đã từ chối nhà xe ${coachGarage.name}`);
                } else {
                    toast.error('Từ chối thất bại !' + response.message, { theme: 'colored' });
                    throw new Error('Error: ' + response.message);
                }
            }
        } catch (err) {
            toast.error('Từ chối thất bại !' + err.message, { theme: 'colored' });
        }
    };
    return (
        <Helmet title="Danh sách nhà xe đăng kí bán vé">
            <div className="register-management">
                <div className="register-management__breadcrumb">
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <span>Danh sách đăng kí bán vé</span>
                </div>
                <div className="register-management__data-table">
                    <div className="card" style={{ position: 'static' }}>
                        <div className="card__body">
                            {registerList ? (
                                <TableCustom
                                    title={'Đơn đăng kí cần phê duyệt'}
                                    columns={columns}
                                    data={registerList}
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

export default RegisterManagement;
