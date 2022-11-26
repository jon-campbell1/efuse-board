import React, { useContext, useState } from 'react';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

import { UserContext } from '../../contexts/UserContext';
import { CommentProps, Hype } from '../../types'; 
import HypeIcon from '../svgs/hype';
import CommentIcon from '../svgs/comment';
import ShareIcon from '../svgs/share';
import PostContent from '../post-content';

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

    const addHype = (hasHyped: boolean) => {
        const currentHypes = hypes;

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
                <img alt="profile pic" className="comment-profile-pic" src="/assets/profile_pic.png"/>
                <div style={{marginLeft: 16}}>
                    <h3 className="post-username">{comment.username}</h3>
                    <span className="post-time">{timeAgo.format(new Date(comment.timeStamp))}</span>
                </div>
            </div>
            <PostContent content={comment} addHype={addHype}/>
        </div>
    );
}

export default Comment;
