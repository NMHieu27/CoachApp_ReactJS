import CardStat from '~/components/CardStat/CardStat';
import './AdminHome.scss';

function AdminHome() {
    const stats = [
        {
            title: 'Thu nhập (hàng tháng)',
            value: '5.000.000đ',
            icon: <i class="fa-solid fa-sack-dollar"></i>,
            colorCard: 'green',
        },
        {
            title: 'Thu nhập (hàng tháng)',
            value: '5.000.000đ',
            icon: <i class="fa-solid fa-sack-dollar"></i>,
            colorCard: 'blue',
        },
        {
            title: 'Thu nhập (hàng tháng)',
            value: '5.000.000đ',
            icon: <i class="fa-solid fa-sack-dollar"></i>,
            colorCard: 'red',
        },
        {
            title: 'Thu nhập (hàng tháng)',
            value: '5.000.000đ',
            icon: <i class="fa-solid fa-sack-dollar"></i>,
            colorCard: 'orange',
        },
        {
            title: 'Thu nhập (hàng tháng)',
            value: '5.000.000đ',
            icon: <i class="fa-solid fa-sack-dollar"></i>,
            colorCard: 'purple',
        },
        {
            title: 'Thu nhập (hàng tháng)',
            value: '5.000.000đ',
            icon: <i class="fa-solid fa-sack-dollar"></i>,
            colorCard: 'pink',
        },
        {
            title: 'Thu nhập (hàng tháng)',
            value: '5.000.000đ',
            icon: <i class="fa-solid fa-sack-dollar"></i>,
            colorCard: 'cyan',
        },
        {
            title: 'Thu nhập (hàng tháng)',
            value: '5.000.000đ',
            icon: <i class="fa-solid fa-sack-dollar"></i>,
            colorCard: '',
        },
    ];
    return (
        <div className="admin-home">
            <div className="admin-home__container">
                <div className="admin-home__content">
                    <h2 style={{ color: 'var(--second-color)' }}>Dash board</h2>
                    <div className="admin-home__content__card-stats">
                        {stats.map((data, index) => (
                            <div key={index} className="card-stat-item">
                                <CardStat
                                    title={data.title}
                                    value={data.value}
                                    icon={data.icon}
                                    colorCard={data.colorCard}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
