import React, { useContext, useState } from 'react';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

import { CommentProps, Hype, PostProps } from '../../types'; 
import { UserContext } from '../../contexts/UserContext';
import Comment from '../comment';

import './post.scss';

TimeAgo.addDefaultLocale(en);

const Post = ({
    post, 
    index,
    updatePost
}: {
    post: PostProps
    index: number,
    updatePost: (post: PostProps, index: number) => void
}) => {
    const timeAgo = new TimeAgo('en-US');
    const [commentText, setCommentText] = useState('');
    const { userId, username } = useContext(UserContext);

    const addHype = () => {
        const currentHypes = post.hypes;

        const hasHyped = currentHypes.find((hype: Hype) => hype.userId === userId)

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
                timeStamp: new Date(),
            }

            const updatedPost: PostProps = {
                ...post,
               comments: [...post.comments, newComment],
            }
            
            setCommentText('');
            updatePost(updatedPost, index);
        }
    }

    const updateComment = (comment: CommentProps, commentIndex: number) => {
        const currentComments = post.comments;
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
        <div className="post-container" style={{padding: 30}}>
            <div className="post-user-info">
                <img src="/assets/profile_pic.png"/>
                <div style={{marginLeft: 16}}>
                    <h3 className="post-username">{post.username}</h3>
                    <span className="post-time">{timeAgo.format(post.timeStamp)}</span>
                </div>
            </div>
            <p className="post-text">
                {post.body}
            </p>
            <div className="post-stats">
                <span className="stat">
                    <img src="/assets/hype.png" onClick={addHype}/>
                    {post.hypes.length} <span>Hypes</span>
                </span>

                <span className="stat">
                    <img src="/assets/comment.png"/>
                    {post.comments.length} <span>Comment</span>
                </span>

                <span className="stat">
                    <img src="/assets/shares.png"/>
                    {post.shares} <span>Shares</span>
                </span>

                <span className="stat">
                    {post.views} <span>Views</span>
                </span>
            </div>
            <div style={{position: 'relative'}}>
                <img src="/assets/comment_large.png" className="comment-icon"/>
                <input 
                    type="text" 
                    placeholder="Add Comment" 
                    value={commentText} 
                    className="comment-input" 
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && commentText.trim() && addComment()}
                    onClick={addComment}
                />
                <button className="add-comment-btn">
                    <img src="/assets/add_comment.png"/>
                </button>
            </div>
            {
                renderComments()
            }
        </div>
    )
}

export default Post;