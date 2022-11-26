import React, { useState, useContext } from 'react';
import PostCreator from '../post-creator';
import Post from '../post';
import { UserContext } from '../../contexts/UserContext';
import './post-board.scss';

import {  PostProps} from '../../types';

const PostBoard = () => {
    const userContext = useContext(UserContext);
    const [posts, setPosts] = useState<any>([]);

    const createPost = (body: string) =>  {
        const newPost: PostProps = {
            username: userContext.username,
            body,
            timeStamp: new Date(),
            hypes: 0,
            shares: 0,
            views: 0,
            comments: [],
        }
        setPosts([newPost, ...posts]);
    }

    const updatePost = (post: PostProps, index: number) => {
        const currentPosts = [...posts];
        currentPosts[index] = post;
        setPosts(currentPosts);
    };

    const renderPosts = () => {
        return posts.map((post: PostProps, index: number) => 
            <Post 
                post={post} 
                index={index} 
                key={`post${index}`} 
                updatePost={updatePost}
            />
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