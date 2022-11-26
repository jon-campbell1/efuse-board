import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './post-creator.scss'

const PostCreator = ({
    createPost,
}: {
    createPost: (body: string) => void 
}) => {
    const [postText, setPostText] = useState<string>('');

    const submitPost = () => {
        const val = postText.trim();
        if (val) {
            setPostText('');
            createPost(postText);
        }
    }

    return (
        <div className="post-container">
            <input 
                type="text" 
                value={postText} 
                onChange={(e: any) => {
                    setPostText(e.target.value)
                }} 
                onKeyDown={(e) => {
                    e.key === 'Enter' && postText.trim() && submitPost()
                }}
                className="post-creation-input" 
                placeholder="What's on your mind?"
            />

            <div className="post-creation-controls">
                <div className="post-options">
                    <div className="post-option">
                        <img src="assets/camera.png"/>
                        Add Media
                    </div>
                    <div className="post-option">
                        <img src="assets/video.png"/>
                        Go Live
                    </div>
                </div>

                <input type="button" value="Post" onClick={() => submitPost()}/>
            </div>
        </div>
    )
}

export default PostCreator;