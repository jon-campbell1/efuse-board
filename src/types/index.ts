export interface PostProps {
    username: string;
    body: string;
    timeStamp: Date,
    hypes: Hype[],
    views: number,
    shares: number,
    comments: CommentProps[],
};

export interface CommentProps {
    username: string;
    timeStamp: Date,
    body: string;
    hypes: Hype[],
    shares: number,
    replies: any[],
}

export interface Hype {
    userId: string,
}

