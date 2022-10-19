import { useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import TableCustom from '~/components/TableCustom/TableCustom';
import config from '~/config';
import './RevenueStat.scss';
function RevenueStat() {
    const [revenueData, setRevenueData] = useState();
    const columns = [{ title: 'Tháng', field: 'month' }];
    return (
        <Helmet title="Thống kê doanh thu">
            <div className="revenue-stat">
                <div
                    className="coaches-management__breadcrumb"
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
                    <span>Thống kê doanh thu</span>
                </div>
                <div className="revenue-stat__table">
                    <div className="card" style={{ position: 'static' }}>
                        <div className="card__body">
                            {revenueData ? (
                                <TableCustom columns={columns} data={revenueData} link={config.routes.addCoaches} />
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

export default RevenueStat;
