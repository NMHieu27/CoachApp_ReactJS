import SearchCoach from '~/layouts/components/Client/SearchCoach/SearchCoach';
import Image from '~/components/Image';
import images from '~/assets/images';
import Helmet from '~/components/Helmet/Helmet';
import './home.scss';
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
function Home() {
    const [selectedFrom, setSelectedFrom] = useState();
    const [selectedTo, setSelectedTo] = useState();
    const [selectedFromId, setSelectedFromId] = useState(from[0].id);
    const [selectedToId, setSelectedToId] = useState(to[0].id);
    const [date, setDate] = useState(formatDate.fFullDate(new Date()));
    return (
        <Helmet title="Trang chủ">
            <div className="banner-wrapper">
                <h2 className="banner-logan">H & L bạn đồng hành trong mỗi chuyến đi</h2>
                <Image className="banner-image" src={images.banner} alt="banner"></Image>
                <div className="banner-content">
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
            <div className="news-wrapper"></div>
        </Helmet>
    );
}

export default Home;
