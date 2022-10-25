import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';
import CardStat from '~/components/CardStat/CardStat';

import './AccountsManagement.scss';
import TableCustom from '~/components/TableCustom/TableCustom';
import Helmet from '~/components/Helmet/Helmet';
import Image from '~/components/Image';
import userAPI from '~/api/adminAPI/userAPI';
function AccountsManagement() {
    const [accountList, setAccountList] = useState();
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchListUser = async () => {
            try {
                const response = await userAPI.getAll();
                if (response.code === 200) {
                    // toast.success('Lấy dữ liệu thành công', { theme: 'colored' });
                    setAccountList(response.data);
                } else {
                    toast.error('Lỗi không thể lấy dữ liệu ' + response.message, { theme: 'colored' });
                }
            } catch (error) {
                toast.error('Thất bại lấy dữ liệu ' + error.message, { theme: 'colored' });
            }
        };
        fetchListUser();
    }, [deleteSuccess]);

    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Full name', field: 'fullname' },
        {
            field: 'avatar',
            title: 'Avatar',
            render: (rowData) => <Image src={rowData.avatar} style={{ width: 50, height: 50, borderRadius: '50%' }} />,
        },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone' },
        { title: 'Gender', field: 'gender', render: (item) => (item.gender === true ? 'Nữ' : 'Nam') },
        {
            title: 'Status',
            field: 'status',
            render: (item) =>
                item.status === 1 ? (
                    <i class="fa-solid fa-circle-check" style={{ color: 'green' }}></i>
                ) : (
                    <i class="fa-sharp fa-solid fa-circle-xmark" style={{ color: 'red' }}></i>
                ),
        },
        { title: 'Role', field: 'role' },
        {
            title: 'Created Date',
            field: 'createdDate',
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy',
            },
        },
        {
            title: 'Action',
            field: 'internal_action',
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div>
                        <Link to={`/admin/nguoi-dung/chinh-sua/${rowData.id}`}>
                            <button className="btn-handle btn-handle-success">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </Link>
                        <button className="btn-handle btn-handle-danger" onClick={() => handleDeleteUser(rowData.id)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ),
        },
    ];

    const handleDeleteUser = async (id) => {
        try {
            if (window.confirm('Xác nhận xóa ?')) {
                const response = await userAPI.deleteUser(id);
                if (response.code === 200) {
                    toast.success('Xóa thành công', { theme: 'colored' });
                    // const index = accountList.findIndex((value) => value.id === id);
                    // const arrCopy = [...accountList];
                    // arrCopy.splice(index, 1);
                    // setAccountList(arrCopy);
                    setDeleteSuccess(!deleteSuccess);
                } else {
                    toast.error('Xóa thất bại' + response.message, { theme: 'colored' });
                }
            }
        } catch (error) {
            toast.error('Xóa thất bại' + error.message, { theme: 'colored' });
        }
    };
    return (
        <Helmet title="Quản lí người dùng">
            <div className="accounts-management">
                <div
                    className="accounts-management__breadcrumb"
                    style={{ background: 'white', borderRadius: '5px', padding: '15px' }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <span>Quản lý người dùng</span>
                </div>

                {accountList && (
                    <div className="accounts-management__card-stats mt-2 d-flex justify-content-between">
                        <div className="accounts-management__card-stats__item">
                            <CardStat
                                title={'Tổng số tài khoản'}
                                value={accountList?.length}
                                icon={<i class="fa-solid fa-user"></i>}
                                colorCard="blue"
                            />
                        </div>
                        <div className="accounts-management__card-stats__item">
                            <CardStat
                                title={'Số tài khoản khóa'}
                                value={accountList?.filter((acc) => acc.status === 0).length}
                                icon={<i class="fa-solid fa-user-lock"></i>}
                                colorCard="red"
                            />
                        </div>
                    </div>
                )}

                <div className="accounts-management__data-table mt-2">
                    <div className="card" style={{ position: 'static' }}>
                        <div className="card__body">
                            {accountList ? (
                                <TableCustom
                                    isAddButton
                                    title={'User'}
                                    columns={columns}
                                    data={accountList}
                                    link={config.routes.addNewAccount}
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

export default AccountsManagement;
