// import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import SearchCoach from '~/layouts/components/Client/SearchCoach/SearchCoach';
import MultiRangeSlider from '~/components/MultiRangeSlider/MultiRangeSlider';
import CoachCard from '~/components/CoachCard/CoachCard';
import './Booking.scss';

//Import fake data
import chuyenxe from '~/fakedata/chuyenxe';
import { useEffect, useState } from 'react';
import formatDate from '~/utils/formatDate';
import { toast } from 'react-toastify';
import Dropdown from '~/components/Dropdown/Dropdown';
import commonCountryAPI from '~/api/commonAPI/commonCountryAPI';
import commonStopByAPI from '~/api/commonAPI/commonStopByAPI';

function Booking() {
    const { fromId, toId, startDate } = useParams();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [selectedFrom, setSelectedFrom] = useState();
    const [selectedTo, setSelectedTo] = useState();

    // From and To id
    const [selectedFromId, setSelectedFromId] = useState(+fromId);
    const [selectedToId, setSelectedToId] = useState(+toId);

    const [date, setDate] = useState(startDate);

    // from and to Time
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();

    // min price and max price
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    //  empty seat
    const [emptySeat, setEmptySeat] = useState(1);

    // coachGarage
    const [coachGarageList, setCoachGarageList] = useState([]);
    const [selectedCoachGarage, setSelectedCoachGarage] = useState();
    const [selectedCoachGarageId, setSelectedCoachGarageId] = useState();

    //Pickup and dropoff
    const [pickUpList, setPickUpList] = useState([]);
    const [dropOffList, setDropOffList] = useState([]);

    const [selectedPickUp, setSelectedPickUp] = useState();
    const [selectedPickUpId, setSelectedPickUpId] = useState();
    const [selectedDropOff, setSelectedDropOff] = useState();
    const [selectedDropOffId, setSelectedDropOffId] = useState();

    useEffect(() => {
        const fetchCountryList = async () => {
            try {
                const response = await commonCountryAPI.getAll();
                if (response.code === 200) {
                    setFrom([...response.data]);
                    setTo([...response.data]);
                } else {
                    toast.error('Lấy dữ liệu thất bại' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error('Lấy dữ liệu thất bại' + err.message, { theme: 'colored' });
            }
        };
        fetchCountryList();
    }, []);

    // Get coach garage list
    // useEffect(() => {
    //     const fetchAllCoachGarage = async () => {
    //         try {
    //             const response = await coachGarageAPI.getAll();
    //             if (response.code === 200) {
    //                 console.log('fetch coach garage success');
    //                 setCoachGarageList(response.data);
    //             } else {
    //                 console.log('fetch coach garage error');
    //                 throw new Error(response.message);
    //             }
    //         } catch (err) {
    //             console.log('fetch coach garage failed' + err.message);
    //         }
    //     };
    //     fetchAllCoachGarage();
    // }, []);

    // fetch list pick up
    useEffect(() => {
        const fetchAllPickUpByStartPoint = async (fromId) => {
            try {
                const response = await commonStopByAPI.getStopByCountryId(fromId);
                if (response.code === 200) {
                    console.log('fetch pickup success');
                    console.log(response.data);
                    setPickUpList([...response.data]);
                } else {
                    console.log('fetch pickup error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch pickup failed' + err.message);
            }
        };
        fetchAllPickUpByStartPoint(fromId);
    }, [fromId]);

    // fetch list drop off
    useEffect(() => {
        const fetchAllDropOffByEndPoint = async (toId) => {
            try {
                const response = await commonStopByAPI.getStopByCountryId(toId);
                if (response.code === 200) {
                    console.log('fetch dropoff success');
                    console.log(response.data);
                    setDropOffList([...response.data]);
                } else {
                    console.log('fetch dropoff error');
                    throw new Error(response.message);
                }
            } catch (err) {
                console.log('fetch dropoff failed' + err.message);
            }
        };
        fetchAllDropOffByEndPoint(toId);
    }, [toId]);

    return (
        <Helmet title="Đặt vé">
            <div className="SearchPage-wrapper">
                <div className="SearchPage-wrapper__content container">
                    <div className="Search-box-container">
                        <div className="Search-box">
                            {from && to && (
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
                            )}
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
                                            <button
                                                className="btn-time"
                                                onClick={() => {
                                                    setFromTime('00:00');
                                                    setToTime('06:00');
                                                }}
                                            >
                                                <p className="label-time">Sáng sớm</p>
                                                <p>00:00 - 06:00</p>
                                            </button>

                                            <button
                                                className="btn-time"
                                                onClick={() => {
                                                    setFromTime('06:01');
                                                    setToTime('12:00');
                                                }}
                                            >
                                                <p className="label-time">Buổi sáng</p>
                                                <p>06:01 - 12:00</p>
                                            </button>

                                            <button
                                                className="btn-time"
                                                onClick={() => {
                                                    setFromTime('12:01');
                                                    setToTime('18:00');
                                                }}
                                            >
                                                <p className="label-time">Buổi chiều</p>
                                                <p>12:01 - 18:00</p>
                                            </button>

                                            <button
                                                className="btn-time"
                                                onClick={() => {
                                                    setFromTime('18:01');
                                                    setToTime('23:59');
                                                }}
                                            >
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
                                            onChange={({ min, max }) => {
                                                setMinPrice(+min);
                                                setMaxPrice(+max);
                                            }}
                                            valueInfo={'đ'}
                                        />
                                    </div>
                                    {/* end price filter */}
                                    {/* seat filter */}
                                    <div className="filter-group__seat">
                                        <div class="col-md-12 mb-2 pb-2">
                                            <div class="form-outline">
                                                <label class="form-label" for="seatNum">
                                                    Số ghế trống
                                                </label>
                                                <input
                                                    min={1}
                                                    max={50}
                                                    type="number"
                                                    name="seatNum"
                                                    id="seatNum"
                                                    class="form-control form-control-lg"
                                                    value={emptySeat}
                                                    onChange={(e) => setEmptySeat(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/*end seat filter */}
                                    {/* suplier filter */}
                                    <div className="filter-group__supplier">
                                        <p className="filter-label">Nhà xe</p>
                                        <div className="col-md-12 mb-2 pb-2">
                                            <div className="form-outline">
                                                <div style={{ height: '56px' }}>
                                                    {coachGarageList.length > 0 && (
                                                        <Dropdown
                                                            maxHeight={'150px'}
                                                            options={coachGarageList}
                                                            selected={selectedCoachGarage}
                                                            setSelected={setSelectedCoachGarage}
                                                            selectedId={selectedCoachGarageId}
                                                            setSelectedId={setSelectedCoachGarageId}
                                                            isEdit
                                                            placeholder="Chọn điểm trả"
                                                            top={'100%'}
                                                            paddingDropDown="0px 20px"
                                                            borderDropDown="1px solid #ccc"
                                                            borderRadiusDropDown="5px"
                                                            borderContentDropDown="1px solid #ccc"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*end suplier filter */}
                                    {/* pick up filter */}
                                    <div className="filter-group__pickup">
                                        <p className="filter-label">Điểm đón</p>
                                        <div className="col-md-12 mb-2 pb-2">
                                            <div className="form-outline">
                                                <div style={{ height: '56px' }}>
                                                    {pickUpList.length > 0 && (
                                                        <Dropdown
                                                            maxHeight={'250px'}
                                                            options={pickUpList}
                                                            selected={selectedPickUp}
                                                            setSelected={setSelectedPickUp}
                                                            selectedId={selectedPickUpId}
                                                            setSelectedId={setSelectedPickUpId}
                                                            isEdit
                                                            placeholder="Chọn điểm đón"
                                                            top={'100%'}
                                                            paddingDropDown="0px 20px"
                                                            borderDropDown="1px solid #ccc"
                                                            borderRadiusDropDown="5px"
                                                            borderContentDropDown="1px solid #ccc"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*end pick up filter */}
                                    {/* drop off filter */}
                                    <div className="filter-group__dropoff">
                                        <p className="filter-label">Điểm trả</p>
                                        <div className="col-md-12 mb-2 pb-2">
                                            <div className="form-outline">
                                                <div style={{ height: '56px' }}>
                                                    {dropOffList.length > 0 && (
                                                        <Dropdown
                                                            maxHeight={'250px'}
                                                            options={dropOffList}
                                                            selected={selectedDropOff}
                                                            setSelected={setSelectedDropOff}
                                                            selectedId={selectedDropOffId}
                                                            setSelectedId={setSelectedDropOffId}
                                                            isEdit
                                                            placeholder="Chọn điểm trả"
                                                            top={'100%'}
                                                            paddingDropDown="0px 20px"
                                                            borderDropDown="1px solid #ccc"
                                                            borderRadiusDropDown="5px"
                                                            borderContentDropDown="1px solid #ccc"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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
