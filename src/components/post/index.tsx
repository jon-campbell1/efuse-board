import React from 'react';
import './post.scss';
import { Comment, PostProps } from '../../types'; 
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en)

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

    return (
        <div className="post-container" style={{padding: 30}}>
            <div className="post-user-info">
                <img src="/assets/profile_pic.png"/>
                <div style={{marginLeft: 16}}>
                    <h3 className="post-username">Nickmercss</h3>
                    <span className="post-time">{timeAgo.format(post.timeStamp)}</span>
                </div>
            </div>
            <p className="post-text">
                {post.body}
            </p>
            <div className="post-stats">
                <span className="stat">
                    <img src="/assets/hype.png"/>
                    {post.hypes} <span>Hypes</span>
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
                <input type="text" placeholder="Add Comment" className="comment-input"/>
                <button className="add-comment-btn">
                    <img src="/assets/add_comment.png"/>
                </button>
            </div>
        </div>
    )
}

export default Post;