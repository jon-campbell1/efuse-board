import React from 'react';
import './post.scss';

interface PostProps {
    body: string;
}

const Post = ({post}: {post: PostProps}) => {
    return (
        <div className="post-container">
            <p className="post-text">
                {post.body}
            </p>
        </div>
    )
}

export default Post;