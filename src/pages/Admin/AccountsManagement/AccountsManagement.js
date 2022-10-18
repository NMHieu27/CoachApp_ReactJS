import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import userAPI from '~/api/userAPI';
import { toast } from 'react-toastify';
import CardStat from '~/components/CardStat/CardStat';
import UserData from './UserData';
import BarChart from '~/components/Chart/BarChart';

import './AccountsManagement.scss';
import TableCustom from '~/components/TableCustom/TableCustom';
import Helmet from '~/components/Helmet/Helmet';
function AccountsManagement() {
    const [accountList, setAccountList] = useState([]);
    //Random color
    let colors = [];
    let borderColors = [];
    let r, g, b;
    for (const data in UserData) {
        r = Math.random() * 255;
        g = Math.random() * 255;
        b = Math.random() * 255;
        colors.push(`rgba(${r}, ${g}, ${b}, 0.4)`);
        borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
    }
    const [dataStat, setDataStat] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: 'Users Gained',
                data: UserData.map((data) => data.userGain),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchListUser = async () => {
            try {
                const response = await userAPI.getAll();
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu thành công', { theme: 'colored' });
                    setAccountList(response.data);
                } else {
                    toast.error('Lỗi không thể lấy dữ liệu ' + response.message, { theme: 'colored' });
                }
            } catch (error) {
                toast.error('Thất bại lấy dữ liệu ' + error.message, { theme: 'colored' });
            }
        };
        fetchListUser();
    }, []);

    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Full name', field: 'fullname' },
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
                const response = await userAPI.deleteById(id);
                if (response.code === 200) {
                    toast.success('Xóa thành công', { theme: 'colored' });
                    const index = accountList.findIndex((value) => value.id === id);
                    const arrCopy = [...accountList];
                    arrCopy.splice(index, 1);
                    setAccountList(arrCopy);
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
                <div className="accounts-management__breadcrumb">
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <span>Quản lý người dùng</span>
                </div>

                <div className="accounts-management__data-table">
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

                <div className="accounts-management__card-stats">
                    <CardStat
                        title={'Tổng số tài khoản'}
                        value={accountList.length}
                        icon={<i class="fa-solid fa-user"></i>}
                        colorCard="blue"
                    />
                    <CardStat
                        title={'Số tài khoản khóa'}
                        value={accountList.filter((acc) => acc.status === 0).length}
                        icon={<i class="fa-solid fa-user-lock"></i>}
                        colorCard="red"
                    />
                </div>
                <div className="accounts-management__chart">
                    <div style={{ width: 700 }}>
                        <BarChart chartData={dataStat} />
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default AccountsManagement;
