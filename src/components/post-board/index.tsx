import React, { useState } from 'react';
import PostCreator from '../post-creator';
import Post from '../post';
import './post-board.scss';

import {  PostProps} from '../../types';

const PostBoard = () => {
    const [posts, setPosts] = useState<any>([]);

    const createPost = (body: string) =>  {
        const newPost: PostProps = {
            body,
            timeStamp: new Date(),
            hypes: 0,
            shares: 0,
            views: 0,
            comments: [],
        }
        setPosts([...posts, newPost]);
    }

    const updatePost = (post: PostProps, index: number) => {

    };

    const renderPosts = () => {
        return posts.map((post: PostProps, index: number) => 
            <Post post={post} index={index} updatePost={updatePost}/>
        )
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