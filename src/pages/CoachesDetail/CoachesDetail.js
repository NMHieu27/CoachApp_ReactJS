import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import useModal from '~/hooks/useModal';
import Helmet from '~/components/Helmet/Helmet';
import CommentList from '~/components/CommentList/CommentList';
import ReactStars from 'react-stars';
import numberWithCommas from '~/utils/numberWithCommas';
import './CoachesDetail.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//Import fake data
import chuyenxe from '~/fakedata/chuyenxe';
import comment from '~/fakedata/comment';
import CoachesView from '~/components/CoachesView/CoachesView';
import ModalBooking from '~/components/ModalBooking/ModalBooking';
import ModalShipping from '~/components/ModalShipping/ModalShipping';
import { toast } from 'react-toastify';

//fake dữ liệu current_user
const current_user = {
    id: 12,
    fullname: 'Nguyễn Minh Hiếu',
    avatar: 'https://hinhnen123.com/anh-avatar-cute/hinh-anh-avatar-dep-nhat-20/',
};

function CoachesDetail() {
    const { coachesID } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    const currentUserId = localStorage.getItem('userId');
    const [isSystemUser, setIsSystemUser] = useState(false);

    useEffect(() => {
        (role === 'employee' || role === 'admin') && setIsSystemUser(true);
    }, [role]);

    //Chua co API từ back --> fake dữ liệu và tự duyệt
    const [coach, setCoach] = useState(() => {
        const result = chuyenxe.find((xe) => xe.id === +coachesID);
        return result;
    });

    const [commentList, setCommentList] = useState(() => {
        const result = comment.filter((com) => com.License_plate === coach.License_plate);
        return result;
    });
    // useModal
    const { isShowing: isShowingBooking, setIsShowing: setIsShowingBooking, toggle: toggleBooking } = useModal();
    const { isShowing: isShowingShipping, setIsShowing: setIsShowingShipping, toggle: toggleShipping } = useModal();

    console.log(commentList);

    //handle when rating change
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    // Handle comment
    let handleComment = () => {
        const content = document.querySelector('textarea');
        console.log(content.value.trim());
    };

    const handleClickBooking = () => {
        if (accessToken) {
            toggleBooking();
        } else {
            toast.error('Mời bạn đăng nhập để đặt vé!', { theme: 'colored' });
        }
    };

    const handleClickShipping = () => {
        if (accessToken) {
            toggleShipping();
        } else {
            toast.error('Mời bạn đăng nhập để gửi hàng!', { theme: 'colored' });
        }
    };
    return (
        <Helmet title="Đặt vé">
            <div className="coaches-detail container mt-0 p-0">
                {/* coaches info */}
                <div className="coaches-detail__info-container">
                    <CoachesView
                        isSystemUser={isSystemUser}
                        data={coach}
                        onClickBooking={handleClickBooking}
                        onClickShipping={handleClickShipping}
                    />
                </div>

                {/* comment input */}
                {accessToken && (
                    <div className="coaches-detail__comment-container">
                        <div className="coaches-detail__user-rating">
                            <div className="coaches-detail__user-rating__avatar">
                                <img src={current_user.avatar} alt={current_user.fullname} />
                            </div>
                            <div className="coaches-detail__user-rating__name-rating">
                                <div className="coaches-detail__user-rating__name-rating__name">
                                    <span>{current_user.fullname}</span>
                                </div>
                                <div className="coaches-detail__user-rating__name-rating__rating">
                                    <ReactStars
                                        half={false}
                                        onChange={ratingChanged}
                                        value={5}
                                        count={5}
                                        size={20}
                                        edit={true}
                                        color2={'#EDD111'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="coaches-detail__comment-input">
                            <div className="coaches-detail__comment-input__comment-area">
                                <textarea rows="5" placeholder="Bình luận tại đây ..." id="comment"></textarea>
                            </div>
                            <button className="coaches-detail__comment-input__action" onClick={() => handleComment()}>
                                Bình luận
                            </button>
                        </div>
                    </div>
                )}

                {/* List comments */}
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

                {/* Modal buy tickets */}
                <ModalBooking
                    userId={currentUserId}
                    coachesId={coachesID}
                    pickUpList={coach.pick_up}
                    dropOffList={coach.drop_off}
                    maxSeat={coach?.empty_seat}
                    price={coach?.price}
                    isShowingBooking={isShowingBooking}
                    setIsShowingBooking={setIsShowingBooking}
                    toggleBooking={toggleBooking}
                />

                <ModalShipping
                    userId={currentUserId}
                    coachesId={coachesID}
                    isShowingShipping={isShowingShipping}
                    setIsShowingShipping={setIsShowingShipping}
                    toggleShipping={toggleShipping}
                />
            </div>
        </Helmet>
    );
}

export default CoachesDetail;
