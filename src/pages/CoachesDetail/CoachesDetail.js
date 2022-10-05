import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useModal from '~/hooks/useModal';
import Helmet from '~/components/Helmet/Helmet';
import CommentList from '~/components/CommentList/CommentList';
import ReactStars from 'react-stars';
import './CoachesDetail.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//Import fake data
import chuyenxe from '~/fakedata/chuyenxe';
import comment from '~/fakedata/comment';
import CoachesView from '~/components/CoachesView/CoachesView';
import Modal from '~/components/Modal/Modal';
import QuantityInput from '~/components/QuantityInput/QuantityInput';
import Dropdown from '~/components/Dropdown/Dropdown';

//fake dữ liệu current_user
const current_user = {
    id: 12,
    fullname: 'Nguyễn Minh Hiếu',
    avatar: 'https://hinhnen123.com/anh-avatar-cute/hinh-anh-avatar-dep-nhat-20/',
};

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

    const [selectedPickUp, setSelectedPickUp] = useState(coach.pick_up[0].name);
    const [selectedDropOff, setSelectedDropOff] = useState(coach.drop_off[0].name);

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
    return (
        <Helmet title="Đặt vé">
            <div className="coaches-detail container mt-0 p-0">
                {/* coaches info */}
                <div className="coaches-detail__info-container">
                    <CoachesView data={coach} onClickBooking={toggleBooking} onClickShipping={toggleShipping} />
                </div>

                {/* comment input */}
                {current_user.id && (
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
                <Modal
                    isShowing={isShowingBooking}
                    setIsShowing={setIsShowingBooking}
                    hide={toggleBooking}
                    title="Đặt vé"
                    onClickAction={() => console.log('Đặt vé')}
                >
                    <div className="modal-booking">
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Họ tên</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input className="modal-booking__input-field__content" />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Số điện thoại</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input className="modal-booking__input-field__content" />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Email</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input className="modal-booking__input-field__content" />
                        </div>
                        <div className="modal-booking__quantity-seat">
                            <div>Số ghế</div>
                            <div className="quantity-seat__choose" style={{ width: '50%' }}>
                                <QuantityInput />
                            </div>
                        </div>
                        <div className="modal-booking__pick-up">
                            <div>Chọn điểm đón</div>
                            <div>
                                <Dropdown
                                    maxHeight={'150px'}
                                    options={coach.pick_up}
                                    selected={selectedPickUp}
                                    setSelected={setSelectedPickUp}
                                    isEdit
                                    placeholder="Chọn điểm đón"
                                    top={'100%'}
                                />
                            </div>
                        </div>
                        <div className="modal-booking__drop-off">
                            <div>Chọn điểm trả</div>
                            <div>
                                <Dropdown
                                    maxHeight={'150px'}
                                    options={coach.drop_off}
                                    selected={selectedDropOff}
                                    setSelected={setSelectedDropOff}
                                    isEdit
                                    placeholder="Chọn điểm trả"
                                    top={'100%'}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Modal shipping */}
                <Modal
                    isShowing={isShowingShipping}
                    setIsShowing={setIsShowingShipping}
                    hide={toggleShipping}
                    title="Gửi hàng"
                    onClickAction={() => console.log('Gửi hàng')}
                ></Modal>
            </div>
        </Helmet>
    );
}

export default CoachesDetail;
