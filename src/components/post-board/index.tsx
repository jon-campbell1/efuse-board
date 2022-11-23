import React, { useState } from 'react';
import PostCreator from '../post-creator';
import Post from '../post';
import './post-board.scss';

interface PostProps {
    body: string;
}

const PostBoard = () => {
    const [posts, setPosts] = useState<any>([]);

    const createPost = (body: string) =>  {
        setPosts([...posts, { body }]);
    }

    const renderPosts = () => {
        return posts.map((post: PostProps) => <Post post={post}/>)
    }

    return (
        <div className="post-board-container">
            <PostCreator createPost={createPost}/>
            {
                renderPosts()
            }
        </div>
    )
}

export default PostBoard;