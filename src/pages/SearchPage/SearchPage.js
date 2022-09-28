import { Link } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import SearchCoach from '~/layouts/components/Client/SearchCoach/SearchCoach';
import './searchpage.scss';
function SearchPage() {
    return (
        <Helmet title="Tìm chuyến xe">
            <div className="SearchPage-wrapper">
                <div className="SearchPage-wrapper__content container">
                    <div className="Search-box-container">
                        <div className="Search-box">
                            <SearchCoach />
                        </div>
                    </div>
                    <div className="BreadCrumb p-2">
                        <Link style={{ color: 'blue' }} to={config.routes.home}>
                            Vé xe H & L
                        </Link>
                        <span>{` > `} Xe đi từ địa điểm A đến địa điểm B</span>
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
                                        <p className="mb-1">Giờ đi</p>
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
                                </div>
                            </div>
                        </div>

                        <div className="trip-container col-lg-9 p-0"></div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default SearchPage;
