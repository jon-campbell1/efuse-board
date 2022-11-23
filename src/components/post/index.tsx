import React from 'react';
import './post.scss';

interface PostProps {
    body: string;
}

const Post = ({post}: {post: PostProps}) => {
    return (
        <div className="post-container" style={{padding: 30}}>
            <div className="post-user-info">
                <img src="/assets/profile_pic.png"/>
                <div style={{marginLeft: 16}}>
                    <h3 className="post-username">Nickmercss</h3>
                    <span className="post-time">2 Minutes Ago</span>
                </div>
            </div>
            <p className="post-text">
                {post.body}
            </p>
            <div className="post-stats">
                <span className="stat">
                    <img src="/assets/hype.png"/>
                    100 <span>Hypes</span>
                </span>

                <span className="stat">
                    <img src="/assets/comment.png"/>
                    100 <span>Comment</span>
                </span>

                <span className="stat">
                    <img src="/assets/shares.png"/>
                    100 <span>Shares</span>
                </span>

                <span className="stat">
                    100 <span>Views</span>
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