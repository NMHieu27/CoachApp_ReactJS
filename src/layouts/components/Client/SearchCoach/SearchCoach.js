import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Dropdown from '~/components/Dropdown/Dropdown';
import DateTime from '~/components/DateTime/DateTime';
import './searchcoach.scss';

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
function SearchCoach() {
    const [selectedFrom, setSelectedFrom] = useState();
    const [selectedTo, setSelectedTo] = useState();
    const [selectedFromId, setSelectedFromId] = useState(from[0].id);
    const [selectedToId, setSelectedToId] = useState(to[0].id);
    // let selectedFrom = '';
    // let selectedFromId = '';
    // let selectedTo = '';
    // let selectedToId = '';

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
                            // onChange={({ selected, selectedId }) => {
                            //     selectedFrom = selected;
                            //     selectedFromId = selectedId;
                            // }}
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
                            // onChange={({ selected, selectedId }) => {
                            //     selectedTo = selected;
                            //     selectedToId = selectedId;
                            // }}
                            options={to}
                            isIcon
                            isEdit
                            icon="fa-solid fa-location-dot"
                            placeholder="Địa điểm đến"
                            fontWeightInput={'bold'}
                        />
                    </div>
                    <div className="search-item date">
                        <DateTime />
                        {/* <i class="fa-solid fa-calendar-days"></i> */}
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
