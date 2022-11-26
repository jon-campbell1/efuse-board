import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

const ContentHeader = ({
    username, 
    timeStamp, 
    type
}: {
    username: string, 
    timeStamp: string, 
    type: string
}) => {
    const timeAgo = new TimeAgo('en-US');

    return (
        <div className="post-user-info">
            <img alt="profile pic" className={`${type}-profile-pic`} src="/assets/profile_pic.png"/>
            <div style={{marginLeft: 16}}>
                <h3 className="post-username">{username}</h3>
                <span className="post-time">{timeAgo.format(new Date(timeStamp))}</span>
            </div>
        </div>
    );
}

export default ContentHeader;