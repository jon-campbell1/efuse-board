import React, { useContext, useState } from 'react';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

import { UserContext } from '../../contexts/UserContext';
import { CommentProps, Hype } from '../../types'; 
import HypeIcon from '../svgs/hype';
import CommentIcon from '../svgs/comment';
import ShareIcon from '../svgs/share';

import './comment.scss';

TimeAgo.addDefaultLocale(en);

const Comment = ({
    comment,
    commentIndex,
    updateComment,
}: {
    comment: CommentProps, 
    commentIndex: number,
    updateComment: (comment: CommentProps, commentIndex: number) => void,
}) => {
    const { hypes } = comment;
    const [hypeClicked, setHypeClicked] = useState(false);
    const timeAgo = new TimeAgo('en-US');
    const { userId } = useContext(UserContext);

    const addHype = () => {
        const currentHypes = hypes;

        const hasHyped = currentHypes.find((hype: Hype) => hype.userId === userId)

        if (!hasHyped) {
            setHypeClicked(true);
        }

        const updatedHypes = hasHyped ? 
            currentHypes.filter((hype: Hype) => hype.userId !== userId) :
            [...currentHypes, { userId }]

        const updatedComment: CommentProps = {
            ...comment,
            hypes: updatedHypes,
        }

        updateComment(updatedComment, commentIndex);

        setTimeout(() => {
            setHypeClicked(false);
        }, 1000);
    }

    const hasHyped = !!hypes.find((hype: Hype) => hype.userId === userId)

    return (
        <div className="comment-container">
            <div className="post-user-info">
                <img alt="profile-pic" className="comment-profile-pic" src="/assets/profile_pic.png"/>
                <div style={{marginLeft: 16}}>
                    <h3 className="post-username">{comment.username}</h3>
                    <span className="post-time">{timeAgo.format(comment.timeStamp)}</span>
                </div>
            </div>
            <p className="post-text">
                {comment.body}
            </p>
            <div className="post-stats">
                <span className="stat">
                    <div className="stat-icon">
                        <HypeIcon active={hasHyped} clicked={hypeClicked} onClick={addHype}/>
                    </div>
                    <span className="stat-number" style={{color: hasHyped ? '#f56b30' : '#12151D'}}>{comment.hypes.length}</span> 
                    <span className="stat-type">Hypes</span>
                </span>

                <span className="stat">
                    <div className="stat-icon">
                        <CommentIcon/>
                    </div>
                    <span className="stat-number">{comment.replies.length}</span> 
                    <span className="stat-type">Replies</span>
                </span>

                <span className="stat">
                    <div className="stat-icon">
                        <ShareIcon/>
                    </div>
                    <span className="stat-number">{comment.shares}</span> 
                    <span className="stat-type">Shares</span>
                </span>
            </div>
        </div>
    );
}

export default Comment;
