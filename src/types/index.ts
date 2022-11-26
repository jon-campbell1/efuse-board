export interface Comment {
    body: string;
}

export interface PostProps {
    username: string;
    body: string;
    timeStamp: Date,
    hypes: number,
    views: number,
    shares: number,
    comments: Comment[],
};
