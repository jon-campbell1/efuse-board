import React, { useContext, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { CommentProps, Hype } from '../../types'; 
import ContentWithStats from '../content-with-stats';
import ContentHeader from '../content-header';

import './comment.scss';


const Comment = ({
    comment,
    commentIndex,
    updateComment,
}: {
    comment: CommentProps, 
    commentIndex: number,
    updateComment: (comment: CommentProps, commentIndex: number) => void,
}) => {
    const { body, hypes, shares, replies } = comment;
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
            <ContentHeader username={comment.username} timeStamp={comment.timeStamp} type="comment"/>
            <ContentWithStats content={{body, hypes, shares, replies}} addHype={addHype}/>
        </div>
    );
}

export default Comment;
