import { useState } from 'react';
import CommentItem from './CommentItem';
import './CommentList.scss';

function CommentList({ comments, fiveStar, fourStar, threeStar, twoStar, oneStar }) {
    const [data, setData] = useState(comments);
    const handleClick = (star) => {
        setData(comments.filter((comment) => comment.rating === star));
    };

    return (
        <div className="comment-list">
            <div className="comment-list__stat">
                <button onClick={() => setData(comments)}>Số bình luận {`(${comments.length})`}</button>
                <button onClick={() => handleClick(5)}>5★{`(${fiveStar})`}</button>
                <button onClick={() => handleClick(4)}>4★{`(${fourStar})`}</button>
                <button onClick={() => handleClick(3)}>3★{`(${threeStar})`}</button>
                <button onClick={() => handleClick(2)}>2★{`(${twoStar})`}</button>
                <button onClick={() => handleClick(1)}>1★{`(${oneStar})`}</button>
            </div>
            <div className="comment-list__items">
                {data.reverse().map((comment) => (
                    <div className="comment-list__item" key={comment.id}>
                        <CommentItem comment={comment} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentList;
