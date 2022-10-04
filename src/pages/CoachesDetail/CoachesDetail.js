import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Helmet from '~/components/Helmet/Helmet';
import CommentList from '~/components/CommentList/CommentList';
import './CoachesDetail.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//Import fake data
import chuyenxe from '~/fakedata/chuyenxe';
import comment from '~/fakedata/comment';
import CoachesView from '~/components/CoachesView/CoachesView';

function CoachesDetail() {
    const { coachesID } = useParams();
    //Chua co API từ back --> fake dữ liệu và tự duyệt
    const [coach, setCoach] = useState(() => {
        const result = chuyenxe.find((xe) => xe.id === +coachesID);
        return result;
    });

    const [commentList, setCommentList] = useState(() => {
        const result = comment.filter((com) => com.License_plate === coach.License_plate);
        return result;
    });
    console.log(commentList);

    return (
        <Helmet title="Đặt vé">
            <div className="coaches-detail container mt-0 p-0">
                <div className="coaches-detail__info-container">
                    <CoachesView data={coach} />
                </div>
                <div className="coaches-detail__comment-container"></div>
                <div className="coaches-detail__list-comment-container">
                    <CommentList
                        comments={commentList}
                        fiveStar={2} // ở đây đợi API lấy tổng số rating trên xe
                        fourStar={0}
                        threeStar={0}
                        twoStar={0}
                        oneStar={1}
                    />
                </div>
            </div>
        </Helmet>
    );
}

export default CoachesDetail;
