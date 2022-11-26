import React, { useContext } from 'react';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

import { UserContext } from '../../contexts/UserContext';
import { CommentProps, Hype, PostProps } from '../../types'; 

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
    const timeAgo = new TimeAgo('en-US');
    const { userId } = useContext(UserContext);

    const addHype = () => {
        const currentHypes = comment.hypes;

        const hasHyped = currentHypes.find((hype: Hype) => hype.userId === userId)

        const updatedHypes = hasHyped ? 
            currentHypes.filter((hype: Hype) => hype.userId !== userId) :
            [...currentHypes, { userId }]

        const updatedComment: CommentProps = {
            ...comment,
            hypes: updatedHypes,
        }

        updateComment(updatedComment, commentIndex);
    }

    return (
        <div className="comment-container">
            <div className="post-user-info">
                <img className="comment-profile-pic" src="/assets/profile_pic.png"/>
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
                    <img src="/assets/hype.png" onClick={addHype}/>
                    {comment.hypes.length} <span>Hypes</span>
                </span>

                <span className="stat">
                    <img src="/assets/comment.png"/>
                    {comment.replies.length} <span>Replies</span>
                </span>

                <span className="stat">
                    <img src="/assets/shares.png"/>
                    {comment.shares} <span>Shares</span>
                </span>
            </div>
        </div>
    );
}

export default Comment;
