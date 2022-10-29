import { Link } from 'react-router-dom';
import numberWithCommas from '~/utils/numberWithCommas';
import Image from '../Image';
import './CoachCard.scss';
function CoachCard({ data }) {
    return (
        <div className="coach-card">
            <div className="row coach-card__container">
                <div className="col-3 coach-card__image">
                    <Image src={data?.pictures[0]?.url} alt="loi" />
                </div>
                <div className="col-5 coach-card__info ">
                    <p style={{ fontWeight: 'bold', color: '#2c3e50' }}>{data.name}</p>
                    <div style={{ fontSize: '16px' }}>{data.category}</div>
                    <i style={{ fontSize: '14px', color: '#2c3e50' }}>
                        {data.shipping ? 'Có nhận giao hàng' : 'Không nhận giao hàng'}
                    </i>
                    <div className="time-line d-flex">
                        <svg
                            class="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 eKNjJr"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="74"
                            viewBox="0 0 14 74"
                        >
                            <path
                                fill="none"
                                stroke="#2e3c50"
                                strokeLinecap="round"
                                strokeWidth="2"
                                strokeDasharray="0 7"
                                d="M7 13.5v46"
                            ></path>
                            <g fill="none" stroke="#2e3c50" strokeWidth="3">
                                <circle cx="7" cy="7" r="7" stroke="none"></circle>
                                <circle cx="7" cy="7" r="5.5"></circle>
                            </g>
                            <path
                                d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                                fill="#2e3c50"
                            ></path>
                        </svg>{' '}
                        <div className="time-line__from-to">
                            <div className="time-line__from d-flex">
                                <p className="time-line__hour">{data?.pickUp[0]?.time.slice(0, 5)}</p>
                                <p className="time-line__place">• {data?.dropOff[0]?.name}</p>
                            </div>
                            <div className="time-line__to d-flex">
                                <p className="time-line__hour">
                                    {data.pickUp[data.pickUp.length - 1]?.time.slice(0, 5)}
                                </p>
                                <p className="time-line__place">• {data.dropOff[data.dropOff.length - 1]?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4 coach-card__booking">
                    <p className="coach-card__booking__price">{numberWithCommas(data.price)}đ</p>
                    <p className="coach-card__booking__empty-seat">Còn {data.emptySeat} chỗ trống</p>
                    <Link to={`/chi-tiet-chuyen-xe/${data.id}`}>
                        <button className="coach-card__booking__btn-detail">
                            <span>Chọn chuyến </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CoachCard;
