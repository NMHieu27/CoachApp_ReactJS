import './CommentItem.scss';
import ReactStars from 'react-stars';
import Moment from 'react-moment';
import Image from '../Image';
function CommentItem({ comment }) {
    return (
        <div className="comment-item">
            <div className="comment-item__info">
                <div className="comment-item__avatar">
                    <Image src={comment?.avatar} alt={comment?.fullname} />
                </div>
                <div className="comment-item__name-star-content">
                    <span className="comment-item__name">{comment?.fullname}</span>
                    <span className="comment-item__star">
                        <ReactStars count={5} value={comment.rating} size={20} edit={false} color2={'#EDD111'} />
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
    );
}

export default CommentItem;
