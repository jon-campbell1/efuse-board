export interface Comment {
    body: string;
}


export interface Hype {
    userId: string,
}

export interface PostProps {
    username: string;
    body: string;
    timeStamp: Date,
    hypes: Hype[],
    views: number,
    shares: number,
    comments: Comment[],
};
