import './CommentItem.scss';
import ReactStars from 'react-stars';
import Moment from 'react-moment';
function CommentItem({ comment }) {
    return (
        <div className="comment-item">
            <div className="comment-item__info">
                <div className="comment-item__avatar">
                    <img src={comment.avatar} alt={comment.fullname} />
                </div>
                <div className="comment-item__name-star">
                    <span className="comment-item__name">{comment.fullname}</span>
                    <span className="comment-item__star">
                        <ReactStars count={5} value={comment.rating} size={20} edit={false} color2={'#EDD111'} />
                    </span>
                </div>
            </div>
            <div className="comment-item__content">{comment.content}</div>
            <div className="comment-item__created-date">
                {/* Đăng lúc {new Date(comment.created_date).toLocaleString('vi-VI')} */}
                Đăng lúc <Moment fromNow>{comment.created_date}</Moment>{' '}
                {new Date(comment.created_date).toLocaleString('vi-VI')}
            </div>
        </div>
    );
}

export default CommentItem;
