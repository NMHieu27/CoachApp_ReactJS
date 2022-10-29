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
import commonCoachesAPI from '~/api/commonAPI/commonCoachesAPI';

//Import fake data
import chuyenxe from '~/fakedata/chuyenxe';
import comment from '~/fakedata/comment';
import CoachesView from '~/components/CoachesView/CoachesView';
import ModalBooking from '~/components/ModalBooking/ModalBooking';
import ModalShipping from '~/components/ModalShipping/ModalShipping';
import { toast } from 'react-toastify';
import Image from '~/components/Image';
import commonCommentAPI from '~/api/commonAPI/commonCommentAPI';
import { Pagination } from '@material-ui/lab';
import Moment from 'react-moment';
import commentAPI from '~/api/userAPI/commentAPI';

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
    const fullname = localStorage.getItem('fullname');
    const avatar = localStorage.getItem('avatar');
    const [star, setStar] = useState(5);
    const [isSystemUser, setIsSystemUser] = useState(false);

    const [coaches, setCoaches] = useState();
    const [commentList, setCommentList] = useState();

    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [rating, setRating] = useState('');
    const [isComment, setIsComment] = useState(false);
    const [btnActive, setBtnActive] = useState('');
    const [isBooking, setIsBooking] = useState(false);

    const input_comment_el = useRef();

    useEffect(() => {
        (role === 'employee' || role === 'admin') && setIsSystemUser(true);
    }, [role]);

    useEffect(() => {
        const fetchCommentListByCoachesId = async (coachesID) => {
            try {
                const response = await commonCommentAPI.getComment(currentPage, 5, coachesID, rating);
                if (response.code === 200) {
                    console.log('Lay ticket thanh cong!');
                    setCommentList(response.data.content);
                    setTotalPage(response.data.totalPages);
                } else {
                    console.log('fetch coaches failed');
                }
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchCommentListByCoachesId(coachesID);
    }, [currentPage, rating, isComment]);

    useEffect(() => {
        const fetchCoachesByCoachesId = async (coachesID) => {
            try {
                const response = await commonCoachesAPI.getCoachesById(coachesID);
                if (response.code === 200) {
                    console.log('Lay coaches thanh cong!');
                    setCoaches(response.data);
                } else {
                    console.log('fetch coaches failed');
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCoachesByCoachesId(coachesID);
    }, [isBooking]);

    // useModal
    const { isShowing: isShowingBooking, setIsShowing: setIsShowingBooking, toggle: toggleBooking } = useModal();
    const { isShowing: isShowingShipping, setIsShowing: setIsShowingShipping, toggle: toggleShipping } = useModal();

    //handle when rating change
    const ratingChanged = (newRating) => {
        setStar(newRating);
        console.log(newRating);
    };

    // Handle comment
    let handleComment = async () => {
        if (window.confirm('Bạn chắn chắn muốn gửi bình luận này ?')) {
            console.log(input_comment_el.current.value);
            const params = {
                content: input_comment_el.current.value,
                rating: star,
                coachId: +coachesID,
                userId: +currentUserId,
            };
            try {
                const response = await commentAPI.addComment(params);
                if (response.code === 200) {
                    toast.success('Thêm bình luận thành công! ', { theme: 'colored' });
                    setIsComment(!isComment);
                } else {
                    toast.error('Có lỗi xảy ra! không thể hêm bình luận ' + response.message, { theme: 'colored' });
                }
            } catch (err) {
                toast.error('Có lỗi xảy ra! không thể hêm bình luận ' + err.message, { theme: 'colored' });
            }
        }
        return;
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

    //Handle click button star
    const handleClick = (event) => {
        setBtnActive(event.target.id);
    };
    return (
        <Helmet title="Đặt vé">
            <div className="coaches-detail container mt-0 p-0">
                {/* coaches info */}
                <div className="coaches-detail__info-container">
                    {coaches && (
                        <CoachesView
                            isSystemUser={isSystemUser}
                            data={coaches}
                            onClickBooking={handleClickBooking}
                            onClickShipping={handleClickShipping}
                        />
                    )}
                </div>

                {/* comment input */}
                {accessToken && (
                    <div className="coaches-detail__comment-container">
                        <div className="coaches-detail__user-rating">
                            <div className="coaches-detail__user-rating__avatar">
                                <Image src={avatar} alt={fullname} />
                            </div>
                            <div className="coaches-detail__user-rating__name-rating">
                                <div className="coaches-detail__user-rating__name-rating__name">
                                    <span>{fullname}</span>
                                </div>
                                <div className="coaches-detail__user-rating__name-rating__rating">
                                    <ReactStars
                                        half={false}
                                        onChange={ratingChanged}
                                        value={star}
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
                                <textarea
                                    ref={input_comment_el}
                                    rows="5"
                                    placeholder="Bình luận tại đây ..."
                                    id="comment"
                                ></textarea>
                            </div>
                            <button className="coaches-detail__comment-input__action" onClick={() => handleComment()}>
                                Bình luận
                            </button>
                        </div>
                    </div>
                )}

                {/* List comments */}
                <div className="coaches-detail__list-comment-container">
                    {commentList && (
                        <div className="comment-list">
                            <div className="comment-list__stat">
                                <button onClick={() => setRating('')}>
                                    Tất cả bình luận {`(${commentList?.length})`}
                                </button>
                                <button
                                    id="5"
                                    className={btnActive === '5' ? 'btn-active-coaches-detail' : undefined}
                                    onClick={(e) => {
                                        setRating(5);
                                        handleClick(e);
                                    }}
                                >
                                    5★
                                </button>
                                <button
                                    id="4"
                                    className={btnActive === '4' ? 'btn-active-coaches-detail' : undefined}
                                    onClick={(e) => {
                                        setRating(4);
                                        handleClick(e);
                                    }}
                                >
                                    4★
                                </button>
                                <button
                                    id="3"
                                    className={btnActive === '3' ? 'btn-active-coaches-detail' : undefined}
                                    onClick={(e) => {
                                        setRating(3);
                                        handleClick(e);
                                    }}
                                >
                                    3★
                                </button>
                                <button
                                    id="2"
                                    className={btnActive === '2' ? 'btn-active-coaches-detail' : undefined}
                                    onClick={(e) => {
                                        setRating(2);
                                        handleClick(e);
                                    }}
                                >
                                    2★
                                </button>
                                <button
                                    id="1"
                                    className={btnActive === '1' ? 'btn-active-coaches-detail' : undefined}
                                    onClick={(e) => {
                                        setRating(1);
                                        handleClick(e);
                                    }}
                                >
                                    1★
                                </button>
                            </div>
                            <div className="comment-list__items">
                                {commentList.map((comment) => (
                                    <div className="comment-list__item" key={comment.id}>
                                        <div className="comment-item">
                                            <div className="comment-item__info">
                                                <div className="comment-item__avatar">
                                                    <Image src={comment.avatar} alt={comment.fullName} />
                                                </div>
                                                <div className="comment-item__name-star-content">
                                                    <span className="comment-item__name">{comment.fullName}</span>
                                                    <span className="comment-item__star">
                                                        <ReactStars
                                                            count={5}
                                                            value={comment.rating}
                                                            size={20}
                                                            edit={false}
                                                            color2={'#EDD111'}
                                                        />
                                                    </span>
                                                    <div className="comment-item__content">{comment.content}</div>
                                                    <div className="comment-item__created-date">
                                                        Đăng lúc <Moment fromNow>{comment.createDate}</Moment>
                                                        {' | '}
                                                        {new Date(comment.createDate).toLocaleString('vi-VI')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                count={totalPage}
                                onChange={(e, value) => setCurrentPage(value - 1)}
                                showFirstButton
                                showLastButton
                                style={{ position: 'static', background: 'white', zIndex: 1 }}
                            />
                        </div>
                    )}
                </div>

                {/* Modal buy tickets */}
                <ModalBooking
                    isBooking={isBooking}
                    setIsBooking={setIsBooking}
                    userId={currentUserId}
                    coachesId={coachesID}
                    pickUpList={coaches?.pickUp}
                    dropOffList={coaches?.dropOff}
                    maxSeat={coaches?.emptySeat}
                    price={coaches?.price}
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
