import React, { useContext, useState } from 'react';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

import { CommentProps, Hype, PostProps } from '../../types'; 
import { UserContext } from '../../contexts/UserContext';
import Comment from '../comment';
import HypeIcon from '../svgs/hype';
import CommentIcon from '../svgs/comment';
import ShareIcon from '../svgs/share';
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
    const {body, hypes, comments, shares, views} = post;
    const timeAgo = new TimeAgo('en-US');
    const [commentText, setCommentText] = useState('');
    const [hypeClicked, setHypeClicked] = useState(false);
    const { userId, username } = useContext(UserContext);

    const addHype = () => {
        const currentHypes = hypes;

        const hasHyped = currentHypes.find((hype: Hype) => hype.userId === userId)

        if (!hasHyped) {
            setHypeClicked(true);
        }

        const updatedHypes = hasHyped ? 
            currentHypes.filter((hype: Hype) => hype.userId !== userId) :
            [...currentHypes, { userId }]

        const updatedPost: PostProps = {
            ...post,
            hypes: updatedHypes,
        }

        updatePost(updatedPost, index);

        setTimeout(() => {
            setHypeClicked(false);
        }, 1000);
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

    const hasHyped = !!hypes.find((hype: Hype) => hype.userId === userId)

    return (
        <div className="post-container">
            <div className="menu-icon">
                <MenuIcon/>
            </div>
            <div className="post-user-info">
                <img alt="profile pic" src="/assets/profile_pic.png"/>
                <div style={{marginLeft: 16}}>
                    <h3 className="post-username">{post.username}</h3>
                    <span className="post-time">{timeAgo.format(new Date(post.timeStamp))}</span>
                </div>
            </div>
            <p className="post-text">
                {body}
            </p>
            <div className="post-stats">
                <span className="stat">
                    <div className="stat-icon">
                        <HypeIcon clicked={hypeClicked} active={hasHyped} onClick={addHype}/>
                    </div>
                    <span className="stat-number" style={{color: hasHyped ? '#f56b30' : '#12151D'}}>
                        {hypes.length} 
                    </span>
                    <span className="stat-type">Hypes</span>
                </span>

                <span className="stat">
                    <div className="stat-icon">
                        <CommentIcon/>
                    </div>
                    <span className="stat-number">
                        {comments.length}
                    </span> 
                    <span className="stat-type">Comment</span>
                </span>

                <span className="stat">
                    <div className="stat-icon">
                        <ShareIcon/>
                    </div>
                    <span className="stat-number">{shares}</span> 
                    <span className="stat-type">Shares</span>
                </span>

                <span className="stat">
                    <span className="stat-number">{views}</span> 
                    <span className="stat-type">Views</span>
                </span>
            </div>
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