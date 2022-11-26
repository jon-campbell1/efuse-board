import React, { useContext, useState } from 'react';

import { CommentProps, Hype, PostProps } from '../../types'; 
import { UserContext } from '../../contexts/UserContext';
import ContentWithStats from '../content-with-stats';
import ContentHeader from '../content-header';
import Comment from '../comment';
import MenuIcon from '../svgs/menu';

import './post.scss';

const Post = ({
    post, 
    index,
    updatePost
}: {
    post: PostProps
    index: number,
    updatePost: (post: PostProps, index: number) => void
}) => {
    const { body, hypes, comments, views, shares, timeStamp } = post;
    const [commentText, setCommentText] = useState('');
    const { userId, username } = useContext(UserContext);

    const addHype = (hasHyped: boolean) => {
        const currentHypes = hypes;

        const updatedHypes = hasHyped ? 
            currentHypes.filter((hype: Hype) => hype.userId !== userId) :
            [...currentHypes, { userId }]

        const updatedPost: PostProps = {
            ...post,
            hypes: updatedHypes,
        }

        updatePost(updatedPost, index);
    }

    const addComment = () => {
        if (commentText.trim()) {
            const newComment: CommentProps = {
                username,
                body: commentText,
                hypes: [],
                shares: 0,
                replies: [],
                timeStamp: new Date().toString(),
            }

            const updatedPost: PostProps = {
                ...post,
               comments: [...comments, newComment],
            }
            
            setCommentText('');
            updatePost(updatedPost, index);
        }
    }

    const updateComment = (comment: CommentProps, commentIndex: number) => {
        const currentComments = comments;
        currentComments[commentIndex]= comment;
        const updatedPost: PostProps = {
            ...post,
           comments: currentComments,
        }

        updatePost(updatedPost, index);
    }

    const renderComments = () => 
        post.comments.map((comment: CommentProps, commentIndex: number) => 
            <Comment 
                key={`comment${index}-${commentIndex}`} 
                commentIndex={commentIndex} 
                comment={comment}
                updateComment={updateComment}
            />
        )

    return (
        <div className="post-container">
            <div className="menu-icon">
                <MenuIcon/>
            </div>
            <ContentHeader username={post.username} timeStamp={timeStamp} type='post'/>
            <ContentWithStats content={{body, hypes, views, comments, shares}} addHype={addHype}/>
            <div style={{position: 'relative'}}>
                <img alt="comment icon" src="/assets/comment_large.png" className="comment-icon"/>
                <input 
                    type="text" 
                    placeholder="Add Comment" 
                    value={commentText} 
                    className="comment-input" 
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && commentText.trim() && addComment()}
                    onClick={addComment}
                />
                <button className="add-comment-btn" onClick={addComment}>
                    <img alt="add comment" src="/assets/add_comment.png"/>
                </button>
            </div>
            {
                renderComments()
            }
        </div>
    )
}

export default Post;