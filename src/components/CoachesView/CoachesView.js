import { Link } from 'react-router-dom';
import config from '~/config';
import CoachImagesSlider from '../CoachImagesSlider/CoachImagesSlider';
import numberWithCommas from '~/utils/numberWithCommas';
import ReactStars from 'react-stars';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './CoachesView.scss';
function CoachesView({ data, onClickBooking, onClickShipping, isSystemUser }) {
    return (
        <div className="coaches-view">
            {/* section breadcrumb */}
            <div className="coaches-view__breadcrumb p-2">
                <Link style={{ color: 'blue' }} to={config.routes.home}>
                    Vé xe H & L
                </Link>
                <Link style={{ color: 'blue' }} to={config.routes.booking}>
                    {` / `} Vé xe
                </Link>
                <span>
                    {` / `} Chuyến {data.id} đi từ {data.start} đến {data.end}
                </span>
            </div>

            {/* section coaches info */}
            <div className="row coaches-view__content p-0 m-0">
                <div className="col-5 coaches-view__content__left p-0 m-0">
                    <div className="coaches-view__content__item coaches-view__carousel">
                        <CoachImagesSlider images={data.images} />
                    </div>
                </div>
                <div className="col-7 coaches-view__content__right p-0 m-0">
                    <div className="coaches-view__content__item coaches-view__detail">
                        <div className="coaches-view__detail__info">
                            <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#2c3e50' }}>
                                {data.coach_garage_name}
                            </p>
                            <p>Mã chuyến: {data.id}</p>
                            <p>Biển số: {data.License_plate}</p>
                            <p>{data.category_name}</p>
                            <p style={{ fontStyle: 'italic', color: '#2c3e50' }}>
                                {data.isShip ? (
                                    <span>
                                        <i style={{ color: '#2c3e50' }} class="fa-solid fa-truck-fast"></i> Nhận giao
                                        hàng
                                    </span>
                                ) : (
                                    'Không nhận giao hàng'
                                )}
                            </p>
                            <p>
                                <ReactStars count={5} value={4.7} size={28} edit={false} color2={'#EDD111'} />
                                <span className="star-counting">
                                    {`4.7`}
                                    <b> ★ </b>
                                </span>
                            </p>
                            {data.isShip && isSystemUser && (
                                <button className="coaches-view__detail__btn btn-shipping" onClick={onClickShipping}>
                                    <span>Gửi hàng </span>
                                </button>
                            )}
                        </div>
                        <div className="coaches-view__detail__booking">
                            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#2c3e50', textAlign: 'right' }}>
                                {numberWithCommas(data.price)}đ
                            </p>
                            <p style={{ textAlign: 'right', fontStyle: 'italic' }}>Còn {data.empty_seat} chỗ trống</p>
                            <button className="coaches-view__detail__btn btn-booking" onClick={onClickBooking}>
                                <span>Đặt vé</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* section stop by  */}
            <div className="coaches-view__stop-by mt-4">
                <div className="coaches-view__stop-by__note">
                    <p style={{ color: 'blue', fontWeight: 'bold' }}>Lưu ý</p>
                    <span>
                        Các mốc thời gian đón, trả bên dưới là thời gian dự kiến, lịch này có thể thay đổi tùy tình hình
                        thực tế. Rất mong quý khách có thể cảm thông.
                    </span>
                </div>
                <div className="coaches-view__stop-by__from-to mt-2">
                    <div className="coaches-view__stop-by__from-to__pick-up">
                        <p style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: '20px' }}>Điểm đón</p>
                        {data.pick_up.map((value, index) => (
                            <div className="coaches-view__stop-by__from-to__point-info" key={index}>
                                <p className="coaches-view__stop-by__from-to__point-info__time">{value.time} • </p>
                                <p>{value.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="coaches-view__stop-by__from-to__drop-off">
                        <p style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: '20px' }}>Điểm trả</p>
                        {data.drop_off.map((value, index) => (
                            <div className="coaches-view__stop-by__from-to__point-info" key={index}>
                                <p className="coaches-view__stop-by__from-to__point-info__time">{value.time} • </p>
                                <p>{value.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* section service */}
            <div className="coaches-view__description mt-4 pb-4">
                <p style={{ color: 'blue', fontWeight: 'bold' }}>Tiện ích</p>
                <span>{data.description}</span>
            </div>
        </div>
    );
}

export default CoachesView;
