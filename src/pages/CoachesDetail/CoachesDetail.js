import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './CoachesDetail.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//Import fake data
import chuyenxe from '~/fakedata/chuyenxe';
import CoachesView from '~/components/CoachesView/CoachesView';
import Helmet from '~/components/Helmet/Helmet';

function CoachesDetail() {
    const { coachesID } = useParams();
    //Chua co API từ back --> fake dữ liệu và tự duyệt
    const [coach, setCoach] = useState(() => {
        const result = chuyenxe.find((xe) => xe.id === +coachesID);
        return result;
    });

    return (
        <Helmet title="Đặt vé">
            <div className="coaches-detail container mt-0 p-0">
                <div className="coaches-detail__info-container">
                    <CoachesView data={coach} />
                </div>
                <div className="coaches-detail__comment-container"></div>
                <div className="coaches-detail__list-comment-container"></div>
            </div>
        </Helmet>
    );
}

export default CoachesDetail;
