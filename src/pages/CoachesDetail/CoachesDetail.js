import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
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

    // get point
    // const [selectedPickUp, setSelectedPickUp] = useState(coach.pick_up[0].name);
    // const [selectedDropOff, setSelectedDropOff] = useState(coach.drop_off[0].name);
    let selectedPickUp = '';
    let selectedPickUpId = '';
    let selectedDropOff = '';
    let selectedDropOffId = '';

    // get seat
    const [quantitySeat, setQuantitySeat] = useState(1);

    // useModal
    const { isShowing: isShowingBooking, setIsShowing: setIsShowingBooking, toggle: toggleBooking } = useModal();
    const { isShowing: isShowingShipping, setIsShowing: setIsShowingShipping, toggle: toggleShipping } = useModal();

    console.log(commentList);

    // useRef
    // booking
    const fullNameBooking_input_el = useRef();
    const phoneBooking_input_el = useRef();
    const emailBooking_input_el = useRef();

    // shipping
    const nameOrder_input_el = useRef();
    const fullNameShippingSender_input_el = useRef();
    const phoneShippingSender_input_el = useRef();
    const emailShippingSender_input_el = useRef();
    const fullNameShippingReceiver_input_el = useRef();
    const phoneShippingReceiver_input_el = useRef();
    const emailShippingReceiver_input_el = useRef();
    const freight_input_el = useRef();

    //handle when rating change
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    // Handle comment
    let handleComment = () => {
        const content = document.querySelector('textarea');
        console.log(content.value.trim());
    };

    // Handle Booking ticket
    const handleBooking = () => {
        const bookingInfo = {
            name: fullNameBooking_input_el.current.value,
            phone: phoneBooking_input_el.current.value,
            email: emailBooking_input_el.current.value,
            pick_up_id: selectedPickUpId,
            drop_off_id: selectedDropOffId,
            seat: quantitySeat,
        };
        console.log(bookingInfo);
    };

    // Handle Shipping
    const handleShipping = () => {
        const shippingInfo = {
            name: nameOrder_input_el.current.value,
            senderName: fullNameShippingSender_input_el.current.value,
            senderPhone: phoneShippingSender_input_el.value,
            senderEmail: emailShippingSender_input_el.value,
            receiverName: fullNameShippingReceiver_input_el.current.value,
            receiverPhone: phoneShippingReceiver_input_el.value,
            receiverEmail: emailShippingReceiver_input_el.current.value,
            freight: freight_input_el.current.value,
        };
        console.log(shippingInfo);
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
                    onClickAction={handleBooking}
                >
                    <div className="modal-booking">
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Họ tên</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input ref={fullNameBooking_input_el} className="modal-booking__input-field__content" />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Số điện thoại</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                type="tel"
                                ref={phoneBooking_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Email</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                type="email"
                                ref={emailBooking_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                        <div className="modal-booking__pick-up">
                            <div className="modal-booking__input-field__label">
                                <span>Chọn điểm đón</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <div>
                                <Dropdown
                                    maxHeight={'150px'}
                                    options={coach.pick_up}
                                    onChange={({ selected, selectedId }) => {
                                        selectedPickUp = selected;
                                        selectedPickUpId = selectedId;
                                    }}
                                    isEdit
                                    placeholder="Chọn điểm đón"
                                    top={'100%'}
                                    paddingDropDown="0px 20px"
                                    borderDropDown="1px solid #ccc"
                                />
                            </div>
                        </div>
                        <div className="modal-booking__drop-off">
                            <div className="modal-booking__input-field__label">
                                <span>Chọn điểm trả</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <div>
                                <Dropdown
                                    maxHeight={'150px'}
                                    options={coach.drop_off}
                                    onChange={({ selected, selectedId }) => {
                                        selectedDropOff = selected;
                                        selectedDropOffId = selectedId;
                                    }}
                                    isEdit
                                    placeholder="Chọn điểm trả"
                                    top={'100%'}
                                    paddingDropDown="0px 20px"
                                    borderDropDown="1px solid #ccc"
                                />
                            </div>
                        </div>
                        <div className="modal-booking__quantity-seat">
                            <div className="modal-booking__input-field__label">Số ghế</div>
                            <div className="quantity-seat__choose" style={{ width: '50%' }}>
                                <QuantityInput
                                    onChange={({ value }) => setQuantitySeat(value)}
                                    maxValue={coach.empty_seat}
                                />
                            </div>
                        </div>
                        <div className="modal-booking__input-field__label" style={{ textAlign: 'right' }}>
                            Tổng tiền: {numberWithCommas(+quantitySeat * coach.price)}đ
                        </div>
                    </div>
                </Modal>

                {/* Modal shipping */}
                <Modal
                    isShowing={isShowingShipping}
                    setIsShowing={setIsShowingShipping}
                    hide={toggleShipping}
                    title="Gửi hàng"
                    onClickAction={handleShipping}
                >
                    <div className="modal-shipping">
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Tên đơn hàng</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input ref={nameOrder_input_el} className="modal-booking__input-field__content" />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Họ tên nguời gửi</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                ref={fullNameShippingSender_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Số điện thoại người gửi</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                type="tel"
                                ref={phoneShippingSender_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Email người gửi</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                type="email"
                                ref={emailShippingSender_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Họ tên người nhận</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                ref={fullNameShippingReceiver_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Số điện thoại người nhận</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                type="tel"
                                ref={phoneShippingReceiver_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Email người nhận</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                type="email"
                                ref={emailShippingReceiver_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                        <div className="modal-booking__input-field">
                            <div className="modal-booking__input-field__label">
                                <span>Giá</span>
                                <span className="input-field__required">*</span>
                            </div>
                            <input
                                type="number"
                                ref={freight_input_el}
                                className="modal-booking__input-field__content"
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </Helmet>
    );
}

export default CoachesDetail;
