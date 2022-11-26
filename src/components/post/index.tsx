import React, { useContext, useState } from 'react';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

import { CommentProps, Hype, PostProps } from '../../types'; 
import { UserContext } from '../../contexts/UserContext';
import PostContent from '../post-content';
import Comment from '../comment';
import MenuIcon from '../svgs/menu';

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
    const { hypes, comments } = post;
    const timeAgo = new TimeAgo('en-US');
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
            <div className="post-user-info">
                <img alt="profile pic" className="post-profile-pic" src="/assets/profile_pic.png"/>
                <div style={{marginLeft: 16}}>
                    <h3 className="post-username">{post.username}</h3>
                    <span className="post-time">{timeAgo.format(new Date(post.timeStamp))}</span>
                </div>
            </div>
            <PostContent content={post} addHype={addHype}/>
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