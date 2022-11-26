export interface Comment {
    body: string;
}

export interface PostProps {
    body: string;
    timeStamp: Date,
    hypes: number,
    views: number,
    shares: number,
    comments: Comment[],
};
