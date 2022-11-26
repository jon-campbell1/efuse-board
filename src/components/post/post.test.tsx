import {render, fireEvent} from '@testing-library/react'
import Post from './index';

describe("Post", () => {
    const props = {
        index: 0,
        post: {
            username: "test",
            body: "hello",
            timeStamp: new Date(),
            hypes: [{userId: "test"}],
            views: 2,
            shares: 3,
            comments: [],
        },
        updatePost: jest.fn()
    };

    it("should render Post correctly", () => {
        const {container} = render(<Post {...props}/>);

        expect((container.querySelector('.post-text') as HTMLElement)?.innerHTML).toBe('hello');
    });

    it ('should render stats correctly', () => {
        const {container} = render(<Post {...props}/>);

        expect((container.querySelectorAll('.stat-number')[0] as HTMLElement)?.innerHTML).toBe('1');
        expect((container.querySelectorAll('.stat-number')[1] as HTMLElement)?.innerHTML).toBe('0');
        expect((container.querySelectorAll('.stat-number')[2] as HTMLElement)?.innerHTML).toBe('3');
        expect((container.querySelectorAll('.stat-number')[3] as HTMLElement)?.innerHTML).toBe('2');
    });

    it ('should not add comment', () => {
        const {container} = render(<Post {...props}/>);

        const input = container.querySelector('input[type="text"]') as HTMLElement;

        fireEvent.change(input, {target: {value: ''}})
        const button = container.querySelector('button') as HTMLElement;
        fireEvent.click(button);
        expect(props.updatePost).toHaveBeenCalledTimes(0); 
    });

    it ('should add comment', () => {
        const {container} = render(<Post {...props}/>);

        const input = container.querySelector('input[type="text"]') as HTMLElement;

        fireEvent.change(input, {target: {value: 'test'}})
        const button = container.querySelector('button') as HTMLElement;
        fireEvent.click(button);
        expect(props.updatePost).toHaveBeenCalled(); 
    });

    it ("should add hype", () => {
        const {container} = render(<Post {...props}/>);

        fireEvent.click(container.querySelectorAll('svg')[1]);

        expect(props.updatePost).toHaveBeenCalled(); 
    });
});