// import { useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import SearchCoach from '~/layouts/components/Client/SearchCoach/SearchCoach';
import MultiRangeSlider from '~/components/MultiRangeSlider/MultiRangeSlider';
import QuantityInput from '~/components/QuantityInput/QuantityInput';
import DropdownList from '~/components/DropdownList/DropdownList';
import CoachCard from '~/components/CoachCard/CoachCard';
import './Booking.scss';

//Import fake data
import nhaxe from '~/fakedata/nhaxe';
import diemdon from '~/fakedata/diemdon';
import diemtra from '~/fakedata/diemtra';
import chuyenxe from '~/fakedata/chuyenxe';
import { useState } from 'react';
import formatDate from '~/utils/formatDate';

const from = [
    {
        name: 'TP HCM',
        id: 1,
    },
    {
        name: 'Hà Nội',
        id: 2,
    },
    {
        name: 'Đà Nẵng',
        id: 3,
    },
    {
        name: 'Thái Nguyên',
        id: 5,
    },
    {
        name: 'Đà Lạt',
        id: 6,
    },
    {
        name: 'Hạ Long',
        id: 7,
    },
];
const to = [
    {
        name: 'Thái Nguyên',
        id: 5,
    },
    {
        name: 'Đà Lạt',
        id: 6,
    },
    {
        name: 'Hạ Long',
        id: 7,
    },
];
function Booking() {
    const [selectedFrom, setSelectedFrom] = useState();
    const [selectedTo, setSelectedTo] = useState();
    const [selectedFromId, setSelectedFromId] = useState(from[0].id);
    const [selectedToId, setSelectedToId] = useState(to[0].id);
    const [date, setDate] = useState(formatDate.fFullDate(new Date()));
    return (
        <Helmet title="Đặt vé">
            <div className="SearchPage-wrapper">
                <div className="SearchPage-wrapper__content container">
                    <div className="Search-box-container">
                        <div className="Search-box">
                            <SearchCoach
                                selectedFrom={selectedFrom}
                                setSelectedFrom={setSelectedFrom}
                                selectedTo={selectedTo}
                                setSelectedTo={setSelectedTo}
                                selectedFromId={selectedFromId}
                                setSelectedFromId={setSelectedFromId}
                                selectedToId={selectedToId}
                                setSelectedToId={setSelectedToId}
                                date={date}
                                setDate={setDate}
                                from={from}
                                to={to}
                            />
                        </div>
                    </div>
                    <div className="BreadCrumb p-2">
                        <Link style={{ color: 'blue' }} to={config.routes.home}>
                            Vé xe H & L
                        </Link>
                        <span>{` / `} Xe đi từ địa điểm A đến địa điểm B</span>
                    </div>

                    {/* Body result */}
                    <div className="row result-wrapper p-0 m-0">
                        <div className="filter-container col-lg-3 p-0">
                            <div className="header-filter">
                                <span className="label-filter">Bộ lọc</span>
                                <span className="clear-filter">Xóa bộ lọc</span>
                            </div>
                            {/* section filter */}
                            <div className="section-filter">
                                <div className="filter-group">
                                    {/* time filter */}
                                    <div className="filter-group__time">
                                        <p className="mb-1 filter-label">Giờ đi</p>
                                        <div className="time-wrap">
                                            <button className="btn-time">
                                                <p className="label-time">Sáng sớm</p>
                                                <p>00:00 - 06:00</p>
                                            </button>
                                            <button className="btn-time">
                                                <p className="label-time">Buổi sáng</p>
                                                <p>06:01 - 12:00</p>
                                            </button>
                                            <button className="btn-time">
                                                <p className="label-time">Buổi chiều</p>
                                                <p>12:01 - 18:00</p>
                                            </button>
                                            <button className="btn-time">
                                                <p className="label-time">Buổi tối</p>
                                                <p>18:01 - 23:59</p>
                                            </button>
                                        </div>
                                    </div>
                                    {/* end time filter */}
                                    {/* price filter */}
                                    <div className="filter-group__price">
                                        <p className="label-price filter-label">Giá vé</p>
                                        <MultiRangeSlider
                                            min={0}
                                            max={2000000}
                                            step={50000}
                                            minGap={50000}
                                            // onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                            valueInfo={'đ'}
                                        />
                                    </div>
                                    {/* end price filter */}
                                    {/* seat filter */}
                                    <div className="filter-group__seat">
                                        <p className="filter-label">Ghế trống</p>
                                        <QuantityInput />
                                    </div>
                                    {/*end seat filter */}
                                    {/* suplier filter */}
                                    <div className="filter-group__supplier">
                                        <p className="filter-label">Nhà xe</p>
                                        <DropdownList data={nhaxe} />
                                    </div>
                                    {/*end suplier filter */}
                                    {/* pick up filter */}
                                    <div className="filter-group__pickup">
                                        <p className="filter-label">Điểm đón</p>
                                        <DropdownList data={diemdon} />
                                    </div>
                                    {/*end pick up filter */}
                                    {/* drop off filter */}
                                    <div className="filter-group__dropoff">
                                        <p className="filter-label">Điểm trả</p>
                                        <DropdownList data={diemtra} />
                                    </div>
                                    {/*end drop off filter */}
                                </div>
                            </div>
                        </div>

                        {/* result coaches */}
                        <div className="coaches-container col-lg-9 p-0">
                            <p style={{ marginLeft: '10px', marginBottom: '0' }}>Số chuyến: {chuyenxe.length}</p>
                            <div className="coaches-container__list-coaches">
                                {chuyenxe.map((data) => (
                                    <div key={data.id} className="coaches-container__item-coaches">
                                        <CoachCard data={data} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* end result coaches */}
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Booking;
