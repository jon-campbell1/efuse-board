export interface PostProps {
    username: string;
    body: string;
    timeStamp: string,
    hypes: Hype[],
    views: number,
    shares: number,
    comments: CommentProps[],
};

export interface CommentProps {
    username: string;
    timeStamp: string,
    body: string;
    hypes: Hype[],
    shares: number,
    replies: any[],
}

export interface Content {
    body: string;
    hypes: Hype[],
    shares: number,
    views?: number,
    comments?: CommentProps[],
    replies?: any[],
}

export interface Hype {
    userId: string,
}

