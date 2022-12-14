import React, {useContext, useEffect, useState} from 'react';
import { Hype, Content } from '../../types';
import { UserContext } from '../../contexts/UserContext';
import HypeIcon from '../svgs/hype';
import CommentIcon from '../svgs/comment';
import ShareIcon from '../svgs/share';

import './content-with-stats.scss';

const ContentWithStats = ({
    content, 
    addHype
}: {
    content: Content,
    addHype: (hasHyped: boolean) => void,
}) => {
    const {body, hypes, comments, views, shares, replies } = content;
    const { userId } = useContext(UserContext);
    const [hypeClicked, setHypeClicked] = useState(false);
    const [hasHyped, setHasHyped] = useState(false);

    useEffect(() => {
        setHasHyped(!!hypes.find((hype: Hype) => hype.userId === userId));
    }, [hypes])

    const hypeAction = () => {
        if (!hasHyped) {
            setHypeClicked(true);
        }

        addHype(hasHyped);

        setTimeout(() => {
            setHypeClicked(false);
        }, 1000);
    }

    return (
        <>
            <p className="post-text">
                {body}
            </p>
            <div className="post-stats">
                <span className="stat">
                    <div className="stat-icon">
                        <HypeIcon clicked={hypeClicked} active={hasHyped} onClick={hypeAction}/>
                    </div>
                    <span className="stat-number" style={{color: hasHyped ? '#f56b30' : '#12151D'}}>
                        {hypes.length} 
                    </span>
                    <span className="stat-type">Hypes</span>
                </span>

                {
                    comments && (
                        <span className="stat">
                            <div className="stat-icon">
                                <CommentIcon/>
                            </div>
                            <span className="stat-number">
                                {comments.length}
                            </span> 
                            <span className="stat-type">Comment</span>
                        </span>
                    )
                }

                {
                    replies && (
                        <span className="stat">
                            <div className="stat-icon">
                                <CommentIcon/>
                            </div>
                            <span className="stat-number">
                                {replies.length}
                            </span> 
                            <span className="stat-type">Replies</span>
                        </span>
                    )
                }

                <span className="stat">
                    <div className="stat-icon">
                        <ShareIcon/>
                    </div>
                    <span className="stat-number">{shares}</span> 
                    <span className="stat-type">Shares</span>
                </span>

                {
                    views !== undefined && (
                        <span className="stat">
                            <span className="stat-number">{views}</span> 
                            <span className="stat-type">Views</span>
                        </span>
                    )
                }
            </div>
        </>
    );
}

export default ContentWithStats;