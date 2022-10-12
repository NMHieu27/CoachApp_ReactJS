import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import accountlist from '~/fakedata/accountlist';
import Table from '~/components/Table/Table';
import './AccountsManagement.scss';
import TableCustom from '~/components/TableCustom/TableCustom';
function AccountsManagement() {
    const [accountList, setAccountList] = useState(accountlist);
    let tableHead = ['ID', 'Họ tên', 'Giới tính', ' SĐT', 'Ngày tạo', 'Email', 'Trạng thái', 'Vai trò', 'Thao tác'];

    const renderHead = (item, index) => <th key={index}>{item}</th>;

    const renderBody = (item, index) => (
        <tr key={index} onClick={(e) => console.log(e)}>
            <td>{item.id}</td>
            <td>{item.fullname}</td>
            <td>{item.gender === true ? 'male' : 'female'}</td>
            <td>{item.phone}</td>
            <td>{new Date(item.createdDate).toLocaleDateString('vi-VI')}</td>
            <td>{item.email}</td>
            <td>{item.status === 1 ? 'Hoạt động' : 'Vô hiệu'}</td>
            <td>{item.role}</td>
            <td>
                <Link to={`/admin/nguoi-dung/chinh-sua/${item.id}`}>
                    <button className="btn-handle btn-handle-success">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </Link>
                <button className="btn-handle btn-handle-danger">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    );

    return (
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
                            <Table
                                placeholder="Nhập số điện thoại"
                                limit={5}
                                headData={tableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={accountList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        ) : (
                            <p>loading...</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="test">
                <TableCustom />
            </div>
        </div>
    );
}

export default AccountsManagement;
