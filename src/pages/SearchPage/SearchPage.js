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
                    <div className="BreadCrumb">
                        <Link to={config.routes.home}>H & L</Link>
                        <span>{` > `}</span>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default SearchPage;
