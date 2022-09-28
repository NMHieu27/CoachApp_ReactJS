import SearchCoach from '~/layouts/components/Client/SearchCoach/SearchCoach';
import Image from '~/components/Image';
import images from '~/assets/images';
import Helmet from '~/components/Helmet/Helmet';
import './home.scss';
function Home() {
    return (
        <Helmet title="Trang chủ">
            <div className="banner-wrapper">
                <h2 className="banner-logan">H & L bạn đồng hành trong mỗi chuyến đi</h2>
                <Image className="banner-image" src={images.banner} alt="banner"></Image>
                <div className="banner-content">
                    <SearchCoach />
                </div>
            </div>
            <div className="news-wrapper"></div>
        </Helmet>
    );
}

export default Home;
