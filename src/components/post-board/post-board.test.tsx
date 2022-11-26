import {render} from '@testing-library/react'
import { PostProps } from '../../types';
import PostBoard from './index';

describe("PostBoard", () => {
    it ('should render no posts on Post Board', () => {
        const { container } = render(<PostBoard fetchedPosts={[]}/>)
        expect(container.querySelectorAll('.post-container')?.length).toEqual(0);
    });

    it ('should render 3 posts on Post Board', () => {
        const posts: PostProps[] = [
            {
                username: 'test123',
                body: 'test',
                hypes: [],
                views: 0,
                shares: 0,
                comments: [],
                timeStamp: new Date().toString(),
            },
            {
                username: 'test123',
                body: 'test',
                hypes: [],
                views: 0,
                shares: 0,
                comments: [],
                timeStamp: new Date().toString(),
            },
        ]
        const { container } = render(<PostBoard fetchedPosts={posts}/>)
        expect(container.querySelectorAll('.post-container')?.length).toEqual(2);
    });
});