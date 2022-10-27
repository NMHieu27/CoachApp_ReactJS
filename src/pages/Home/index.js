import SearchCoach from '~/layouts/components/Client/SearchCoach/SearchCoach';
import Image from '~/components/Image';
import images from '~/assets/images';
import Helmet from '~/components/Helmet/Helmet';
import './home.scss';
import { useEffect, useState } from 'react';
import formatDate from '~/utils/formatDate';
import { toast } from 'react-toastify';
import commonCountryAPI from '~/api/commonAPI/commonCountryAPI';
function Home() {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [selectedFrom, setSelectedFrom] = useState();
    const [selectedTo, setSelectedTo] = useState();
    const [selectedFromId, setSelectedFromId] = useState(1);
    const [selectedToId, setSelectedToId] = useState(1);
    const [date, setDate] = useState(formatDate.fFullDate(new Date()));

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
    return (
        <Helmet title="Trang chủ">
            <div className="banner-wrapper">
                <h2 className="banner-logan">H & L bạn đồng hành trong mỗi chuyến đi</h2>
                <Image className="banner-image" src={images.banner} alt="banner"></Image>
                <div className="banner-content">
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
            <div className="news-wrapper"></div>
        </Helmet>
    );
}

export default Home;
