import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Dropdown from '~/components/Dropdown/Dropdown';
import './searchcoach.scss';
function SearchCoach({
    selectedFrom,
    selectedFromId,
    selectedTo,
    selectedToId,
    setSelectedFrom,
    setSelectedTo,
    setSelectedFromId,
    setSelectedToId,
    date,
    setDate,
    from,
    to,
}) {
    const nav = useNavigate();
    const handleSearch = () => {
        // Test
        console.log(selectedFrom, selectedFromId, selectedTo, selectedToId);
        nav(config.routes.booking);
    };
    return (
        <div className="search-wrapper">
            <div className="banner-search-tab">
                <div className="content-tab">
                    <i class="fa-solid fa-bus"></i>
                    <span>Xe khách</span>
                </div>
            </div>
            <div className="banner-search">
                <div className="search-items">
                    <div className="search-item from-where">
                        <Dropdown
                            selected={selectedFrom}
                            setSelected={setSelectedFrom}
                            selectedId={selectedFromId}
                            setSelectedId={setSelectedFromId}
                            options={from}
                            isIcon
                            isEdit
                            icon="fa-solid fa-location-dot"
                            placeholder="Địa điểm đi"
                            fontWeightInput={'bold'}
                        />
                    </div>
                    <div className="search-item to-where">
                        <Dropdown
                            selected={selectedTo}
                            setSelected={setSelectedTo}
                            selectedId={selectedToId}
                            setSelectedId={setSelectedToId}
                            options={to}
                            isIcon
                            isEdit
                            icon="fa-solid fa-location-dot"
                            placeholder="Địa điểm đến"
                            fontWeightInput={'bold'}
                        />
                    </div>
                    <div className="search-item date">
                        <input
                            type="date"
                            className="date-input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="search-item search-button">
                        <button onClick={handleSearch}>Tìm vé</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCoach;
